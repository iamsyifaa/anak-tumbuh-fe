import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { LeaderboardResponse, LeaderboardScope } from "@/lib/types/studentDashboard";

interface State { data: LeaderboardResponse | null; loading: boolean; error: string | null; scope: LeaderboardScope; }
const initialState: State = { data: null, loading: false, error: null, scope: "class" };
export const fetchLeaderboard = createAsyncThunk("studentLeaderboard/fetch", (scope: LeaderboardScope) => studentDashboardApi.getLeaderboard(scope));

const leaderboardSlice = createSlice({
  name: "studentLeaderboard",
  initialState,
  reducers: { setScope: (state, action: PayloadAction<LeaderboardScope>) => { state.scope = action.payload; } },
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; state.scope = action.payload.scope; });
    builder.addCase(fetchLeaderboard.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Gagal memuat papan juara."; });
  },
});
export const { setScope } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
