export interface IUserRepository {
  findByEmail(email: string): Promise<any>;
  findById(id: string): Promise<any>;
  create(userData: any): Promise<any>;
  update(id: string, userData: any): Promise<any>;
  updateRefreshToken(id: string, refreshToken: string | null): Promise<void>;
}
