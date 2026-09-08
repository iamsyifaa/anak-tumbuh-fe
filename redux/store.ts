import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";
import dashboard from "./features/dashboard/dashboardSlice";
import habit from "./features/habit/habitSlice";
import leaderboard from "./features/leaderboard/leaderboardSlice";
import studentHome from "./features/student/home/homeSlice";
import studentHabit from "./features/student/habit/habitSlice";
import studentRecap from "./features/student/recap/recapSlice";
import studentLeaderboard from "./features/student/leaderboard/leaderboardSlice";
import studentProfile from "./features/student/profile/profileSlice";

const store = configureStore({
  reducer: {
    auth,
    dashboard,
    habit,
    leaderboard,
    studentHome,
    studentHabit,
    studentRecap,
    studentLeaderboard,
    studentProfile,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
