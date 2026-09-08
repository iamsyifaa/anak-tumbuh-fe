import { getLeaderboardApi } from "@/lib/api/leaderboardApi";
import { LeaderboardEntry, LeaderboardScope } from "@/lib/types/leaderboardType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface LeaderboardState {
  scope: LeaderboardScope;
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  scope: "class",
  entries: [],
  loading: false,
  error: null,
};

export const getLeaderboard = createAsyncThunk<
  LeaderboardEntry[],
  { scope: LeaderboardScope },
  { state: RootState }
>("leaderboard/getLeaderboard", async ({ scope }, { getState }) => {
  const { accessToken } = getState().auth;
  return getLeaderboardApi(accessToken, scope);
});

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboardScope: (state, action: PayloadAction<LeaderboardScope>) => {
      state.scope = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboard.fulfilled, (state, action: PayloadAction<LeaderboardEntry[]>) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat papan peringkat";
      });
  },
});

export const { setLeaderboardScope } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
