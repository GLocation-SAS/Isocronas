import { renderHook, act } from "@testing-library/react";
import { User } from "firebase/auth";
import { useAuth } from "./useAuth";
import { AuthProvider } from "@/providers/AuthProvider";
import { authService } from "@/services/auth.service";

// Mock del servicio de autenticación
jest.mock("@/services/auth.service", () => ({
  login: jest.fn(),
  loginWithGoogle: jest.fn(),
  logout: jest.fn(),
  subscribeToAuthChanges: jest.fn((cb) => {
    // Por defecto simulamos que no hay usuario inicialmente
    cb(null);
    return jest.fn(); // mock del des-registro (unsubscribe)
  }),
}));

describe("useAuth hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe inicializarse con loading en false y user en null", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("debe llamar a la función login del servicio y actualizar el estado", async () => {
    const mockUser = { email: "test@glocation.com", uid: "uid123" } as unknown as User;
    const loginMock = authService.login as jest.Mock;
    loginMock.mockResolvedValueOnce({ user: mockUser, token: "id_token_123" });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    let response;
    await act(async () => {
      response = await result.current.login("test@glocation.com", "password123");
    });

    expect(loginMock).toHaveBeenCalledWith("test@glocation.com", "password123");
    expect(response).toEqual({ user: mockUser, token: "id_token_123" });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("debe llamar a loginWithGoogle del servicio y actualizar el estado", async () => {
    const mockUser = { email: "google@gmail.com", uid: "google_uid" } as unknown as User;
    const loginWithGoogleMock = authService.loginWithGoogle as jest.Mock;
    loginWithGoogleMock.mockResolvedValueOnce({ user: mockUser, token: "google_token_abc" });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    let response;
    await act(async () => {
      response = await result.current.loginWithGoogle();
    });

    expect(loginWithGoogleMock).toHaveBeenCalled();
    expect(response).toEqual({ user: mockUser, token: "google_token_abc" });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("debe llamar a la función logout del servicio y limpiar el estado del usuario", async () => {
    const logoutMock = authService.logout as jest.Mock;
    logoutMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(logoutMock).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
