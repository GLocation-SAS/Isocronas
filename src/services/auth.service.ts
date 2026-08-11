import { User } from "firebase/auth";

export const authService = {
  login: async (email: string, pass: string): Promise<{ user: User; token: string }> => {
    throw new Error("Not implemented");
  },
  loginWithGoogle: async (): Promise<{ user: User; token: string }> => {
    throw new Error("Not implemented");
  },
  logout: async (): Promise<void> => {
    throw new Error("Not implemented");
  },
  subscribeToAuthChanges: (cb: (user: User | null) => void) => {
    return () => {};
  },
};
