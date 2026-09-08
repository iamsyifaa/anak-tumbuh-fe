// Role resmi mengikuti Dokumen Requirement ANAKTUMBUH v2 bagian 2
// (Super Admin, Headmaster, Teacher, Student).
export type UserRole = "super_admin" | "headmaster" | "teacher" | "student";

export interface AuthenticatedUser {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  schoolId?: string;
  schoolName?: string;
  classGroupId?: string;
  className?: string;
  nisn?: string;
  avatarUrl?: string;
}

export interface PasswordLoginPayload {
  username: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: AuthenticatedUser;
}

export interface AuthApiResponse {
  code: number;
  status: string;
  message: string;
  data: AuthenticatedUser;
  access_token: string;
}
