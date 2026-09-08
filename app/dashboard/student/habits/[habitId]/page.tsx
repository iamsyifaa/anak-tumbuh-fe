import StudentHabitFormPage from "@/components/features/student/habit/StudentHabitFormPage";

interface PageProps {
  params: Promise<{ habitId: string }>;
}

const StudentHabitFormRoute = async ({ params }: PageProps) => {
  const { habitId } = await params;
  return <StudentHabitFormPage habitId={habitId} />;
};

export default StudentHabitFormRoute;
