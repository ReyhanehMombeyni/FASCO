"use client";
import { useEffect, useState } from "react";

interface TimeValues {
  Days: number;
  Hr: number;
  Mins: number;
  Sec: number;
}
interface TimeLeft {
  Days: string;
  Hr: string;
  Mins: string;
  Sec: string;
  isFinished: boolean;
}

interface TimerBlockProps {
  value: string;
  label: string;
  type: string;
}

export interface TimerProps {
  endDateString: string;
  type: string;
}
const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();

  let timeValues: TimeValues = { Days: 0, Hr: 0, Mins: 0, Sec: 0 };
  const isFinished = difference <= 0;

  if (difference > 0) {
    timeValues = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hr: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Mins: Math.floor((difference / 1000 / 60) % 60),
      Sec: Math.floor((difference / 1000) % 60),
    };
  }

  const pad = (num: number): string => (num < 10 ? `0${num}` : String(num));
  return {
    Days: pad(timeValues.Days),
    Hr: pad(timeValues.Hr),
    Mins: pad(timeValues.Mins),
    Sec: pad(timeValues.Sec),
    isFinished: isFinished,
  };
};

const TimerBlock = ({ value, label, type }: TimerBlockProps) => (
  <div className="flex flex-col items-center">
    <div className={`${type=== "DealsOfTheMonth" ? "w-7 p-1 rounded-md sm:rounded-lg sm:w-8 md:font-lg md:w-10 lg:text-2xl lg:font-semibold lg:p-2 lg:w-16 bg-red-200" : ""} text-xs sm:text-base text-red-700 text-center opacity-80`}>
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
);

export function Timer({ endDateString, type }: TimerProps) {
  const initialTime = calculateTimeLeft(endDateString);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    const initialCalculation = calculateTimeLeft(endDateString);
    setTimeout(() => {
      setTimeLeft(initialCalculation);
      setHasMounted(true);
    }, 0);

    if (initialCalculation.isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDateString));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDateString]);

  if (!hasMounted || !timeLeft) {
    return (
      <div className={`${type === "DealsOfTheMonth" ? "space-x-2 lg:space-x-4" : "space-x-1"} flex font-sans opacity-80`}>
        <TimerBlock value="--" label="Days" type={type} />
        <TimerBlock value="--" label="Hr" type={type} />
        <TimerBlock value="--" label="Mins" type={type} />
        <TimerBlock value="--" label="Sec" type={type} />
      </div>
    );
  }

  return (
    <div className="">
      {!timeLeft.isFinished && (
        <div className={`${type === "DealsOfTheMonth" ? "space-x-2 lg:space-x-4" : "space-x-1"} flex font-sans opacity-80`}>
          <TimerBlock value={timeLeft.Days} label="Days" type={type} />
          <TimerBlock value={timeLeft.Hr} label="Hr" type={type} />
          <TimerBlock value={timeLeft.Mins} label="Mins" type={type} />
          <TimerBlock value={timeLeft.Sec} label="Sec" type={type} />
        </div>
      )}
    </div>
  );
}
