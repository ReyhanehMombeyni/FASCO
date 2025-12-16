import { Timer } from "../homepage/Timer";

export const TimerDisplay = ({
  campaignEndDate,
}: {
  campaignEndDate: string;
}) => {
  return (
    <div className="flex justify-between items-center bg-red-50/70 border border-red-100 rounded-md p-2.5 text-red-400 mt-4">
      <span className="font-thin font-serif tracking-wide text-xs lg:text-sm">
        Hurry up! Sale ends in:
      </span>
      <Timer endDateString={campaignEndDate} type="ProductPage" />
    </div>
  );
};
