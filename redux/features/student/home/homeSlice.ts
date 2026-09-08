import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { StudentDashboardResponse } from "@/lib/types/studentDashboard";

interface State { data: StudentDashboardResponse | null; loading: boolean; error: string | null; }
const initialState: State = { data: null, loading: false, error: null };

export const fetchStudentDashboard = createAsyncThunk("studentHome/fetch", () => studentDashboardApi.getDashboard());

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
