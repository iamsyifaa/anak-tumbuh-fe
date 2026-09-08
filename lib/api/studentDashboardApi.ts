import { envConfig } from "@/lib/config/envConfig";
import { StudentDashboardApi } from "@/lib/api/contracts/studentDashboardApi";
import { mockStudentDashboardApi } from "@/lib/api/mock/studentDashboardMock";
import { realStudentDashboardApi } from "@/lib/api/real/studentDashboardApi";

export const studentDashboardApi: StudentDashboardApi = envConfig.useMockApi
  ? mockStudentDashboardApi
  : realStudentDashboardApi;
