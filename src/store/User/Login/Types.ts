export interface LoginData {
  emailAddress: string;
  password: string;
}

export interface LoginState {
  isFetching: boolean;
  error: string | null;
}
