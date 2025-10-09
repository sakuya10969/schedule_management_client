export interface CandidateDateListProps {
  scheduleInterviewDatetimes: string[][];
  startTime: string;
  endTime: string;
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

export interface EmployeeEmail {
  email: string;
}

export interface ParticipantsInputProps {
  employeeEmails: EmployeeEmail[];
  setEmployeeEmails: (employeeEmails: EmployeeEmail[]) => void;
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
  employeeEmails: EmployeeEmail[];
  setEmployeeEmails: (employeeEmails: EmployeeEmail[]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
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
  employee_emails: { email: string }[];
  required_participants: number;
}

export interface StoreFormDataParams {
  is_confirmed: boolean;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  selected_days: string[];
  duration_minutes: number;
  employee_emails: { email: string }[];
  schedule_interview_datetimes: string[][];
  required_participants: number;
  slot_employees_map: Record<string, string[]>;
}

export interface Option {
  name: string;
  email: string;
}

export interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}
