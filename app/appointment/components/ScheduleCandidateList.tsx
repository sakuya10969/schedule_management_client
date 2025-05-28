import React from 'react';
import { Check } from 'lucide-react';

import { ScheduleCandidateItem } from '@/app/appointment/components/ScheduleCandidateItem';
import { ScheduleCandidateListProps } from '@/features/appointment/types';

export const ScheduleCandidateList = ({
  scheduleInterviewDatetimes,
  selectedScheduleInterviewDatetime,
  onSelectScheduleInterviewDatetime,
  formatDatePart,
  formatTimePart,
}: ScheduleCandidateListProps) => {
  return (
    <div className="grid gap-6">
      {scheduleInterviewDatetimes.map((scheduleInterviewDatetime, index) => (
        <ScheduleCandidateItem
          key={index}
          scheduleInterviewDatetime={scheduleInterviewDatetime}
          isSelected={selectedScheduleInterviewDatetime === scheduleInterviewDatetime.join(', ')}
          onSelectScheduleInterviewDatetime={onSelectScheduleInterviewDatetime}
          formatDatePart={formatDatePart}
          formatTimePart={formatTimePart}
        />
      ))}
      {/* 「可能な日程がない」選択肢 */}
      <div
        onClick={() => onSelectScheduleInterviewDatetime('none')}
        className={`cursor-pointer relative rounded-xl border-2 p-6 flex justify-between items-center ${
          selectedScheduleInterviewDatetime === 'none'
            ? 'border-red-500 bg-red-100 shadow-lg'
            : 'border-gray-300 hover:border-red-400 hover:shadow-md'
        }`}
      >
        <div className="flex items-center space-x-6">
          <span
            className={`text-xl ${
              selectedScheduleInterviewDatetime === 'none'
                ? 'font-semibold text-red-500'
                : 'text-gray-700'
            }`}
          >
            可能な日程がない
          </span>
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            selectedScheduleInterviewDatetime === 'none'
              ? 'bg-red-500 text-white'
              : 'bg-gray-300'
          }`}
        >
          <Check
            className={`w-5 h-5 ${selectedScheduleInterviewDatetime === 'none' ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </div>
  );
};
