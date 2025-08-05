import { parseISO, format } from 'date-fns';
import Holidays from 'date-holidays';

import { weekdays } from '@/constants';

// 候補日程のフォーマット
export const formatScheduleInterviewDatetime = (slotPair: string[]): string => {
  if (slotPair.length !== 2) {
    return slotPair.join(' ');
  }
  try {
    const startDate = parseISO(slotPair[0]);
    const endDate = parseISO(slotPair[1]);

    if (format(startDate, 'M/d') === format(endDate, 'M/d')) {
      const candidateDay = weekdays[startDate.getDay()];
      const datePart = format(startDate, 'M/d') + `(${candidateDay})`;
      const startTime = format(startDate, 'HH:mm');
      const endTime = format(endDate, 'HH:mm');
      return `${datePart} ${startTime}-${endTime}`;
    } else {
      const startDay = weekdays[startDate.getDay()];
      const endDay = weekdays[endDate.getDay()];
      const startFormatted =
        format(startDate, 'MM/dd') +
        `(${startDay}) ` +
        format(startDate, 'HH:mm');
      const endFormatted =
        format(endDate, 'MM/dd') + `(${endDay}) ` + format(endDate, 'HH:mm');
      return `${startFormatted} ~ ${endFormatted}`;
    }
  } catch (err) {
    console.error('Date parsing error:', err);
    return slotPair.join(' ');
  }
};

// 時間オプションを生成
export const generateTimeOptions = (): string[] => {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 0 && minute === 0) continue;
      const hh = String(hour).padStart(2, '0');
      const mm = String(minute).padStart(2, '0');
      options.push(`${hh}:${mm}`);
    }
  }
  return options;
};

// 候補日程をフィルタリング
export const filterScheduleInterviewDatetimes = (
  scheduleInterviewDatetimes: string[][],
  startTime: string,
  endTime: string,
  selectedDays: string[]
): string[][] => {
  return scheduleInterviewDatetimes.filter((slotPair) => {
    if (slotPair.length !== 2) return false;

    if (slotPair[0].substring(0, 10) !== slotPair[1].substring(0, 10))
      return false;

    const scheduleInterviewDatetimeStart = slotPair[0].substring(11, 16);
    const scheduleInterviewDatetimeEnd = slotPair[1].substring(11, 16);
    if (scheduleInterviewDatetimeEnd < scheduleInterviewDatetimeStart) return false;
    if (!(scheduleInterviewDatetimeStart >= startTime && scheduleInterviewDatetimeEnd <= endTime)) return false;

    if (selectedDays.length > 0) {
      try {
        const date = parseISO(slotPair[0]);
        const scheduleInterviewDatetimeDay = weekdays[date.getDay()];
        if (!selectedDays.includes(scheduleInterviewDatetimeDay)) return false;
      } catch (err) {
        console.error('Day parsing error:', err);
        return false;
      }
    }
    return true;
  });
};

// 候補日程をマージ
export const mergeScheduleInterviewDatetimes = (sortedScheduleInterviewDatetimes: string[][]): string[][] => {
  const result: string[][] = [];
  if (sortedScheduleInterviewDatetimes.length === 0) return result;

  let current = [...sortedScheduleInterviewDatetimes[0]];
  for (let i = 1; i < sortedScheduleInterviewDatetimes.length; i++) {
    const scheduleInterviewDatetime = sortedScheduleInterviewDatetimes[i];
    const currentEndTime = parseISO(current[1]).getTime();
    const scheduleInterviewDatetimeStartTime = parseISO(scheduleInterviewDatetime[0]).getTime();
    const scheduleInterviewDatetimeEndTime = parseISO(scheduleInterviewDatetime[1]).getTime();

    if (scheduleInterviewDatetimeStartTime <= currentEndTime) {
      if (scheduleInterviewDatetimeEndTime > currentEndTime) {
        current[1] = scheduleInterviewDatetime[1];
      }
    } else {
      result.push(current);
      current = [...scheduleInterviewDatetime];
    }
  }
  result.push(current);
  return result;
};

// クリップボードにコピー
export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .catch((err) => console.error('コピーに失敗しました:', err));
};

// 曜日選択を切り替え
export const handleDayToggle = (
  scheduleInterviewDatetimeDay: string,
  selectedDays: string[],
  setSelectedDays: (value: string[]) => void
) => {
  const newDays = selectedDays.includes(scheduleInterviewDatetimeDay)
    ? selectedDays.filter((day) => day !== scheduleInterviewDatetimeDay)
    : [...selectedDays, scheduleInterviewDatetimeDay];
  setSelectedDays(newDays);
};

// 祝日を除外
export const filterOutHolidays = (slots: string[][]): string[][] => {
  const hd = new Holidays('JP');
  return slots.filter(([start, _end]) => {
    const date = new Date(start);
    return !hd.isHoliday(date);
  });
};

