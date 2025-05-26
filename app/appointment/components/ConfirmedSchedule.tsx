import React from 'react';

import { ConfirmedScheduleProps } from '@/features/appointment/types';

export const ConfirmedSchedule = ({
  confirmedCandidate,
}: ConfirmedScheduleProps) => {
  return (
    <>
      <div className="p-8 bg-gray-200 rounded-lg text-center mb-4">
        <p className="text-xl font-semibold text-gray-800">確定した日程</p>
        <p className="text-lg text-gray-700">
          {confirmedCandidate === 'none'
            ? '確定した日程はありません。\n再度担当者から連絡します。'
            : confirmedCandidate
              ? confirmedCandidate
              : '日程の詳細が取得できませんでした。'}
        </p>
      </div>
      <div className="p-8 bg-gray-100 rounded-lg text-center">
        <p className="text-xl font-semibold text-gray-700">
          このフォームは既に使用済みです。
        </p>
      </div>
    </>
  );
};
