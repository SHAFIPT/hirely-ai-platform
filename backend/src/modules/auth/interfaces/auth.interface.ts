export interface IAuthService {
  register(registerDto: any): Promise<any>;
  login(loginDto: any): Promise<any>;
  refreshTokens(refreshToken: string): Promise<any>;
  logout(userId: string): Promise<void>;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
