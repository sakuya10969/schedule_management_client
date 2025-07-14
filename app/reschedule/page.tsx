'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';

import { ScheduleCandidateItem } from '@/app/appointment/components/ScheduleCandidateItem';
import { formatDatePart, formatTimePart, formatScheduleInterviewDatetime } from '@/features/appointment/utils';
import { getRescheduleData, submitRescheduleData } from '@/features/reschedule/api';

export default function ReschedulePage() {
  const [showRescheduleForm, setShowRescheduleForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleInterviewDatetimes, setScheduleInterviewDatetimes] = useState<string[][]>([]);
  const [selectedScheduleInterviewDatetime, setSelectedScheduleInterviewDatetime] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const cosmosDbId = searchParams.get('cosmosDbId');

  useEffect(() => {
    if (showRescheduleForm && cosmosDbId) {
      loadRescheduleData();
    }
  }, [showRescheduleForm, cosmosDbId]);

  const loadRescheduleData = async () => {
    try {
      setIsLoading(true);
      const data = await getRescheduleData(cosmosDbId!);
      setScheduleInterviewDatetimes(data.scheduleInterviewDatetimes || []);
    } catch (error) {
      console.error('Error loading reschedule data:', error);
      alert('データの読み込みに失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowRescheduleForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedScheduleInterviewDatetime) {
      alert('日程を選択してください。');
      return;
    }

    try {
      setIsLoading(true);
      const formattedCandidate =
      selectedScheduleInterviewDatetime === 'none'
        ? 'なし'
        : formatScheduleInterviewDatetime(selectedScheduleInterviewDatetime.split(', '));
      await submitRescheduleData(cosmosDbId!, formattedCandidate);
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error submitting reschedule:', error);
      alert('日程の変更に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectScheduleInterviewDatetime = (datetime: string) => {
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
              {selectedScheduleInterviewDatetime !== 'none' && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    新しい日程: {selectedScheduleInterviewDatetime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showRescheduleForm) {
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
            
            <form onSubmit={handleSubmit}>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">日程の変更</h1>

      <p className="text-gray-700 mb-8 text-center">
        既に確定した日程をキャンセルし、再度選び直すことができます。
      </p>

      <div className="text-center">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          予定をキャンセルして再選択する
        </button>
      </div>
    </div>
  );
}
