'use client';

import { CalendarSearch, CalendarCheck2 } from 'lucide-react';

import DateRangePicker from '@/app/schedule/components/DateRangePicker';
import TimeRangePicker from '@/app/schedule/components/TimeRangePicker';
import WeekdaySelector from '@/app/schedule/components/WeekdaySelector';
import DurationSelector from '@/app/schedule/components/DurationSelector';
import ParticipantsInput from '@/app/schedule/components/ParticipantsInput';
import { ScheduleFormProps } from '@/features/schedule/types';
import { Button } from '@/components/ui/button';

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
  employeeEmails,
  setEmployeeEmails,
  handleSubmit,
  requiredParticipants,
  setRequiredParticipants,
}: ScheduleFormProps) => {
  return (
    <div>
      <h1 className="mt-4 mb-5 font-semibold text-xl text-black flex items-center gap-2">
        <CalendarSearch className="w-6 h-6" />
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
          employeeEmails={employeeEmails}
          setEmployeeEmails={setEmployeeEmails}
          requiredParticipants={requiredParticipants}
          setRequiredParticipants={setRequiredParticipants}
        />

        {/* フォーム送信ボタン */}
        <div className="md:col-span-2 mt-2">
          <Button
            type="submit"
            className="bg-blue-100 hover:bg-blue-200 active:translate-y-0.3 active:scale-95 transition-all duration-200 text-lg text-black p-3 mt-2 mb-5 rounded"
          >
            <CalendarCheck2 size={22} />
            <span>祝日を除いた候補日程一覧を表示</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
