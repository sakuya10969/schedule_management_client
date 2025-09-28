import { durationOptions } from '@/constants';
import { DurationSelectorProps } from '@/features/schedule/types';

const DurationSelector = ({
  durationMinutes,
  setDurationMinutes,
}: DurationSelectorProps) => {
  return (
    <div className="items-end rounded mt-2">
      <label className="block mb-1 font-semibold text-xl text-black">
        面談時間
      </label>
      <select
        value={durationMinutes}
        onChange={(e) => setDurationMinutes(Number(e.target.value))}
        className="border p-3 bg-blue-100 text-black cursor-pointer"
      >
        {durationOptions.map((duration) => (
          <option key={duration} value={duration}>
            {duration}
          </option>
        ))}
      </select>
      <span className="pb-3 ml-3 text-black">分</span>
    </div>
  );
};

export default DurationSelector;
