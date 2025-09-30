import { DateRangePickerProps } from '@/features/schedule/types';

export const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangePickerProps) => {
  return (
    <div className="flex items-end space-x-2 rounded w-full">
      <div className="flex-1">
        <label className="block mb-2 font-semibold text-xl text-black">
          調整期間
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-3 w-full bg-blue-100 text-black rounded"
          required
        />
      </div>
      <span className="pb-3 text-black">~</span>
      <div className="flex-1">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-3 w-full bg-blue-100 text-black rounded"
          required
        />
      </div>
    </div>
  );
};
