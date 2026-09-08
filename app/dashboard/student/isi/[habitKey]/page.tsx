import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHabitDefinition } from "@/lib/constants/habitDefinitions";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import HabitFillHeader from "@/components/features/habit-fill/HabitFillHeader";
import HabitFillForm from "@/components/features/habit-fill/HabitFillForm";

export const metadata: Metadata = {
  title: "Isi Kebiasaan | anaktumbuh.id",
};

const HabitFillPage = async ({
  params,
}: {
  params: Promise<{ habitKey: string }>;
}) => {
  const { habitKey } = await params;
  const habit = getHabitDefinition(habitKey);

  if (!habit) {
    notFound();
  }

  return (
    <StudentDashboardLayout>
      <HabitFillHeader habit={habit} />
      <HabitFillForm habit={habit} />
    </StudentDashboardLayout>
  );
};

export default HabitFillPage;
