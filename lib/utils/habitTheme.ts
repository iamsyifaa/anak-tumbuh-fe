import {
  Sunrise,
  HandHeart,
  BookOpen,
  Dumbbell,
  Users,
  Utensils,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { HabitKey } from "@/lib/types/habitType";

interface HabitTheme {
  icon: LucideIcon;
  bg: string;
  iconBg: string;
  iconText: string;
  border: string;
}

const THEME_MAP: Record<HabitDefinitionColor, Omit<HabitTheme, "icon">> = {
  blue: { bg: "bg-sky-50", iconBg: "bg-sky-100", iconText: "text-sky-600", border: "border-sky-100" },
  green: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconText: "text-emerald-600", border: "border-emerald-100" },
  violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", iconText: "text-violet-600", border: "border-violet-100" },
  orange: { bg: "bg-orange-50", iconBg: "bg-orange-100", iconText: "text-orange-600", border: "border-orange-100" },
  amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", iconText: "text-amber-600", border: "border-amber-100" },
  pink: { bg: "bg-pink-50", iconBg: "bg-pink-100", iconText: "text-pink-600", border: "border-pink-100" },
  indigo: { bg: "bg-indigo-50", iconBg: "bg-indigo-100", iconText: "text-indigo-600", border: "border-indigo-100" },
};

type HabitDefinitionColor = "blue" | "green" | "violet" | "orange" | "amber" | "pink" | "indigo";

const ICON_MAP: Record<HabitKey, LucideIcon> = {
  wake_up_early: Sunrise,
  worship: HandHeart,
  study: BookOpen,
  exercise: Dumbbell,
  socialize: Users,
  eat_healthy: Utensils,
  sleep_early: Moon,
};

export function getHabitTheme(key: HabitKey, colorTheme: HabitDefinitionColor): HabitTheme {
  return { icon: ICON_MAP[key], ...THEME_MAP[colorTheme] };
}
