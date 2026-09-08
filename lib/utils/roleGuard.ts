import { UserRole } from "@/lib/types/authType";

export function isStudent(role?: UserRole): boolean {
  return role === "student";
}
