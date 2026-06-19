"use client";

import { useAuthContext } from "@/providers/AuthProvider";

/**
 * Hook personalizado para manejar la autenticación en componentes de React.
 * Consume el estado global de autenticación provisto por AuthProvider.
 */
export function useAuth() {
  return useAuthContext();
}

export type UseAuthReturn = ReturnType<typeof useAuth>;

