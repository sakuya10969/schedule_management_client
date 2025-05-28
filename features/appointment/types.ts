export interface ConfirmedScheduleProps {
  confirmedScheduleInterviewDatetime: string;
}

export interface ScheduleCandidateItemProps {
  scheduleInterviewDatetime: string[];
  isSelected: boolean;
  onSelectScheduleInterviewDatetime: (value: string) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface ScheduleCandidateListProps {
  scheduleInterviewDatetimes: string[][];
  selectedScheduleInterviewDatetime: string;
  onSelectScheduleInterviewDatetime: (value: string) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface ScheduleFormProps {
  candidateLastname: string;
  candidateFirstname: string;
  company: string;
  candidateEmail: string;
  selectedScheduleInterviewDatetime: string;
  isLoading: boolean;
  filteredScheduleInterviewDatetimes: string[][];
  onCandidateLastNameChange: (value: string) => void;
  onCandidateFirstNameChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onCandidateEmailChange: (value: string) => void;
  onSelectScheduleInterviewDatetime: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface UseScheduleFormProps {
  apiUrl: string;
}

export interface FormData {
  employee_emails: { email: string }[];
  schedule_interview_datetimes: string[][];
  start_time: string;
  end_time: string;
  selected_days: string[];
  is_confirmed: boolean;
  confirmedCandidate: string;
  required_participants: number;
}

export interface SubmitSchedulePayload {
  schedule_interview_datetime: string | null;
  employee_email: string;
  candidate_lastname: string;
  candidate_firstname: string;
  company: string;
  candidate_email: string;
  az_cosmos_id: string | null;
  candidate_id: string | null;
  interview_stage: string | null;
}
