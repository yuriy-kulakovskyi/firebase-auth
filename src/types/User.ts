export interface User {
  email: string;
  passwordHash: string;
  displayName: string;
  role: 'user' | 'admin';
  uid?: string;
}