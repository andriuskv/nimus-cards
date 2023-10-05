import { useState, useEffect, useRef } from "react";
import { formatTime } from "helpers";
import "./timer.css";

export default function Timer({ revealed, initDuration, callback }) {
  const [duration, setDuration] = useState(initDuration);
  const timeoutId = useRef(0);

  useEffect(() => {
    updateTimer(duration);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    if (revealed) {
      clearTimeout(timeoutId.current);
    }
  }, [revealed]);

  function updateTimer(duration) {
    if (duration < 1) {
      callback();
    }
    else {
      timeoutId.current = setTimeout(() => {
        const newDuration = duration - 1;

        setDuration(newDuration);
        updateTimer(newDuration);
      }, 1000);
    }
  }

  return <div className="timer">{formatTime(duration)}</div>;
}
