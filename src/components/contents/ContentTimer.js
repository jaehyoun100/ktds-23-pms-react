import React, { useState, useEffect } from "react";

export default function SessionTimer() {
  const [time, setTime] = useState(20 * 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time <= 0) {
        // 로그아웃
      } else {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="header-timer">
      {minutes}분 {seconds}초
    </div>
  );
}
