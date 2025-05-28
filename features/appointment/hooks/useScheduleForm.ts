'use client';

import { useState, useEffect } from 'react';

import { fetchFormData, submitSchedule } from '@/features/appointment/api';
import {
  formatScheduleInterviewDatetime,
  filterScheduleInterviewDatetimes,
} from '@/features/appointment/utils';

export const useScheduleForm = () => {
  const [scheduleInterviewDatetimes, setScheduleInterviewDatetimes] = useState<string[][]>([]);
  const [employeeEmail, setEmployeeEmail] = useState<string>('');
  const [selectedScheduleInterviewDatetime, setSelectedScheduleInterviewDatetime] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState('9:00');
  const [endTime, setEndTime] = useState('18:00');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedScheduleInterviewDatetime, setConfirmedScheduleInterviewDatetime] = useState<string>('');

  // 新規入力欄用の state
  const [candidateLastname, setCandidateLastName] = useState('');
  const [candidateFirstname, setCandidateFirstName] = useState('');
  const [company, setCompany] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cosmosDbId = searchParams.get('cosmosDbId');
    if (!cosmosDbId) return;

    const fetchData = async () => {
      try {
        const data = await fetchFormData(cosmosDbId);
        if (data.employee_emails) setEmployeeEmail(data.employee_emails[0].email);
        if (data.schedule_interview_datetimes) setScheduleInterviewDatetimes(data.schedule_interview_datetimes);
        if (data.start_time) setStartTime(data.start_time);
        if (data.end_time) setEndTime(data.end_time);
        if (data.selected_days) setSelectedDays(data.selected_days);
        if (data.is_confirmed) {
          setIsConfirmed(true);
          setConfirmedScheduleInterviewDatetime(data.confirmedCandidate || '');
        }
      } catch (error) {
        alert('データの取得に失敗しました。');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const cosmosDbId = searchParams?.get('cosmosDbId');
    const candidateId = searchParams?.get('candidateId');
    const interviewStage = searchParams?.get('interviewStage');

    if (!selectedScheduleInterviewDatetime) {
      alert('候補を選択してください。');
      return;
    }

    const formattedCandidate =
      selectedScheduleInterviewDatetime === 'none'
        ? 'なし'
        : formatScheduleInterviewDatetime(selectedScheduleInterviewDatetime.split(', '));

    if (
      !window.confirm(
        `以下の日程で登録を行います:\n${formattedCandidate}\n\nこちらの内容で間違いないですか？`
      )
    ) {
      return;
    }

    setIsLoading(true);

    const payload = {
      schedule_interview_datetime: selectedScheduleInterviewDatetime === 'none' ? null : selectedScheduleInterviewDatetime,
      employee_email: employeeEmail,
      candidate_lastname: candidateLastname,
      candidate_firstname: candidateFirstname,
      company,
      candidate_email: candidateEmail,
      cosmos_db_id: cosmosDbId,
      candidate_id: candidateId ? Number(candidateId) : null,
      interview_stage: interviewStage,
    };

    try {
      await submitSchedule(payload);
      setConfirmedScheduleInterviewDatetime(formattedCandidate);
      setIsConfirmed(true);
    } catch (error) {
      alert('日程の確定に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredScheduleInterviewDatetimes = filterScheduleInterviewDatetimes(
    scheduleInterviewDatetimes,
    startTime,
    endTime,
    selectedDays
  );

  return {
    scheduleInterviewDatetimes,
    employeeEmail,
    selectedScheduleInterviewDatetime,
    selectedDays,
    isLoading,
    startTime,
    endTime,
    isConfirmed,
    confirmedScheduleInterviewDatetime,
    candidateLastname,
    candidateFirstname,
    company,
    candidateEmail,
    filteredScheduleInterviewDatetimes,
    setSelectedScheduleInterviewDatetime,
    setSelectedDays,
    setStartTime,
    setEndTime,
    setCandidateLastName,
    setCandidateFirstName,
    setCompany,
    setCandidateEmail,
    handleSubmit,
  };
};
