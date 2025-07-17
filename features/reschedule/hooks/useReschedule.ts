import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  formatScheduleInterviewDatetime, 
  filterScheduleInterviewDatetimes, 
  parseScheduleDatetimeString,
  excludeCurrentScheduleDatetime,
} from '@/features/appointment/utils';
import { getRescheduleData, submitRescheduleData } from '@/features/reschedule/api';

export const useReschedule = () => {
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

  const currentParsedScheduleDatetime = currentScheduleInterviewDatetime 
    ? parseScheduleDatetimeString(currentScheduleInterviewDatetime) 
    : null;

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

  return {
    isLoading,
    selectedScheduleInterviewDatetime,
    isConfirmed,
    dataLoaded,
    currentParsedScheduleDatetime,
    filteredRecheduleInterviewDatetimes,
    formattedScheduleInterviewDatetime,
    handleSubmit,
    onSelectScheduleInterviewDatetime,
  };
};
