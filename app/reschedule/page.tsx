'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';

import { ScheduleCandidateList } from '@/app/appointment/components/ScheduleCandidateList';
import {
  formatDatePart,
  formatTimePart,
 } from '@/features/appointment/utils';
import { useReschedule } from '@/features/reschedule/hooks/useReschedule';

export default function ReschedulePage() {
  const {
    isLoading,
    selectedScheduleInterviewDatetime,
    isConfirmed,
    dataLoaded,
    currentParsedScheduleDatetime,
    filteredRecheduleInterviewDatetimes,
    formattedScheduleInterviewDatetime,
    handleSubmit,
    onSelectScheduleInterviewDatetime,
  } = useReschedule();

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-4">
                日程変更完了
              </h1>
              <p className="text-gray-600 text-lg">
                日程の変更が完了しました。
              </p>
              {formattedScheduleInterviewDatetime !== 'なし' && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    新しい日程: {formattedScheduleInterviewDatetime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              日程の再選択
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              以下の候補から新しい希望日程を選択してください。
            </p>
          </div>

          {/* 現在の予定の表示 */}
          {currentParsedScheduleDatetime && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">現在の予定日時</h2>
              <div className="bg-white border border-black rounded-xl p-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-black" />
                    <span className="text-xl font-semibold text-black">
                      {formatDatePart(currentParsedScheduleDatetime[0])}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-black" />
                    <span className="text-xl font-semibold text-black">
                      {formatTimePart(currentParsedScheduleDatetime[0])}～{formatTimePart(currentParsedScheduleDatetime[1])}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {dataLoaded ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">新しい日程を選択</h2>
              {/* 日程候補の表示 */}
              <ScheduleCandidateList
                scheduleInterviewDatetimes={filteredRecheduleInterviewDatetimes}
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
                {isLoading ? '処理中...' : '日程を変更する'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">
                {isLoading ? 'データを読み込み中...' : 'データの読み込みに失敗しました。'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
