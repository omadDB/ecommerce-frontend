interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;
}

export type { AuthState };
