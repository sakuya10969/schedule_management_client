import { parseISO, format, isAfter, isValid, isEqual } from 'date-fns';

import { weekdays } from '@/constants';

export const formatDatePart = (isoString: string) => {
  try {
    const date = parseISO(isoString);
    return format(date, 'M/d') + `(${weekdays[date.getDay()]})`;
  } catch (err) {
    console.error('Date parsing error:', err);
    return isoString;
  }
};

export const formatTimePart = (isoString: string) => {
  try {
    const date = parseISO(isoString);
    return format(date, 'HH:mm');
  } catch (err) {
    console.error('Time parsing error:', err);
    return isoString;
  }
};

export const formatScheduleInterviewDatetime = (slotPair: string[]): string => {
  try {
    const startDate = parseISO(slotPair[0]);
    const endDate = parseISO(slotPair[1]);
    if (format(startDate, 'M/d') === format(endDate, 'M/d')) {
      const candidateDay = weekdays[startDate.getDay()];
      return `${format(startDate, 'M/d')}(${candidateDay}) ${format(
        startDate,
        'HH:mm'
      )}～${format(endDate, 'HH:mm')}`;
    } else {
      return `${format(startDate, 'MM/dd HH:mm')} ~ ${format(
        endDate,
        'MM/dd HH:mm'
      )}`;
    }
  } catch (err) {
    console.error('Error formatting candidate:', err);
    return slotPair.join(', ');
  }
};

export const filterScheduleInterviewDatetimes = (
  scheduleInterviewDatetimes: string[][],
  startTime: string,
  endTime: string,
  selectedDays: string[]
): string[][] => {
  return scheduleInterviewDatetimes.filter((scheduleInterviewDatetime) => {
    if (scheduleInterviewDatetime.length !== 2) return false;

    let start: Date, end: Date;
    try {
      start = parseISO(scheduleInterviewDatetime[0]);
      end = parseISO(scheduleInterviewDatetime[1]);
    } catch (err) {
      console.error('Datetime parsing error:', err);
      return false;
    }

    if (format(start, 'yyyy-MM-dd') !== format(end, 'yyyy-MM-dd')) return false;
    if (end < start) return false;

    const startTimeStr = format(start, 'HH:mm');
    const endTimeStr = format(end, 'HH:mm');

    if (!(startTimeStr >= startTime && endTimeStr <= endTime)) return false;

    if (selectedDays.length > 0) {
      const day = weekdays[start.getDay()];
      if (!selectedDays.includes(day)) return false;
    }

    return true;
  });
};

export const filterFutureSchedules = (
  scheduleInterviewDatetimes: string[][]
): string[][] => {
  const now = new Date();

  return scheduleInterviewDatetimes.filter((datetimePair) => {
    if (datetimePair.length !== 2) return false;

    try {
      const start = parseISO(datetimePair[0]);
      return isAfter(start, now);
    } catch (err) {
      console.error('Datetime parsing error:', err);
      return false;
    }
  });
};

export const parseScheduleDatetimeString = (datetimeStr: string): [string, string] | null => {
  const parts = datetimeStr.split(',').map(s => s.trim());
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
};

export const parseScheduleDatetime = (
  datetimeStr: string
): [Date, Date] | null => {
  const strParts = parseScheduleDatetimeString(datetimeStr);
  if (!strParts) return null;

  const [startStr, endStr] = strParts;
  const start = parseISO(startStr);
  const end = parseISO(endStr);

  if (!isValid(start) || !isValid(end)) {
    console.error('Invalid datetime:', startStr, endStr);
    return null;
  }

  return [start, end];
};

export const excludeCurrentScheduleDatetime = (
  candidates: string[][],
  current: [string, string] | null
): string[][] => {
  if (!current) return candidates;

  const [currentStart, currentEnd] = current.map(d => parseISO(d));

  return candidates.filter(([startStr, endStr]) => {
    const start = parseISO(startStr);
    const end = parseISO(endStr);

    return !(isEqual(start, currentStart) && isEqual(end, currentEnd));
  });
};
