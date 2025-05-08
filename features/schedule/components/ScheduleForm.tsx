'use client';
import { FormEventHandler } from 'react';

import DateRangePicker from '@/features/schedule/components/DateRangePicker';
import TimeRangePicker from '@/features/schedule/components/TimeRangePicker';
import WeekdaySelector from '@/features/schedule/components/WeekdaySelector';
import DurationSelector from '@/features/schedule/components/DurationSelector';
import ParticipantsInput from '@/features/schedule/components/ParticipantsInput';

interface User {
  email: string;
}

interface ScheduleFormProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
  durationMinutes: number;
  setDurationMinutes: (value: number) => void;
  users: User[];
  handleAddUser: () => void;
  handleRemoveUser: (index: number) => void;
  handleChangeUserEmail: (index: number, value: string) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  requiredParticipants: number;
  setRequiredParticipants: (value: number) => void;
}

const ScheduleForm = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedDays,
  setSelectedDays,
  durationMinutes,
  setDurationMinutes,
  users,
  handleAddUser,
  handleRemoveUser,
  handleChangeUserEmail,
  handleSubmit,
  requiredParticipants,
  setRequiredParticipants,
}: ScheduleFormProps) => {
  return (
    <div>
      <h1 className="mb-5 ml-2 font-semibold text-xl text-black">
        スケジュール調整
      </h1>
      <form onSubmit={handleSubmit} className="gap-4 md:grid-cols-2">
        {/* 日付範囲選択 */}
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {/* 時間範囲選択 */}
        <TimeRangePicker
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        {/* 曜日選択 */}
        <WeekdaySelector
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />

        {/* 面談時間選択 */}
        <DurationSelector
          durationMinutes={durationMinutes}
          setDurationMinutes={setDurationMinutes}
        />

        {/* 参加者メールアドレス入力 */}
        <ParticipantsInput
          users={users}
          handleAddUser={handleAddUser}
          handleRemoveUser={handleRemoveUser}
          handleChangeUserEmail={handleChangeUserEmail}
          requiredParticipants={requiredParticipants}
          setRequiredParticipants={setRequiredParticipants}
        />

        {/* フォーム送信ボタン */}
        <div className="md:col-span-2 ml-4">
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400 active:translate-y-0.3 active:scale-95 transition-all duration-200 text-xl text-black py-3 px-4 mt-2 mb-5 rounded"
          >
            候補日一覧を表示
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
