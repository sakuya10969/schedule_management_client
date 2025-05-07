const weekdays = ['月', '火', '水', '木', '金', '土', '日'];

interface WeekdaySelectorProps {
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
}

const WeekdaySelector = ({ selectedDays, setSelectedDays }: WeekdaySelectorProps) => {
  const handleDayToggle = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newDays);
  };

  return (
    <div className="p-4 rounded-lg">
      <label className="block mb-1 font-bold text-xl text-black">曜日選択</label>
      <div className="flex flex-wrap gap-4">
        {weekdays.map((day) => (
          <label key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayToggle(day)}
              className="w-5 h-6 cursor-pointer"
            />
            <span className="text-xl font-medium text-black">{day}</span>
          </label>
        ))}
        <button
          type="button"
          onClick={() => setSelectedDays([])}
          className="bg-blue-300 hover:bg-blue-400 text-sm text-black py-1 px-2 rounded"
        >
          曜日選択をリセット
        </button>
      </div>
    </div>
  );
};

export default WeekdaySelector;
