export const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - Date.now();
  if (difference <= 0) return null;

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return { Days: pad(d), Hr: pad(h), Mins: pad(m), Sec: pad(s) };
};