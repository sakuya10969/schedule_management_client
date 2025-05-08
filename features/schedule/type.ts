import { FormEventHandler } from 'react';

export interface CandidateListProps {
  candidates: string[][];
  minTime: string;
  maxTime: string;
  isLoading: boolean;
  selectedDays: string[];
}

export interface DateRangePickerProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

export interface DurationSelectorProps {
  durationMinutes: number;
  setDurationMinutes: (value: number) => void;
}

export interface User {
  email: string;
}

export interface ParticipantsInputProps {
  users: User[];
  handleAddUser: () => void;
  handleRemoveUser: (index: number) => void;
  handleChangeUserEmail: (index: number, value: string) => void;
  requiredParticipants: number;
  setRequiredParticipants: (value: number) => void;
}

export interface ScheduleFormProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
  durationMinutes: number;
  setDurationMinutes: (value: number) => void;
  users: User[];
  handleAddUser: () => void;
  handleRemoveUser: (index: number) => void;
  handleChangeUserEmail: (index: number, value: string) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  requiredParticipants: number;
  setRequiredParticipants: (value: number) => void;
}

export interface TimeRangePickerProps {
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
}

export interface WeekdaySelectorProps {
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
}

export interface GetAvailabilityParams {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  selected_days: string[];
  duration_minutes: number;
  users: { email: string }[];
  required_participants: number;
}

export interface StoreFormDataParams {
  isConfirmed: boolean;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  selected_days: string[];
  duration_minutes: number;
  users: { email: string }[];
  candidates: string[][];
}
