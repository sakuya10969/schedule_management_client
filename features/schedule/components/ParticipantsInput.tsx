'use client';

import { useLayoutEffect, useState, useEffect } from 'react';

// import { employeeEmailList } from '@/constants';
import MultiSelect from '@/features/schedule/components/MultiSelect';
import { ParticipantsInputProps, Option } from '@/features/schedule/types';
import { getEmployeeDirectory } from '@/features/schedule/api';

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

  useLayoutEffect(() => {
    const expected = employeeEmails.length > 1 ? employeeEmails.length : 1;
    if (requiredParticipants !== expected) {
      setRequiredParticipants(expected);
    }
  }, [employeeEmails, requiredParticipants, setRequiredParticipants]);

  return (
    <div className="md:col-span-2 mt-2 ml-4">
      <label className="block mb-1 font-semibold text-xl text-black">
        担当者
      </label>
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
            className="border p-3 bg-blue-100 text-black cursor-pointer w-[130px]"
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
