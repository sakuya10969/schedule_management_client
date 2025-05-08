import { useState, useEffect } from 'react';

import { fetchFormData, submitSchedule } from '@/features/appointment/api';
import {
  formatCandidate,
  filterCandidates,
} from '@/features/appointment/utils';
import { UseScheduleFormProps } from '@/features/appointment/type';

export const useScheduleForm = ({ apiUrl }: UseScheduleFormProps) => {
  const [candidates, setCandidates] = useState<string[][]>([]);
  const [users, setUsers] = useState<{ email: string }[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minTime, setMinTime] = useState('10:00');
  const [maxTime, setMaxTime] = useState('18:00');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedCandidate, setConfirmedCandidate] = useState<string>('');

  // 新規入力欄用の state
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    if (token) {
      (async () => {
        try {
          const data = await fetchFormData(apiUrl, token);
          if (data.users) setUsers(data.users);
          if (data.candidates) setCandidates(data.candidates);
          if (data.start_time) setMinTime(data.start_time);
          if (data.end_time) setMaxTime(data.end_time);
          if (data.selected_days) setSelectedDays(data.selected_days);
          if (data.isConfirmed) {
            setIsConfirmed(true);
            setConfirmedCandidate(data.confirmedCandidate || '');
          }
        } catch (error) {
          alert('データの取得に失敗しました。');
        }
      })();
    }
  }, [apiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (!selectedCandidate) {
      alert('候補を選択してください。');
      return;
    }

    const formattedCandidate =
      selectedCandidate === 'none'
        ? 'なし'
        : formatCandidate(selectedCandidate.split(', '));

    if (
      !window.confirm(
        `以下の日程で登録を行います:\n${formattedCandidate}\n\nこちらの内容で間違いないですか？`
      )
    ) {
      return;
    }

    setIsLoading(true);

    const payload = {
      candidate: selectedCandidate === 'none' ? null : selectedCandidate,
      users: users.map((user) => user.email),
      lastname,
      firstname,
      company,
      email,
      token,
    };

    try {
      await submitSchedule(apiUrl, payload);
      setConfirmedCandidate(formattedCandidate);
      setIsConfirmed(true);
    } catch (error) {
      alert('日程の確定に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCandidates = filterCandidates(
    candidates,
    minTime,
    maxTime,
    selectedDays
  );

  return {
    candidates,
    users,
    selectedCandidate,
    selectedDays,
    isLoading,
    minTime,
    maxTime,
    isConfirmed,
    confirmedCandidate,
    lastname,
    firstname,
    company,
    email,
    filteredCandidates,
    setSelectedCandidate,
    setSelectedDays,
    setMinTime,
    setMaxTime,
    setLastName,
    setFirstName,
    setCompany,
    setEmail,
    handleSubmit,
  };
};
