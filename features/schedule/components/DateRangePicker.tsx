interface DateRangePickerProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangePickerProps) => {
  return (
    <div className="flex items-end space-x-2 p-3 rounded w-full">
      <div className="flex-1">
        <label className="block mb-1 font-semibold text-xl text-black">
          調整期間
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-3 w-full bg-blue-100 text-black"
          required
        />
      </div>
      <span className="pb-3">~</span>
      <div className="flex-1">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-3 w-full bg-blue-100 text-black"
          required
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
