import { parseISO, format } from 'date-fns';

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
      )} - ${format(endDate, 'HH:mm')}`;
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
) => {
  return scheduleInterviewDatetimes.filter((scheduleInterviewDatetime) => {
    if (scheduleInterviewDatetime.length !== 2) return false;
    if (scheduleInterviewDatetime[0].substring(0, 10) !== scheduleInterviewDatetime[1].substring(0, 10))
      return false;
    const scheduleInterviewDatetimeStart = scheduleInterviewDatetime[0].substring(11, 16);
    const scheduleInterviewDatetimeEnd = scheduleInterviewDatetime[1].substring(11, 16);
    if (scheduleInterviewDatetimeEnd < scheduleInterviewDatetimeStart) return false;
    if (!(scheduleInterviewDatetimeStart >= startTime && scheduleInterviewDatetimeEnd <= endTime)) return false;
    if (selectedDays.length > 0) {
      try {
        const date = parseISO(scheduleInterviewDatetime[0]);
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
