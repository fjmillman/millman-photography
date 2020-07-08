export interface LoginData {
  email: string;
  password: string;
}

export interface LoginState {
  isFetching: boolean;
  error: string | null;
  isLoggedIn: boolean;
}
