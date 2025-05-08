export interface ConfirmedScheduleProps {
  confirmedCandidate: string;
}

export interface ScheduleCandidateItemProps {
  candidate: string[];
  isSelected: boolean;
  onSelect: (value: string) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface ScheduleCandidateListProps {
  candidates: string[][];
  selectedCandidate: string;
  onSelectCandidate: (value: string) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface ScheduleFormProps {
  lastname: string;
  firstname: string;
  company: string;
  email: string;
  selectedCandidate: string;
  isLoading: boolean;
  filteredCandidates: string[][];
  onLastNameChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSelectCandidate: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export interface UseScheduleFormProps {
  apiUrl: string;
}

export interface FormData {
  users: { email: string }[];
  candidates: string[][];
  start_time: string;
  end_time: string;
  selected_days: string[];
  isConfirmed: boolean;
  confirmedCandidate: string;
}
