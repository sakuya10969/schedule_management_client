export interface ConfirmedScheduleProps {
  confirmedScheduleInterviewDatetime: string;
}

export interface ScheduleCandidateItemProps {
  scheduleInterviewDatetime: string[];
  isSelected: boolean;
  onSelectScheduleInterviewDatetime: (value: string | null) => void;
}

export interface ScheduleCandidateListProps {
  scheduleInterviewDatetimes: string[][];
  selectedScheduleInterviewDatetime: string | null;
  onSelectScheduleInterviewDatetime: (value: string | null) => void;
}

export interface ScheduleFormProps {
  candidateLastname: string;
  candidateFirstname: string;
  company: string;
  candidateEmail: string;
  selectedScheduleInterviewDatetime: string | null;
  isLoading: boolean;
  filteredScheduleInterviewDatetimes: string[][];
  onCandidateLastNameChange: (value: string) => void;
  onCandidateFirstNameChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onCandidateEmailChange: (value: string) => void;
  onSelectScheduleInterviewDatetime: (value: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
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
  cosmos_db_id: string | null;
  candidate_id: number | null;
  interview_stage: string | null;
}
