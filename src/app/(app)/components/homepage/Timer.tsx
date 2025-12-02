
const TimerBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-xs w-7 p-1 rounded-md sm:rounded-lg sm:text-base sm:p-1 sm:w-8 md:font-lg md:w-10 lg:text-2xl lg:font-semibold lg:p-2 lg:w-16 text-red-700 bg-red-200 text-center opacity-80">
      {value}
    </div>
    <div className="text-[8px] sm:text-xs lg:text-sm text-red-500 opacity-80 mt-1">{label}</div>
  </div>
);

export function Timer() {

  const time = {
    days: "02",
    hrs: "06",
    mins: "05",
    sec: "30",
  };

  return (
    <div className="flex space-x-2 lg:space-x-4 font-sans">
      <TimerBlock value={time.days} label="Days" />
      <TimerBlock value={time.hrs} label="Hr" />
      <TimerBlock value={time.mins} label="Mins" />
      <TimerBlock value={time.sec} label="Sec" />
    </div>
  );
}