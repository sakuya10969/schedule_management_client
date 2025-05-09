"use client";

import { ScheduleForm } from "@/app/appointment/components/ScheduleForm";
import { ConfirmedSchedule } from "@/app/appointment/components/ConfirmedSchedule";
import { useScheduleForm } from "@/features/appointment/hooks/useScheduleForm";
import { formatDatePart, formatTimePart } from "@/features/appointment/utils";

export default function SelectSchedulePage() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const {
    lastname,
    firstname,
    company,
    email,
    selectedCandidate,
    isLoading,
    filteredCandidates,
    isConfirmed,
    confirmedCandidate,
    setLastName,
    setFirstName,
    setCompany,
    setEmail,
    setSelectedCandidate,
    handleSubmit,
  } = useScheduleForm({ apiUrl });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">日程選択</h1>
            <p className="mt-2 text-gray-600 text-lg">
              以下の候補から希望する日程を選択してください。
            </p>
          </div>
          {isConfirmed ? (
            <ConfirmedSchedule confirmedCandidate={confirmedCandidate} />
          ) : (
            <ScheduleForm
              lastname={lastname}
              firstname={firstname}
              company={company}
              email={email}
              selectedCandidate={selectedCandidate}
              isLoading={isLoading}
              filteredCandidates={filteredCandidates}
              onLastNameChange={setLastName}
              onFirstNameChange={setFirstName}
              onCompanyChange={setCompany}
              onEmailChange={setEmail}
              onSelectCandidate={setSelectedCandidate}
              onSubmit={handleSubmit}
              formatDatePart={formatDatePart}
              formatTimePart={formatTimePart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
