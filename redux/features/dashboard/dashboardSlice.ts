import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialRecords } from "@/lib/data/habits";
import { DashboardPage, HabitId, HabitRecord } from "@/lib/types/dashboardType";

interface DashboardState {
  activePage: DashboardPage;
  selectedHabit: HabitId | null;
  records: HabitRecord[];
}

const initialState: DashboardState = {
  activePage: "home",
  selectedHabit: null,
  records: initialRecords,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<DashboardPage>) => {
      state.activePage = action.payload;
      state.selectedHabit = null;
    },
    openHabit: (state, action: PayloadAction<HabitId>) => {
      state.selectedHabit = action.payload;
    },
    closeHabit: (state) => {
      state.selectedHabit = null;
    },
    saveHabit: (state, action: PayloadAction<HabitRecord>) => {
      state.records = [
        action.payload,
        ...state.records.filter(
          (record) => record.habitId !== action.payload.habitId,
        ),
      ];
      state.selectedHabit = null;
      state.activePage = "home";
    },
  },
});

export const { setActivePage, openHabit, closeHabit, saveHabit } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
