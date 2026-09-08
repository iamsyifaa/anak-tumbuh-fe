"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getTodaySummary } from "@/redux/features/habit/habitSlice";
import GreetingHero from "./GreetingHero";
import DailySummaryCards from "./DailySummaryCards";
import HabitGrid from "./HabitGrid";

function StudentHomeContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { todaySummary, loading } = useSelector((state: RootState) => state.habit);

  useEffect(() => {
    dispatch(getTodaySummary());
  }, [dispatch]);

  return (
    <div>
      <GreetingHero />
      <DailySummaryCards summary={todaySummary} loading={loading} />
      <HabitGrid summary={todaySummary} />
    </div>
  );
}

export default StudentHomeContent;
