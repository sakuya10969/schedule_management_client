import React from 'react';
import { Check } from 'lucide-react';

import { ScheduleCandidateItem } from './ScheduleCandidateItem';

interface ScheduleCandidateListProps {
  candidates: string[][];
  selectedCandidate: string;
  onSelectCandidate: (value: string) => void;
  formatDatePart: (isoString: string) => string;
  formatTimePart: (isoString: string) => string;
}

export const ScheduleCandidateList: React.FC<ScheduleCandidateListProps> = ({
  candidates,
  selectedCandidate,
  onSelectCandidate,
  formatDatePart,
  formatTimePart,
}) => {
  return (
    <div className="grid gap-6">
      {candidates.map((candidate, index) => (
        <ScheduleCandidateItem
          key={index}
          candidate={candidate}
          isSelected={selectedCandidate === candidate.join(", ")}
          onSelect={onSelectCandidate}
          formatDatePart={formatDatePart}
          formatTimePart={formatTimePart}
        />
      ))}
      {/* 「可能な日程がない」選択肢 */}
      <div
        onClick={() => onSelectCandidate("none")}
        className={`cursor-pointer relative rounded-xl border-2 p-6 flex justify-between items-center ${
          selectedCandidate === "none"
            ? "border-red-500 bg-red-100 shadow-lg"
            : "border-gray-300 hover:border-red-400 hover:shadow-md"
        }`}
      >
        <div className="flex items-center space-x-6">
          <span
            className={`text-xl ${
              selectedCandidate === "none"
                ? "font-semibold text-red-500"
                : "text-gray-700"
            }`}
          >
            可能な日程がない
          </span>
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            selectedCandidate === "none"
              ? "bg-red-500 text-white"
              : "bg-gray-300"
          }`}
        >
          <Check className={`w-5 h-5 ${selectedCandidate === "none" ? "opacity-100" : "opacity-0"}`} />
        </div>
      </div>
    </div>
  );
}; 