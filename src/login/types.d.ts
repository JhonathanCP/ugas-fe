export interface LoginRequest {
  username: string;
  password: string;
  recaptchaToken: string;
}

export interface LoginAuditSuccess {
  user: {
    idUser: number;
  };
  username: string;
  success: boolean;
}

export interface LoginAuditFailed {
  username: string;
  success: boolean;
}

export interface JwtResponse {
  access_token: string;
  refresh_token: string;
}