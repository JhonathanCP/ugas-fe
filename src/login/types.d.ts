export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  access_token: string;
  refresh_token: string;
}

declare module "./pixel-canvas" {
  export {};
}
