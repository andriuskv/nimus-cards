import React, { useState, useEffect, useRef } from "react";
import "./timer.scss";

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

  function getSeconds(duration) {
    const seconds = duration % 60;

    return seconds < 10 ? `0${seconds}` : seconds;
  }

  function getMinutes(duration) {
    const minutes = Math.floor(duration / 60 % 60);

    return duration >= 3600 && minutes < 10 ? `0${minutes}` : minutes;
  }

  function getHours(duration) {
    return Math.floor(duration / 3600);
  }

  function formatDuration(duration) {
    const seconds = getSeconds(duration);
    const minutes = getMinutes(duration);
    const hours = getHours(duration);

    return `${hours ? `${hours}:` : ""}${minutes}:${seconds}`;
  }

  return <div className="timer">{formatDuration(duration)}</div>;
}
