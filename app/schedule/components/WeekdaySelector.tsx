import { weekdays } from '@/constants';
import { handleDayToggle } from '@/features/schedule/utils';
import { WeekdaySelectorProps } from '@/features/schedule/types';
import { Button, Checkbox } from '@/components/ui';

const WeekdaySelector = ({
  selectedDays,
  setSelectedDays,
}: WeekdaySelectorProps) => {
  return (
    <div className="rounded-lg mt-2">
      <label className="block mb-1 font-bold text-xl text-black">
        曜日選択
      </label>
      <div className="flex flex-wrap gap-4">
        {weekdays.map((day) => (
          <div key={day} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedDays.includes(day)}
              onCheckedChange={() =>
                handleDayToggle(day, selectedDays, setSelectedDays)
              }
              className="w-5 h-6 cursor-pointer"
            />
            <span className="text-xl font-medium text-black">{day}</span>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => setSelectedDays([])}
          className="bg-blue-100 hover:bg-blue-200 text-md text-black p-3 rounded"
        >
          曜日選択をリセット
        </Button>
      </div>
    </div>
  );
};

export default WeekdaySelector;
