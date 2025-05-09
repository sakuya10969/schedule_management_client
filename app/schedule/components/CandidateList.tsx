"use client";
import { useCallback, useMemo } from "react";
import { formatCandidate, filterCandidates, mergeCandidates, handleCopy } from "@/features/schedule/utils";

interface CandidateListProps {
  candidates: string[][];
  minTime: string;
  maxTime: string;
  isLoading: boolean;
  selectedDays: string[];
}

const CandidateList = ({
  candidates,
  minTime,
  maxTime,
  isLoading,
  selectedDays,
}: CandidateListProps) => {
  // フィルタリング済み候補を取得
  const filtered = useMemo(() => filterCandidates(candidates, minTime, maxTime, selectedDays), [
    candidates,
    minTime,
    maxTime,
    selectedDays,
  ]);

  // フィルタリング済み候補を開始時刻でソート
  const sortedCandidates = useMemo(() => {
    return [...filtered].sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });
  }, [filtered]);

  // 重複または連続している候補をマージ
  const merged = useMemo(() => mergeCandidates(sortedCandidates), [sortedCandidates]);

  // コピー処理
  const handleCopyClick = useCallback(() => {
    if (merged.length === 0) return;
    const text = merged.map((pair) => formatCandidate(pair)).join("\n");
    handleCopy(text);
  }, [merged]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2 text-black">候補日一覧</h2>
      <div className="relative bg-blue-100 p-8 rounded min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
            <span className="mt-2 text-gray-500 text-lg">Loading...</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleCopyClick}
              className="absolute top-2 right-2 bg-white text-sm px-2 py-1 rounded shadow hover:bg-gray-50 text-black"
            >
              copy
            </button>
            {merged.length > 0 ? (
              <ul className="list-inside space-y-1 text-black">
                {merged.map((slotPair, index) => (
                  <li key={index}>{formatCandidate(slotPair)}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black">候補がありません。</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
