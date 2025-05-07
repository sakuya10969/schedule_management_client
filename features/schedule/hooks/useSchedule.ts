import { useState } from "react";

import { weekdays } from "@/constants";

export const useSchedule = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("18:00");
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [selectedDays, setSelectedDays] = useState<string[]>(weekdays);
  const [requiredParticipants, setRequiredParticipants] = useState<number>(1);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    durationMinutes,
    setDurationMinutes,
    selectedDays,
    setSelectedDays,
    requiredParticipants,
    setRequiredParticipants,
  };
}; 