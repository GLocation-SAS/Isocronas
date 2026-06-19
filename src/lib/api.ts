import { initFirebaseAuth } from "./firebase";

/**
 * Clase de error personalizada para manejar respuestas de error de la API.
 */
export class ApiError extends Error {
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Obtiene de forma asíncrona el Firebase ID Token del usuario actual.
 * Si Firebase aún se está inicializando, espera al primer cambio de estado de autenticación.
 */
async function getFirebaseToken(): Promise<string | null> {
  const currentAuth = initFirebaseAuth();
  if (!currentAuth) {
    return null;
  }
  if (currentAuth.currentUser) {
    try {
      return await currentAuth.currentUser.getIdToken();
    } catch (err) {
      console.error("Error al obtener ID Token del usuario actual:", err);
      return null;
    }
  }

  return new Promise((resolve) => {
    // Si no está el usuario aún, podría ser que Firebase está inicializándose.
    // Escuchamos una sola vez el cambio de estado para resolver el token.
    const unsubscribe = currentAuth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken();
          resolve(token);
        } catch {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
}

// ─── Mapa de URLs por microservicio ──────────────────────────────────────────
// Cada microservicio tiene su propia URL base. En desarrollo local se pueden
// configurar individualmente o apuntar todos a localhost con distintos puertos.
// En producción, cada variable apunta a su Cloud Run service.

/**
 * Identificadores de microservicios disponibles en el backend.
 * Se utilizan para resolver la URL base correcta al llamar a cada API.
 */
export type MicroserviceId =
  | "usuarios"
  | "areas"
  | "cargos"
  | "roles"
  | "parentescos"
  | "contacto"
  | "upload"
  | "upload-documents"
  | "innovaciones"
  | "rutas"
  | "document-repository"
  | "folders";

/**
 * Resuelve la URL base del microservicio indicado.
 * Busca primero la variable de entorno específica (NEXT_PUBLIC_API_URL_<SERVICIO>),
 * y si no existe, usa la URL por defecto (NEXT_PUBLIC_API_URL).
 */
export function getServiceUrl(service: MicroserviceId): string {
  const envMap: Record<MicroserviceId, string | undefined> = {
    usuarios: process.env.NEXT_PUBLIC_API_URL_USUARIOS,
    areas: process.env.NEXT_PUBLIC_API_URL_AREAS,
    cargos: process.env.NEXT_PUBLIC_API_URL_CARGOS,
    roles: process.env.NEXT_PUBLIC_API_URL_ROLES,
    parentescos: process.env.NEXT_PUBLIC_API_URL_PARENTESCOS,
    contacto: process.env.NEXT_PUBLIC_API_URL_CONTACTO,
    upload: process.env.NEXT_PUBLIC_API_URL_UPLOAD,
    "upload-documents": process.env.NEXT_PUBLIC_API_URL_UPLOAD_DOCUMENTS,
    innovaciones: process.env.NEXT_PUBLIC_API_URL_INNOVACIONES,
    rutas: process.env.NEXT_PUBLIC_API_URL_RUTAS,
    "document-repository": process.env.NEXT_PUBLIC_API_URL_DOCUMENT_REPOSITORY,
    folders: process.env.NEXT_PUBLIC_API_URL_FOLDERS,
  };

  return (
    envMap[service] ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8080"
  );
}

/**
 * Helper personalizado para realizar peticiones HTTP (Fetch API) al backend de GLocation.
 * Agrega automáticamente el token de autenticación de Firebase en la cabecera 'Authorization'.
 * 
 * @param endpoint Ruta del endpoint (ej. '/auth/me' o 'https://api.glocation.com/auth/me')
 * @param options Opciones adicionales para fetch (method, body, headers, etc.)
 * @param service Microservicio destino. Por defecto: "usuarios" (retrocompatible).
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  service: MicroserviceId = "usuarios"
): Promise<T> {
  const baseUrl = getServiceUrl(service);
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Obtener el token de Firebase Auth de forma automática
  const token = await getFirebaseToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      const status = response.status;
      if (status === 401 || status === 403) {
        console.warn(`Acceso denegado/prohibido (${status}): ${errorData.message || response.statusText}`);
        try {
          const currentAuth = initFirebaseAuth();
          if (currentAuth) {
            await currentAuth.signOut();
          }
        } catch (err) {
          console.error("Error al cerrar sesión de Firebase en apiFetch:", err);
        }
      }

      throw new ApiError(errorData.message || `Error de API con código ${status}`, status, errorData);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json() as T;
    }

    return (await response.text()) as unknown as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
}
