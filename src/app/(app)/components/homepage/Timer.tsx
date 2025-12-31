"use client";
import { memo, useEffect, useState } from "react";
import { calculateTimeLeft } from "@/src/services/timerHelpers";
import { TimerBlockProps, TimerProps } from "@/src/types/homepage";

const TimerBlock = memo(({ value, label, type }: TimerBlockProps) => (
    <div className="flex flex-col items-center">
    <div className={`${type=== "DealsOfTheMonth" ? "w-6 p-1 rounded-md sm:rounded-lg sm:w-8 md:font-lg md:w-10 lg:text-2xl lg:font-semibold lg:p-2 lg:w-16 bg-red-200" : ""} text-xs sm:text-base text-red-700 text-center opacity-80`}>
      <span>
        {value}
      </span>
      <span className="pl-1">{(type === "ProductPage" && label !== "Sec") && ":"}</span>
    </div>
    {type === "DealsOfTheMonth" && (
      <div className="text-[8px] sm:text-xs lg:text-sm text-red-500 opacity-80 mt-1">
        {label}
      </div>
    )}
  </div>
));
TimerBlock.displayName = "TimerBlock";

export function Timer({ endDateString, type }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endDateString));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = calculateTimeLeft(endDateString);
      if (!now) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft(now);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDateString]);

  if (!timeLeft) return null;

  return (
    <div className="">
        <div className={`${type === "DealsOfTheMonth" ? "space-x-2 lg:space-x-4" : "space-x-1"} flex font-sans opacity-80`}>
          <TimerBlock value={timeLeft.Days} label="Days" type={type} />
          <TimerBlock value={timeLeft.Hr} label="Hr" type={type} />
          <TimerBlock value={timeLeft.Mins} label="Mins" type={type} />
          <TimerBlock value={timeLeft.Sec} label="Sec" type={type} />
        </div>
    </div>
  );
}
