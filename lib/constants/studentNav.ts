import { Home, ClipboardList, Trophy, User } from "lucide-react";

export const STUDENT_NAV_ITEMS = [
  { label: "Beranda", href: "/dashboard/student", icon: Home },
  { label: "Rekap", href: "/dashboard/student/rekap", icon: ClipboardList },
  { label: "Papan Juara", href: "/dashboard/student/papan-juara", icon: Trophy },
  { label: "Profil", href: "/dashboard/student/profil", icon: User },
];
