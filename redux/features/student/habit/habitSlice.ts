import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { HabitFormResponse, HabitId, SubmitHabitResponse } from "@/lib/types/studentDashboard";

interface State { data: HabitFormResponse | null; values: Record<string, string>; loading: boolean; submitting: boolean; error: string | null; submitResult: SubmitHabitResponse | null; }
const initialState: State = { data: null, values: {}, loading: false, submitting: false, error: null, submitResult: null };

export const fetchHabitForm = createAsyncThunk("studentHabit/fetchForm", (habitId: HabitId) => studentDashboardApi.getHabitForm(habitId));
export const submitHabit = createAsyncThunk("studentHabit/submit", ({ habitId, values }: { habitId: HabitId; values: Record<string, string> }) => studentDashboardApi.submitHabit({ habitId, values }));

const habitSlice = createSlice({
  name: "studentHabit",
  initialState,
  reducers: {
    setHabitValue: (state, action: PayloadAction<{ fieldId: string; value: string }>) => { state.values[action.payload.fieldId] = action.payload.value; },
    resetHabitState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabitForm.pending, (state) => { state.loading = true; state.error = null; state.submitResult = null; state.values = {}; });
    builder.addCase(fetchHabitForm.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; state.values = action.payload.submittedValue ?? {}; });
    builder.addCase(fetchHabitForm.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Gagal memuat form kebiasaan."; });
    builder.addCase(submitHabit.pending, (state) => { state.submitting = true; state.error = null; });
    builder.addCase(submitHabit.fulfilled, (state, action) => { state.submitting = false; state.submitResult = action.payload; if (state.data) state.data.locked = action.payload.locked; });
    builder.addCase(submitHabit.rejected, (state, action) => { state.submitting = false; state.error = action.error.message ?? "Gagal menyimpan kebiasaan."; });
  },
});

export const { setHabitValue, resetHabitState } = habitSlice.actions;
export default habitSlice.reducer;
