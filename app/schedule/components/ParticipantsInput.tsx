'use client';

import { useLayoutEffect, useState, useEffect } from 'react';
import { UserRoundX } from 'lucide-react';

import MultiSelect from '@/app/schedule/components/MultiSelect';
import { ParticipantsInputProps, Option } from '@/features/schedule/types';
import { getEmployeeDirectory } from '@/features/schedule/api';
import { Button } from '@/components/ui';

const ParticipantsInput = ({
  employeeEmails,
  setEmployeeEmails,
  requiredParticipants,
  setRequiredParticipants,
}: ParticipantsInputProps) => {
  const [employeeEmailList, setEmployeeEmailList] = useState<Option[]>([]);

  useEffect(() => {
    const fetchEmployeeDirectory = async () => {
      try {
        const data = await getEmployeeDirectory();
        setEmployeeEmailList(data);
      } catch (error) {
        console.error('Failed to fetch employee directory:', error);
      }
    };

    fetchEmployeeDirectory();
  }, []);

  const handleMultiSelectChange = (selectedEmails: string[]) => {
    const filtered = selectedEmails.filter((email) => email.trim() !== '');
    const updatedEmployeeEmails = filtered.map((email) => ({ email }));
    setEmployeeEmails(updatedEmployeeEmails);
  };

  const handleClearAll = () => {
    setEmployeeEmails([]);
  };

  useLayoutEffect(() => {
    const expected = employeeEmails.length > 1 ? employeeEmails.length : 1;
    if (requiredParticipants !== expected) {
      setRequiredParticipants(expected);
    }
  }, [employeeEmails, requiredParticipants, setRequiredParticipants]);

  return (
    <div className="md:col-span-2 mt-2">
      <div className="flex justify-between items-center mb-1">
        <label className="block font-semibold text-xl text-black">
          担当者
        </label>
        <Button
          type="button"
          onClick={handleClearAll}
          className="bg-blue-100 hover:bg-blue-200 text-md text-black p-3 rounded inline-flex items-center gap-2"
        >
          <UserRoundX size={20} />
          担当者を全て解除
        </Button>
      </div>
      <div className="mb-4">
        <MultiSelect
          options={employeeEmailList}
          selectedValues={employeeEmails.map((employeeEmail) => employeeEmail.email)}
          onChange={handleMultiSelectChange}
          placeholder="担当者を選択"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select
            value={requiredParticipants}
            onChange={(e) => setRequiredParticipants(Number(e.target.value))}
            className="border p-3 bg-blue-100 text-black rounded cursor-pointer w-[130px]"
          >
            <option value={employeeEmails.length}>全員</option>
            {Array.from({ length: employeeEmails.length - 1 }, (_, i) => i + 1).map(
              (num) => (
                <option key={num} value={num}>
                  いずれか{num}名
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsInput;
