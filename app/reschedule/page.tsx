'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';

import { ScheduleCandidateList } from '@/app/appointment/components/ScheduleCandidateList';
import { 
  formatDatePart, 
  formatTimePart, 
  formatScheduleInterviewDatetime, 
  filterScheduleInterviewDatetimes, 
  filterFutureSchedules, 
  parseScheduleDatetimeString,
  excludeCurrentScheduleDatetime,
 } from '@/features/appointment/utils';
import { getRescheduleData, submitRescheduleData } from '@/features/reschedule/api';

export default function ReschedulePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleInterviewDatetimes, setScheduleInterviewDatetimes] = useState<string[][]>([]);
  const [currentScheduleInterviewDatetime, setCurrentScheduleInterviewDatetime] = useState<string>('');
  const [selectedScheduleInterviewDatetime, setSelectedScheduleInterviewDatetime] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const cosmosDbId = searchParams.get('cosmosDbId');

  useEffect(() => {
    if (cosmosDbId) {
      loadRescheduleData();
    }
  }, [cosmosDbId]);

  const loadRescheduleData = async () => {
    try {
      setIsLoading(true);
      const data = await getRescheduleData(cosmosDbId!);
      setScheduleInterviewDatetimes(data.schedule_interview_datetimes || []);
      setCurrentScheduleInterviewDatetime(data.schedule_interview_datetime || '');
      setStartTime(data.start_time || '09:00');
      setEndTime(data.end_time || '18:00');
      setSelectedDays(data.selected_days || []);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error loading reschedule data:', error);
      alert('データの読み込みに失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedScheduleInterviewDatetime =
      selectedScheduleInterviewDatetime === null
        ? 'なし'
        : formatScheduleInterviewDatetime(selectedScheduleInterviewDatetime.split(', '));
  const filteredScheduleInterviewDatetimes = filterScheduleInterviewDatetimes(
    scheduleInterviewDatetimes,
    startTime,
    endTime,
    selectedDays
  );  
  const currentParsedScheduleDatetime = currentScheduleInterviewDatetime ? parseScheduleDatetimeString(currentScheduleInterviewDatetime) : null;
  const filteredRecheduleInterviewDatetimes = excludeCurrentScheduleDatetime(
    filteredScheduleInterviewDatetimes,
    currentParsedScheduleDatetime
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedScheduleInterviewDatetime) {
      alert('日程を選択してください。');
      return;
    }

        if (
          !window.confirm(
            `以下の日程で登録を行います:\n${formattedScheduleInterviewDatetime}\n\nこちらの内容で間違いないですか？`
          )
        ) {
          return;
        }

    try {
      setIsLoading(true);
      await submitRescheduleData({
        cosmos_db_id: cosmosDbId!,
        schedule_interview_datetime: selectedScheduleInterviewDatetime,
      });
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error submitting reschedule:', error);
      alert('日程の変更に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectScheduleInterviewDatetime = (datetime: string | null) => {
    setSelectedScheduleInterviewDatetime(datetime);
  };

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
              {formattedScheduleInterviewDatetime !== null && (
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
                      {formatTimePart(currentParsedScheduleDatetime[0])} - {formatTimePart(currentParsedScheduleDatetime[1])}
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
