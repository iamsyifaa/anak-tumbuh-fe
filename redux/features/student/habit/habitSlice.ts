import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { getLocalDateKey } from "@/lib/utils/date";
import {
  cacheHabitForm,
  getCachedHabitForm,
  getPendingHabitSubmission,
  savePendingHabitSubmission,
} from "@/lib/pwa/offlineDb";
import type {
  HabitFormResponse,
  HabitId,
  SubmitHabitResponse,
} from "@/lib/types/studentDashboard";
import type { RootState } from "@/redux/store";

interface State {
  data: HabitFormResponse | null;
  values: Record<string, string>;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  submitResult: SubmitHabitResponse | null;
}

const initialState: State = {
  data: null,
  values: {},
  loading: false,
  submitting: false,
  error: null,
  submitResult: null,
};

const applyPendingLock = async (
  response: HabitFormResponse,
  habitId: HabitId,
) => {
  try {
    const pending = await getPendingHabitSubmission(habitId, getLocalDateKey());
    if (!pending) return response;

    return {
      ...response,
      locked: true,
      submittedValue: pending.nilai,
    };
  } catch {
    return response;
  }
};

export const fetchHabitForm = createAsyncThunk(
  "studentHabit/fetchForm",
  async (habitId: HabitId) => {
    try {
      const response = await studentDashboardApi.getHabitForm(habitId);
      void cacheHabitForm(habitId, response).catch(() => undefined);
      return applyPendingLock(response, habitId);
    } catch (error) {
      const isNetworkFailure =
        error instanceof TypeError ||
        (typeof navigator !== "undefined" && !navigator.onLine);

      if (!isNetworkFailure) throw error;

      const cached = await getCachedHabitForm(habitId);
      if (!cached) {
        throw new Error(
          "Form kebiasaan belum tersedia secara offline. Buka kebiasaan ini saat online terlebih dahulu.",
        );
      }

      return applyPendingLock(cached, habitId);
    }
  },
);

export const submitHabit = createAsyncThunk<
  SubmitHabitResponse,
  { habitId: HabitId; values: Record<string, string> },
  { state: RootState }
>("studentHabit/submit", async ({ habitId, values }, thunkApi) => {
  const savePending = async () => {
    const studentId = thunkApi.getState().auth.user?.id ?? "student-unknown";
    const pending = await savePendingHabitSubmission({
      siswaId: studentId,
      habitId,
      values,
      dateKey: getLocalDateKey(),
    });

    return {
      success: true,
      message: "Data tersimpan di perangkat. Sinkronisasi menunggu API Backend.",
      completedAt: pending.created_at,
      pointsAwarded: 0,
      expAwarded: 0,
      locked: true,
    } satisfies SubmitHabitResponse;
  };

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return savePending();
  }

  try {
    const response = await studentDashboardApi.submitHabit({ habitId, values });
    const currentForm = thunkApi.getState().studentHabit.data;
    if (currentForm && response.locked) {
      void cacheHabitForm(habitId, {
        ...currentForm,
        locked: true,
        submittedValue: values,
      }).catch(() => undefined);
    }
    return response;
  } catch (error) {
    const networkFailure =
      error instanceof TypeError ||
      (typeof navigator !== "undefined" && !navigator.onLine);

    if (!networkFailure) throw error;
    return savePending();
  }
});

const habitSlice = createSlice({
  name: "studentHabit",
  initialState,
  reducers: {
    setHabitValue: (
      state,
      action: PayloadAction<{ fieldId: string; value: string }>,
    ) => {
      state.values[action.payload.fieldId] = action.payload.value;
    },
    resetHabitState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabitForm.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.submitResult = null;
      state.values = {};
    });
    builder.addCase(fetchHabitForm.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.values = action.payload.submittedValue ?? {};
    });
    builder.addCase(fetchHabitForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Gagal memuat form kebiasaan.";
    });
    builder.addCase(submitHabit.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(submitHabit.fulfilled, (state, action) => {
      state.submitting = false;
      state.submitResult = action.payload;
      if (state.data) state.data.locked = action.payload.locked;
    });
    builder.addCase(submitHabit.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.error.message ?? "Gagal menyimpan kebiasaan.";
    });
  },
});

export const { setHabitValue, resetHabitState } = habitSlice.actions;
export default habitSlice.reducer;
