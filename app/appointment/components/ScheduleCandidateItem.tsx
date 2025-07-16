import React from 'react';
import { Calendar, Clock, Check } from 'lucide-react';

import { ScheduleCandidateItemProps } from '@/features/appointment/types';
import { formatDatePart, formatTimePart } from '@/features/appointment/utils';

export const ScheduleCandidateItem = ({
  scheduleInterviewDatetime,
  isSelected,
  onSelectScheduleInterviewDatetime,
}: ScheduleCandidateItemProps) => {
  const candidateValue = scheduleInterviewDatetime.join(', ');
  const candidateDate = formatDatePart(scheduleInterviewDatetime[0]);
  const startTime = formatTimePart(scheduleInterviewDatetime[0]);
  const endTime = formatTimePart(scheduleInterviewDatetime[1]);

  return (
    <div
      onClick={() => onSelectScheduleInterviewDatetime(candidateValue)}
      className={`cursor-pointer relative rounded-xl border-2 transition-colors duration-300 p-6 flex justify-between items-center active:ring-2 active:ring-blue-400 ${
        isSelected
          ? 'border-blue-500 bg-blue-100 shadow-lg'
          : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Calendar
            className={`h-6 w-6 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`}
          />
          <span
            className={`text-xl ${isSelected ? 'font-semibold text-blue-500' : 'text-gray-700'}`}
          >
            {candidateDate}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock
            className={`h-6 w-6 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`}
          />
          <span
            className={`text-xl ${isSelected ? 'font-semibold text-blue-500' : 'text-gray-700'}`}
          >
            {startTime} - {endTime}
          </span>
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
      >
        <Check
          className={`w-5 h-5 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
};
