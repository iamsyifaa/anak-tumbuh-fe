import { UserRole } from "@/lib/types/authType";

// Setiap role memiliki dashboard terpisah (lihat instruksi: "dashboard sekarang
// terpisah per role"). Halaman dashboard di bawah ini akan diisi bertahap,
// dimulai dari dashboard Student.
const ROLE_DASHBOARD_PATH: Record<UserRole, string> = {
  super_admin: "/dashboard/super-admin",
  headmaster: "/dashboard/headmaster",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
};

export function getDashboardPathByRole(role: UserRole): string {
  return ROLE_DASHBOARD_PATH[role];
}
