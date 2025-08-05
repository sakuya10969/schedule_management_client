'use client';

import { useCallback, useMemo, useState } from 'react';
import { parseISO } from 'date-fns';
import { CalendarDays, Copy, Check } from 'lucide-react';

import {
  formatScheduleInterviewDatetime,
  filterScheduleInterviewDatetimes,
  mergeScheduleInterviewDatetimes,
  handleCopy,
} from '@/features/schedule/utils';
import { CandidateListProps } from '@/features/schedule/types';

const CandidateList = ({
  scheduleInterviewDatetimes,
  startTime,
  endTime,
  isLoading,
  selectedDays,
}: CandidateListProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // フィルタリング済み候補を取得
  const filtered = useMemo(
    () => filterScheduleInterviewDatetimes(scheduleInterviewDatetimes, startTime, endTime, selectedDays),
    [scheduleInterviewDatetimes, startTime, endTime, selectedDays]
  );

  // フィルタリング済み候補を開始時刻でソート
  const sortedScheduleInterviewDatetimes = useMemo(() => {
    return [...filtered].sort((a, b) => {
      return parseISO(a[0]).getTime() - parseISO(b[0]).getTime();
    });
  }, [filtered]);

  // 重複または連続している候補をマージ
  const merged = useMemo(
    () => mergeScheduleInterviewDatetimes(sortedScheduleInterviewDatetimes),
    [sortedScheduleInterviewDatetimes]
  );

  // コピー処理
  const handleCopyClick = useCallback(async () => {
    if (merged.length === 0) {
      alert('候補日程がありません。');
      return;
    }
    const text = merged.map((pair) => formatScheduleInterviewDatetime(pair)).join('\n');
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      // 2秒後にアイコンを元に戻す
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('クリップボードコピー失敗:', err);
      // フォールバック処理があれば実行
      handleCopy(text);
    }
  }, [merged]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2 text-black flex items-center gap-2">
        <CalendarDays className="w-6 h-6" />
        候補日程一覧
      </h2>
      <div className="relative bg-blue-100 p-8 rounded min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
            <span className="mt-2 text-gray-500 text-lg">読み込み中...</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleCopyClick}
              className={`absolute top-2 right-2 text-sm px-2 py-1 rounded shadow hover:bg-gray-50 text-black inline-flex items-center gap-1 transition-colors ${
                isCopied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-white'
              }`}
            >
              {isCopied ? (
                <>
                  <Check size={14} />
                  <span>コピー完了</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>候補日程のコピー</span>
                </>
              )}
            </button>
            {merged.length > 0 ? (
              <ul className="list-inside space-y-1 text-black">
                {merged.map((slotPair, index) => (
                  <li key={index}>{formatScheduleInterviewDatetime(slotPair)}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black">候補日程がありません。</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
