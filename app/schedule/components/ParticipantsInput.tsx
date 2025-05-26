import { employeeEmails } from '@/constants';
import MultiSelect from '@/app/schedule/components/MultiSelect';
import { ParticipantsInputProps } from '@/features/schedule/types';

const ParticipantsInput = ({
  users,
  setUsers,
  requiredParticipants,
  setRequiredParticipants,
}: ParticipantsInputProps) => {
  const handleMultiSelectChange = (selectedEmails: string[]) => {
    const filtered = selectedEmails.filter((email) => email.trim() !== '');
    const updatedUsers = filtered.map((email) => ({ email }));
    setUsers(updatedUsers);

    if (requiredParticipants > updatedUsers.length) {
      setRequiredParticipants(updatedUsers.length);
    }
  };

  return (
    <div className="md:col-span-2 mt-2 ml-4">
      <label className="block mb-1 font-semibold text-xl text-black">
        担当者
      </label>
      <div className="mb-4">
        <MultiSelect
          options={employeeEmails}
          selectedValues={users.map((user) => user.email)}
          onChange={handleMultiSelectChange}
          placeholder="担当者を選択"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select
            value={requiredParticipants}
            onChange={(e) => setRequiredParticipants(Number(e.target.value))}
            className="border p-3 bg-blue-100 text-black cursor-pointer"
          >
            <option value={users.length}>全員</option>
            {Array.from({ length: users.length - 1 }, (_, i) => i + 1).map(
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
