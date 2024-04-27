import React, { useEffect, useState } from "react";

export default function DatePicker() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
            <div className="mt-2">
              <p className="text-xl font-light">
                {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            </div>
    );
}
