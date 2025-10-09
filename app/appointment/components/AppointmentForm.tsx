import React from 'react';

import { ScheduleCandidateList } from '@/app/appointment/components';
import { AppointmentFormProps } from '@/features/appointment/types';

export const AppointmentForm = ({
  candidateLastname,
  candidateFirstname,
  company,
  university,
  candidateEmail,
  selectedScheduleInterviewDatetime,
  isLoading,
  filteredScheduleInterviewDatetimes,
  onCandidateLastNameChange,
  onCandidateFirstNameChange,
  onCompanyChange,
  onUniversityChange,
  onCandidateEmailChange,
  onSelectScheduleInterviewDatetime,
  onSubmit,
}: AppointmentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 入力フィールド：氏名*/}
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            氏
          </label>
          <input
            type="text"
            id="name"
            value={candidateLastname}
            onChange={(e) => onCandidateLastNameChange(e.target.value)}
            placeholder="山田"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            名
          </label>
          <input
            type="text"
            id="name"
            value={candidateFirstname}
            onChange={(e) => onCandidateFirstNameChange(e.target.value)}
            placeholder="太郎"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>
      {/* 入力フィールド：会社名*/}
      <div>
        <label
          htmlFor="company"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          会社名
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          placeholder="株式会社〇〇"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* 入力フィールド：大学名*/}
      <div>
        <label
          htmlFor="university"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          大学名
        </label>
        <input
          type="text"
          id="university"
          value={university}
          onChange={(e) => onUniversityChange(e.target.value)}
          placeholder="〇〇大学"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      {/* 入力フィールド：連絡先（メールアドレス） */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          連絡先 (メールアドレス)
        </label>
        <input
          type="email"
          id="email"
          value={candidateEmail}
          onChange={(e) => onCandidateEmailChange(e.target.value)}
          placeholder="example@domain.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* 日程候補の表示 */}
      <ScheduleCandidateList
        scheduleInterviewDatetimes={filteredScheduleInterviewDatetimes}
        selectedScheduleInterviewDatetime={selectedScheduleInterviewDatetime}
        onSelectScheduleInterviewDatetime={onSelectScheduleInterviewDatetime}
      />
      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 mt-8 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white text-lg font-semibold rounded-lg shadow-md ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? '処理中...' : '日程を確定する'}
      </button>
    </form>
  );
};
