import { useEffect, useState } from 'react';

function getParts(target) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ endDate }) {
  const target = endDate ? new Date(endDate).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 10;
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { label: 'Days', value: parts.days },
    { label: 'Hr', value: parts.hours },
    { label: 'Mins', value: parts.minutes },
    { label: 'Secs', value: parts.seconds },
  ];

  return (
    <div className="flex gap-3">
      {cells.map((c) => (
        <div
          key={c.label}
          className="flex min-w-[70px] flex-col items-center rounded-md bg-white px-3 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          <span className="text-xl font-semibold text-fasco-black md:text-2xl">
            {String(c.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[11px] text-fasco-muted">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
