'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReschedulePage() {
  const [showLink, setShowLink] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const cosmosDbId = searchParams.get('cosmosDbId');

  const handleCancel = () => {
    setShowLink(true);
  };

  const handleReschedule = () => {
    if (cosmosDbId) {
      router.push(`/appointment?cosmosDbId=${cosmosDbId}`);
    } else {
      alert('cosmosDbId が見つかりませんでした');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">日程の変更</h1>

      <p className="text-gray-700 mb-8 text-center">
        既に確定した日程をキャンセルし、再度選び直すことができます。
      </p>

      <div className="text-center">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          予定をキャンセルする
        </button>
      </div>

      {showLink && (
        <div className="mt-10 text-center">
          <p className="text-gray-700 mb-4">
            再度日程を選択するには、以下のリンクをクリックしてください。
          </p>
          <button
            onClick={handleReschedule}
            className="text-blue-600 hover:underline font-medium"
          >
            👉日程を再選択する
          </button>
        </div>
      )}
    </div>
  );
}
