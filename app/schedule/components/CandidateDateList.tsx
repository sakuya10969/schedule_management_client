'use client';

import { useCallback, useMemo, useState } from 'react';
import { parseISO } from 'date-fns';
import { CalendarDays, Copy, Check, ExternalLink } from 'lucide-react';

import {
  formatScheduleInterviewDatetime,
  filterScheduleInterviewDatetimes,
  mergeScheduleInterviewDatetimes,
  handleCopy,
} from '@/features/schedule/utils';
import { CandidateDateListProps } from '@/features/schedule/types';
import { Button } from '@/components/ui';
import { Card, CardContent } from '@/components/ui';

const recruitment_url = process.env.NEXT_PUBLIC_RECRUITMENT_URL ?? "/schedule";

export const CandidateDateList = ({
  scheduleInterviewDatetimes,
  startTime,
  endTime,
  isLoading,
  selectedDays,
}: CandidateDateListProps) => {
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
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-black flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          候補日程一覧
        </h2>
        <Button asChild className="text-md mb-2">
          <a
            href={recruitment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-500 hover:bg-gray-600 text-white p-3 rounded"
          >
            <ExternalLink size={20} />
            採用管理ページへ
          </a>
        </Button>
      </div>
      <Card>
        <CardContent className="relative bg-blue-100 p-6 h-[450px] overflow-y-auto rounded-xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[450px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
              <span className="mt-2 text-gray-500 text-lg">読み込み中...</span>
            </div>
          ) : (
            <>
              <button
                onClick={handleCopyClick}
                className={`absolute top-3 right-3 text-md px-3 py-2 rounded shadow hover:bg-gray-100 text-black inline-flex items-center gap-1 transition-colors ${
                  isCopied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check size={16} />
                    <span>コピー完了</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>候補日程のコピー</span>
                  </>
                )}
              </button>
              {merged.length > 0 ? (
                <ul className="list-inside text-lg text-black">
                  {merged.map((slotPair, index) => (
                    <li key={index}>{formatScheduleInterviewDatetime(slotPair)}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black">候補日程がありません。</p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
