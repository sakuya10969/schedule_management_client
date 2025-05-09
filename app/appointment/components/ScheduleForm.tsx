import React from 'react';

import { ScheduleCandidateList } from '@/app/appointment/components/ScheduleCandidateList';

interface ScheduleFormProps {
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

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  lastname,
  firstname,
  company,
  email,
  selectedCandidate,
  isLoading,
  filteredCandidates,
  onLastNameChange,
  onFirstNameChange,
  onCompanyChange,
  onEmailChange,
  onSelectCandidate,
  onSubmit,
  formatDatePart,
  formatTimePart,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 入力フィールド：氏名*/}
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            氏
          </label>
          <input
            type="text"
            id="name"
            value={lastname}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="山田"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            名
          </label>
          <input
            type="text"
            id="name"
            value={firstname}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="太郎"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>
      {/* 入力フィールド：会社名*/}
      <div>
        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
      {/* 入力フィールド：連絡先（メールアドレス） */}
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          連絡先 (メールアドレス)
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="example@domain.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      {/* 日程候補の表示 */}
      <ScheduleCandidateList
        candidates={filteredCandidates}
        selectedCandidate={selectedCandidate}
        onSelectCandidate={onSelectCandidate}
        formatDatePart={formatDatePart}
        formatTimePart={formatTimePart}
      />
      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 mt-8 bg-green-500 hover:bg-green-600 transition-all duration-200 text-white text-lg font-semibold rounded-lg shadow-md ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "処理中..." : "日程を確定する"}
      </button>
    </form>
  );
}; 