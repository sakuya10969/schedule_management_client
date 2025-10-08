import { generateTimeOptions } from '@/features/schedule/utils';
import { TimeRangePickerProps } from '@/features/schedule/types';

export const TimeRangePicker = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: TimeRangePickerProps) => {
  return (
    <div className="flex items-end space-x-2 mt-2 rounded w-full">
      <div className="flex-1">
        <label className="block mb-1 font-semibold text-xl text-black">
          時間帯
        </label>
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-3 bg-blue-100 w-full text-black rounded cursor-pointer"
          required
        >
          {generateTimeOptions().map((timeStr) => (
            <option key={timeStr} value={timeStr} className="cursor-pointer">
              {timeStr}
            </option>
          ))}
        </select>
      </div>
      <span className="pb-3 text-black">~</span>
      <div className="flex-1">
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-3 bg-blue-100 w-full text-black rounded cursor-pointer"
          required
        >
          {generateTimeOptions().map((timeStr) => (
            <option key={timeStr} value={timeStr} className="cursor-pointer">
              {timeStr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
