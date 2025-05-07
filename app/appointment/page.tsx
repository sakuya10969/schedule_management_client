"use client";

import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

import { ScheduleForm } from "./components/ScheduleForm";
import { ConfirmedSchedule } from "./components/ConfirmedSchedule";

export default function SelectSchedulePage() {
  // 各種 state
  const [candidates, setCandidates] = useState<string[][]>([]);
  const [users, setUsers] = useState<{ email: string }[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minTime, setMinTime] = useState("10:00");
  const [maxTime, setMaxTime] = useState("18:00");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedCandidate, setConfirmedCandidate] = useState<string>("");

  // 新規入力欄用の state
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  // バックエンドAPIのURL
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // URL の token を使ってフォームデータを復元する
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (token) {
      fetch(`${apiUrl}/retrieve_form_data?token=${encodeURIComponent(token)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to retrieve form data");
          }
          return res.json();
        })
        .then((data) => {
          if (data.users) setUsers(data.users);
          if (data.candidates) setCandidates(data.candidates);
          if (data.start_time) setMinTime(data.start_time);
          if (data.end_time) setMaxTime(data.end_time);
          if (data.selected_days) setSelectedDays(data.selected_days);
          if (data.isConfirmed) {
            setIsConfirmed(true);
            if (data.confirmedCandidate) {
              setConfirmedCandidate(data.confirmedCandidate);
            }
          }
        })
        .catch((error) => {
          console.error("Error retrieving form data:", error);
        });
    }
  }, [apiUrl]);

  // 日付・時刻のフォーマット関数
  const formatDatePart = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      const dayMap = ["日", "月", "火", "水", "木", "金", "土"];
      return format(date, "M/d") + `(${dayMap[date.getDay()]})`;
    } catch (err) {
      console.error("Date parsing error:", err);
      return isoString;
    }
  };

  const formatTimePart = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return format(date, "HH:mm");
    } catch (err) {
      console.error("Time parsing error:", err);
      return isoString;
    }
  };

  // 選択された候補をフォーマットする関数
  const formatCandidate = (slotPair: string[]): string => {
    try {
      const startDate = parseISO(slotPair[0]);
      const endDate = parseISO(slotPair[1]);
      const dayMap = ["日", "月", "火", "水", "木", "金", "土"];
      if (format(startDate, "M/d") === format(endDate, "M/d")) {
        const candidateDay = dayMap[startDate.getDay()];
        return `${format(startDate, "M/d")}(${candidateDay}) ${format(
          startDate,
          "HH:mm"
        )} - ${format(endDate, "HH:mm")}`;
      } else {
        return `${format(startDate, "MM/dd HH:mm")} ~ ${format(
          endDate,
          "MM/dd HH:mm"
        )}`;
      }
    } catch (err) {
      console.error("Error formatting candidate:", err);
      return slotPair.join(", ");
    }
  };

  // 候補のフィルタリング処理
  const filteredCandidates = candidates.filter((candidate) => {
    if (candidate.length !== 2) return false;
    if (candidate[0].substring(0, 10) !== candidate[1].substring(0, 10))
      return false;
    const candidateStart = candidate[0].substring(11, 16);
    const candidateEnd = candidate[1].substring(11, 16);
    if (candidateEnd < candidateStart) return false;
    if (!(candidateStart >= minTime && candidateEnd <= maxTime)) return false;
    if (selectedDays.length > 0) {
      try {
        const date = parseISO(candidate[0]);
        const dayMap = ["日", "月", "火", "水", "木", "金", "土"];
        const candidateDay = dayMap[date.getDay()];
        if (!selectedDays.includes(candidateDay)) return false;
      } catch (err) {
        console.error("Day parsing error:", err);
        return false;
      }
    }
    return true;
  });

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    console.log("選択された日程", selectedCandidate);
    if (!selectedCandidate) {
      alert("候補を選択してください。");
      return;
    }

    let formattedCandidate;
    if (selectedCandidate === "none") {
      formattedCandidate = selectedCandidate;
      const isConfirmedSend = window.confirm(
        "「可能な日程がない」として登録を行います。\n\nこちらの内容で間違いないですか？"
      );
      if (!isConfirmedSend) {
        return;
      }
    } else {
      formattedCandidate = formatCandidate(selectedCandidate.split(", "));
      const isConfirmedSend = window.confirm(
        `以下の日程で登録を行います:\n${formattedCandidate}\n\nこちらの内容で間違いないですか？`
      );
      if (!isConfirmedSend) {
        return;
      }
    }
    setIsLoading(true);

    const payload = {
      candidate: selectedCandidate === "none" ? null : selectedCandidate,
      users: users.map((user) => user.email),
      lastname,
      firstname,
      company,
      email,
      token,
    };

    try {
      const response = await fetch(`${apiUrl}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to schedule appointment.");
      }
      const data = await response.json();
      console.log("Response from backend:", data);
      setConfirmedCandidate(formattedCandidate);
      setIsConfirmed(true);
    } catch (error) {
      console.error("日程の確定に失敗しました。:", error);
      alert("日程の確定に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

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
