'use client';

import { useState } from 'react';
import Link from 'next/link';

import CandidateList from '@/features/schedule/components/CandidateList';
import ScheduleForm from '@/features/schedule/components/ScheduleForm';
import { useSchedule } from '@/features/schedule/hooks/useSchedule';
import { useUsers } from '@/features/schedule/hooks/useUsers';
import { getAvailability, storeFormData } from '@/features/schedule/api';

export default function SchedulePage() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    durationMinutes,
    setDurationMinutes,
    selectedDays,
    setSelectedDays,
    requiredParticipants,
    setRequiredParticipants,
  } = useSchedule();

  const {
    users,
    handleAddUser,
    handleRemoveUser,
    handleChangeUserEmail,
    getValidUsers,
  } = useUsers();

  const isConfirmed = false;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<string[][]>([]);

  // スケジュール取得リクエスト送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validUsers = getValidUsers();
    if (!validUsers.length) {
      alert('参加者がありません。');
      return;
    }

    setIsLoading(true);
    try {
      const data = await getAvailability({
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        selected_days: selectedDays,
        duration_minutes: durationMinutes,
        users: validUsers,
        required_participants: requiredParticipants,
      });
      setCandidates(data.common_availability || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //「日程調整画面を表示」ボタン押下時の処理
  const handleCreateForm = async () => {
    if (candidates.length === 0) {
      alert('候補がありません。候補を取得してください。');
      return;
    }
    const token = await storeFormData({
      isConfirmed,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      selected_days: selectedDays,
      duration_minutes: durationMinutes,
      users,
      candidates,
    });
    if (!token) {
      alert('フォームの作成に失敗しました。再度お試しください。');
      return;
    }
    const url = `/appointment?token=${encodeURIComponent(token)}`;
    window.open(url, 'SelectScheduleForm', 'width=600,height=800');
  };

  // 「リンクを共有」ボタン押下時の処理（メール送信用）
  const handleShareForm = async () => {
    if (candidates.length === 0) {
      alert('候補がありません。フォームを作成してください。');
      return;
    }
    const token = await storeFormData({
      isConfirmed,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      selected_days: selectedDays,
      duration_minutes: durationMinutes,
      users,
      candidates,
    });
    if (!token) {
      alert('フォームの共有に失敗しました。再度お試しください。');
      return;
    }
    const shareUrl =
      window.location.origin +
      `/appointment?token=${encodeURIComponent(token)}`;

    const subject = '【日程調整のお願い】インテリジェントフォース/採用担当';
    const body = `＜ここにメール相手の性を入力＞様

                  インテリジェントフォース採用担当です。

                  以下URLよりご都合の良い時間帯を登録いただけますでしょうか。

                  ▼面接日程調整URL
                  ${shareUrl}

                  ご不明点やご質問がございましたら、お気軽にご連絡くださいませ。
                  お手数をおかけいたしますが、何卒よろしくお願い申し上げます。

                  `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="text-right mb-5">
        <Link
          href="/"
          className="inline-block bg-gray-500 text-white px-4 py-2 rounded"
        >
          ホームページへ
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左カラム */}
        <div>
          {/* スケジュール設定フォーム */}
          <ScheduleForm
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
            users={users}
            handleAddUser={handleAddUser}
            handleRemoveUser={handleRemoveUser}
            handleChangeUserEmail={handleChangeUserEmail}
            handleSubmit={handleSubmit}
            requiredParticipants={requiredParticipants}
            setRequiredParticipants={setRequiredParticipants}
          />
        </div>
        {/* 右カラム */}
        <div>
          {/* 候補日一覧の表示 */}
          <CandidateList
            candidates={candidates}
            minTime={startTime}
            maxTime={endTime}
            isLoading={isLoading}
            selectedDays={selectedDays}
          />
          {/* フォーム作成ボタン */}
          <button
            onClick={handleCreateForm}
            className="mt-4 mr-4 inline-block bg-gray-500 text-white px-4 py-2 rounded"
          >
            日程調整画面を表示
          </button>
          {/* フォーム共有ボタン */}
          <button
            onClick={handleShareForm}
            className="inline-block bg-gray-500 text-white px-4 py-2 rounded"
          >
            リンクを共有
          </button>
        </div>
      </div>
    </div>
  );
}
