import React from 'react';
import { Check } from 'lucide-react';

import { ScheduleCandidateItem } from '@/app/appointment/components';
import { ScheduleCandidateListProps } from '@/features/appointment/types';

export const ScheduleCandidateList = ({
  scheduleInterviewDatetimes,
  selectedScheduleInterviewDatetime,
  onSelectScheduleInterviewDatetime,
}: ScheduleCandidateListProps) => {
  return (
    <div className="grid gap-6">
      {scheduleInterviewDatetimes.map((scheduleInterviewDatetime, index) => (
        <ScheduleCandidateItem
          key={index}
          scheduleInterviewDatetime={scheduleInterviewDatetime}
          isSelected={selectedScheduleInterviewDatetime === scheduleInterviewDatetime.join(', ')}
          onSelectScheduleInterviewDatetime={onSelectScheduleInterviewDatetime}
        />
      ))}
      {/* 「可能な日程がない」選択肢 */}
      <div
        onClick={() => onSelectScheduleInterviewDatetime(null)}
        className={`cursor-pointer relative rounded-xl border-2 p-6 flex justify-between items-center ${
          selectedScheduleInterviewDatetime === null
            ? 'border-red-500 bg-red-100 shadow-lg'
            : 'border-gray-300 hover:border-red-400 hover:shadow-md'
        }`}
      >
        <div className="flex items-center space-x-6">
          <span
            className={`text-xl ${
              selectedScheduleInterviewDatetime === null
                ? 'font-semibold text-red-500'
                : 'text-gray-700'
            }`}
          >
            可能な日程がない
          </span>
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            selectedScheduleInterviewDatetime === null
              ? 'bg-red-500 text-white'
              : 'bg-gray-300'
          }`}
        >
          <Check
            className={`w-5 h-5 ${selectedScheduleInterviewDatetime === null ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </div>
  );
};
