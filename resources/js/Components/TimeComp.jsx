import React, { useEffect, useState } from "react";

export default function TimeComp() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-2xl font-thin">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </p>
  );
}
