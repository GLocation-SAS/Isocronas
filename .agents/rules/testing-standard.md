---
trigger: always_on
name: testing-standard
description: Estándar obligatorio para la creación y mantenimiento de pruebas en el proyecto G-Learning (Backend y Frontend).
---

# G-Learning Testing Standard (V1)

Este documento define la regla obligatoria para la creación y mantenimiento de pruebas en el proyecto G-Learning. El objetivo es mantener una cobertura consistente y un flujo de desarrollo "Test-Aware".

---

## 1. REGLAS DE GENERACIÓN AUTOMÁTICA

Cada vez que se cree un nuevo módulo o archivo de los tipos listados a continuación, se **DEBE** generar automáticamente su archivo de prueba correspondiente.

### Backend (Node.js + Express + Jest)
**Archivos:** `controller`, `service`, `useCase`, `repository`, `middleware`, `route`, `provider`.
**Destino:** `[nombre].test.ts` en la misma carpeta o en `/test`.

**Cobertura Mínima:**
- Caso de éxito (Happy Path).
- Manejo de errores y excepciones.
- Validaciones de entrada.
- Mocks de dependencias externas (DB, APIs, Firebase).
- Validación de permisos y roles (si aplica).

### Frontend (Next.js + React + RTL + Playwright)
**Archivos:** `component`, `hook`, `modal`, `form`, `page`, `card`, `layout`.
**Destino:** `[nombre].test.tsx` (o `.test.ts` para hooks) junto al archivo o en `__tests__`.

**Cobertura Mínima:**
- Renderizado correcto.
- Interacción básica del usuario.
- Estados de carga (Loading states).
- Estados de error.
- Accesibilidad mínima (Aria-labels, roles).
- Validación de callbacks y eventos.

---

## 2. CONVENCIONES TÉCNICAS

1. **Patrón AAA:** Todas las pruebas deben seguir la estructura *Arrange*, *Act*, *Assert*.
2. **Nombres Descriptivos:** Deben explicar el comportamiento esperado (ej: `should return 401 if token is missing`).
3. **Prohibido Tests Vacíos:** No generar esqueletos sin lógica real.
4. **Mocks Automáticos:** Si un archivo depende de otro (ej: un UseCase de un Repository), inyectar el mock automáticamente.
5. **Tipado Estricto:** Las pruebas deben cumplir con los tipos de TypeScript del código original.

---

## 3. COMPORTAMIENTO DEL AGENTE (IA)

- **Creación:** Al detectar un archivo nuevo de los tipos mencionados, genera el test inmediatamente sin esperar petición explícita.
- **Detección de Faltantes:** Si el usuario solicita trabajar en un módulo que no tiene pruebas, la IA debe sugerir: *"He notado que [Módulo] no tiene pruebas. ¿Deseas que las genere ahora?"*.
- **Eliminación:** Si se elimina un archivo, sugerir eliminar su prueba asociada para mantener el repositorio limpio.
- **Consistencia:** No duplicar lógica y mantener aislamiento entre pruebas.

---

## 4. STACK TECNOLÓGICO

- **Backend:** `Jest`, `ts-jest`, `supertest` (para rutas).
- **Frontend:** `React Testing Library`, `Jest`, `Playwright` (para E2E/Integration).
