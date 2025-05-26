import { weekdays } from '@/constants';
import { handleDayToggle } from '@/features/schedule/utils';
import { WeekdaySelectorProps } from '@/features/schedule/types';

const WeekdaySelector = ({
  selectedDays,
  setSelectedDays,
}: WeekdaySelectorProps) => {
  return (
    <div className="p-4 rounded-lg">
      <label className="block mb-1 font-bold text-xl text-black">
        曜日選択
      </label>
      <div className="flex flex-wrap gap-4">
        {weekdays.map((day) => (
          <label key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() =>
                handleDayToggle(day, selectedDays, setSelectedDays)
              }
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
