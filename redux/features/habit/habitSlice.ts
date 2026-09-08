import { getTodaySummaryApi, submitHabitEntryApi } from "@/lib/api/habitApi";
import { DailyHabitSummary, HabitEntry } from "@/lib/types/habitType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface HabitState {
  todaySummary: DailyHabitSummary | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: HabitState = {
  todaySummary: null,
  loading: false,
  submitting: false,
  error: null,
};

export const getTodaySummary = createAsyncThunk<DailyHabitSummary, void, { state: RootState }>(
  "habit/getTodaySummary",
  async (_, { getState }) => {
    const { accessToken } = getState().auth;
    return getTodaySummaryApi(accessToken);
  }
);

export const submitHabitEntry = createAsyncThunk<
  { code: number; message: string; entry: HabitEntry },
  Omit<HabitEntry, "filledAt">,
  { state: RootState }
>("habit/submitHabitEntry", async (entry, { getState }) => {
  const { accessToken } = getState().auth;
  const result = await submitHabitEntryApi(accessToken, entry);
  return { ...result, entry: { ...entry, filledAt: new Date().toISOString() } };
});

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodaySummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTodaySummary.fulfilled,
        (state, action: PayloadAction<DailyHabitSummary>) => {
          state.loading = false;
          state.todaySummary = action.payload;
        }
      )
      .addCase(getTodaySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat ringkasan kebiasaan hari ini";
      })

      .addCase(submitHabitEntry.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitHabitEntry.fulfilled, (state, action) => {
        state.submitting = false;
        if (action.payload.code === 200 && state.todaySummary) {
          state.todaySummary.entries.push(action.payload.entry);
          state.todaySummary.completedCount += 1;
        }
      })
      .addCase(submitHabitEntry.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Gagal menyimpan kebiasaan";
      });
  },
});

export default habitSlice.reducer;
