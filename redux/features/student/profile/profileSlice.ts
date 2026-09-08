import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentDashboardApi } from "@/lib/api/studentDashboardApi";
import { ProfileResponse } from "@/lib/types/studentDashboard";
interface State { data: ProfileResponse | null; loading: boolean; error: string | null; }
const initialState: State = { data: null, loading: false, error: null };
export const fetchProfile = createAsyncThunk("studentProfile/fetch", () => studentDashboardApi.getProfile());
const profileSlice = createSlice({ name: "studentProfile", initialState, reducers: {}, extraReducers: (builder) => {
  builder.addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null; });
  builder.addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; });
  builder.addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Gagal memuat profil."; });
} });
export default profileSlice.reducer;
