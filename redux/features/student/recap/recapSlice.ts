import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { RecapResponse } from "@/lib/types/studentDashboard";

interface State { data: RecapResponse | null; loading: boolean; error: string | null; selectedDate: string; }
const initialState: State = { data: null, loading: false, error: null, selectedDate: "2026-08-26" };
export const fetchRecap = createAsyncThunk("studentRecap/fetch", (dateKey: string | undefined) => studentDashboardApi.getRecap(dateKey));

const recapSlice = createSlice({
  name: "studentRecap",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => { state.selectedDate = action.payload; },
    resetRecap: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecap.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchRecap.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; state.selectedDate = action.payload.dateKey; });
    builder.addCase(fetchRecap.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Gagal memuat rekap."; });
  },
});
export const { setSelectedDate, resetRecap } = recapSlice.actions;
export default recapSlice.reducer;
