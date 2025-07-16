'use client';

import { ScheduleForm } from '@/app/appointment/components/ScheduleForm';
import { ConfirmedSchedule } from '@/app/appointment/components/ConfirmedSchedule';
import { useScheduleForm } from '@/features/appointment/hooks/useScheduleForm';

export default function SelectSchedulePage() {
  const {
    candidateLastname,
    candidateFirstname,
    company,
    candidateEmail,
    selectedScheduleInterviewDatetime,
    isLoading,
    filteredScheduleInterviewDatetimes,
    isConfirmed,
    confirmedScheduleInterviewDatetime,
    setCandidateLastName,
    setCandidateFirstName,
    setCompany,
    setCandidateEmail,
    setSelectedScheduleInterviewDatetime,
    handleSubmit,
  } = useScheduleForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              日程選択
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              以下の候補から希望する日程を選択してください。
            </p>
          </div>
          {isConfirmed ? (
            <ConfirmedSchedule confirmedScheduleInterviewDatetime={confirmedScheduleInterviewDatetime} />
          ) : (
            <ScheduleForm
              candidateLastname={candidateLastname}
              candidateFirstname={candidateFirstname}
              company={company}
              candidateEmail={candidateEmail}
              selectedScheduleInterviewDatetime={selectedScheduleInterviewDatetime}
              isLoading={isLoading}
              filteredScheduleInterviewDatetimes={filteredScheduleInterviewDatetimes}
              onCandidateLastNameChange={setCandidateLastName}
              onCandidateFirstNameChange={setCandidateFirstName}
              onCompanyChange={setCompany}
              onCandidateEmailChange={setCandidateEmail}
              onSelectScheduleInterviewDatetime={setSelectedScheduleInterviewDatetime}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
