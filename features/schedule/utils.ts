import { parseISO, format } from 'date-fns';

import { weekdays } from '@/constants';

// 候補日程のフォーマット
export const formatCandidate = (slotPair: string[]): string => {
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
export const filteredCandidates = (
  candidates: string[][],
  minTime: string,
  maxTime: string,
  selectedDays: string[]
): string[][] => {
  return candidates.filter((slotPair) => {
    if (slotPair.length !== 2) return false;

    if (slotPair[0].substring(0, 10) !== slotPair[1].substring(0, 10))
      return false;

    const candidateStart = slotPair[0].substring(11, 16);
    const candidateEnd = slotPair[1].substring(11, 16);
    if (candidateEnd < candidateStart) return false;
    if (!(candidateStart >= minTime && candidateEnd <= maxTime)) return false;

    if (selectedDays.length > 0) {
      try {
        const date = parseISO(slotPair[0]);
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

// 候補日程をマージ
export const mergedCandidates = (sortedCandidates: string[][]): string[][] => {
  const result: string[][] = [];
  if (sortedCandidates.length === 0) return result;

  let current = [...sortedCandidates[0]];
  for (let i = 1; i < sortedCandidates.length; i++) {
    const candidate = sortedCandidates[i];
    const currentEndTime = parseISO(current[1]).getTime();
    const candidateStartTime = parseISO(candidate[0]).getTime();
    const candidateEndTime = parseISO(candidate[1]).getTime();

    if (candidateStartTime <= currentEndTime) {
      if (candidateEndTime > currentEndTime) {
        current[1] = candidate[1];
      }
    } else {
      result.push(current);
      current = [...candidate];
    }
  }
  result.push(current);
  return result;
};

// クリップボードにコピー
export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => alert('候補日程をコピーしました!'))
    .catch((err) => console.error('コピーに失敗しました:', err));
};

// 曜日選択を切り替え
export const handleDayToggle = (
  day: string,
  selectedDays: string[],
  setSelectedDays: (value: string[]) => void
) => {
  const newDays = selectedDays.includes(day)
    ? selectedDays.filter((d) => d !== day)
    : [...selectedDays, day];
  setSelectedDays(newDays);
};
