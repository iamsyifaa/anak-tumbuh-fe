import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { getLocalDateKey } from "@/lib/utils/date";
import { getPendingHabitSubmissions } from "@/lib/pwa/offlineDb";
import { StudentDashboardResponse } from "@/lib/types/studentDashboard";

interface State { data: StudentDashboardResponse | null; loading: boolean; error: string | null; }
const initialState: State = { data: null, loading: false, error: null };

export const fetchStudentDashboard = createAsyncThunk(
  "studentHome/fetch",
  async (): Promise<StudentDashboardResponse> => {
    const response = await studentDashboardApi.getDashboard();

    try {
      const pending = await getPendingHabitSubmissions(getLocalDateKey());
      const pendingHabitIds = new Set(pending.map((item) => item.habit_id));
      if (pendingHabitIds.size === 0) return response;

      return {
        ...response,
        habits: response.habits.map((habit) => ({
          ...habit,
          completed: habit.completed || pendingHabitIds.has(habit.id),
        })),
      };
    } catch {
      return response;
    }
  },
);

const homeSlice = createSlice({
  name: "studentHome",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentDashboard.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchStudentDashboard.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; });
    builder.addCase(fetchStudentDashboard.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Gagal memuat beranda."; });
  },
});

export default homeSlice.reducer;
