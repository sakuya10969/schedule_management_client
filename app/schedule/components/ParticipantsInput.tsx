interface User {
    email: string;
  }
  
  interface ParticipantsInputProps {
    users: User[];
    handleAddUser: () => void;
    handleRemoveUser: (index: number) => void;
    handleChangeUserEmail: (index: number, value: string) => void;
    requiredParticipants: number;
    setRequiredParticipants: (value: number) => void;
  }
  
  const ParticipantsInput = ({
    users,
    handleAddUser,
    handleRemoveUser,
    handleChangeUserEmail,
    requiredParticipants,
    setRequiredParticipants,
  }: ParticipantsInputProps) => {
    return (
      <div className="md:col-span-2 mt-2 ml-4">
        <label className="block mb-1 font-semibold text-xl text-black">担当者</label>
        {users.map((user, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleChangeUserEmail(index, e.target.value)}
              className="border p-2 mr-2 flex-1 text-black"
              placeholder="email@example.com"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveUser(index)}
                className="bg-red-500 text-white px-2 py-1 rounded transition-all duration-200 active:scale-95"
              >
                削除
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAddUser}
            className="bg-blue-300 hover:bg-blue-400 text-xl text-black py-3 px-4 rounded whitespace-nowrap"
          >
            担当者を追加
          </button>
          <div className="flex items-center gap-2">
            <select
              value={requiredParticipants}
              onChange={(e) => setRequiredParticipants(Number(e.target.value))}
              className="border p-3 bg-blue-100 text-black cursor-pointer"
            >
              <option value={users.length}>全員</option>
              {Array.from({ length: users.length - 1 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  いずれか{num}名
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  export default ParticipantsInput;
  