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

export const formatCandidate = (slotPair: string[]): string => {
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

export const filterCandidates = (
  candidates: string[][],
  startTime: string,
  endTime: string,
  selectedDays: string[]
) => {
  return candidates.filter((candidate) => {
    if (candidate.length !== 2) return false;
    if (candidate[0].substring(0, 10) !== candidate[1].substring(0, 10))
      return false;
    const candidateStart = candidate[0].substring(11, 16);
    const candidateEnd = candidate[1].substring(11, 16);
    if (candidateEnd < candidateStart) return false;
    if (!(candidateStart >= startTime && candidateEnd <= endTime)) return false;
    if (selectedDays.length > 0) {
      try {
        const date = parseISO(candidate[0]);
        const candidateDay = weekdays[date.getDay()];
        if (!selectedDays.includes(candidateDay)) return false;
      } catch (err) {
        console.error('Day parsing error:', err);
        return false;
      }
    }
    return true;
  });
};
