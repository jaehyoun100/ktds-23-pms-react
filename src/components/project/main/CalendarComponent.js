import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import s from "../project.module.css";
import styles from "../Calendar.module.css";
import Button from "../../common/Button/Button";

const CalendarComponent = ({ events, saveMemo, memoRef }) => {
  const [date, setDate] = useState(new Date());
  const [memo, setMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const event = events.find(
        (event) => event.date === selectedDate.toISOString().split("T")[0]
      );
      setMemo(event ? event.memo : "");
    }
  }, [selectedDate, events]);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  };

  const handleSaveMemo = () => {
    if (selectedDate) {
      saveMemo(selectedDate, memo);
    }
    setMemo("");
  };

  return (
    <div>
      <div className={s.calendarContainer}>
        <Calendar
          className={styles.reactCalendar}
          onChange={handleDateChange}
          value={date}
          locale={"en"}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
        />
        {selectedDate && (
          <div className={s.calendarMemoContainer}>
            <div className={s.calendarMemoDate}>
              {" "}
              날짜 : {selectedDate.toDateString()}
            </div>
            <textarea
              ref={memoRef}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 작성하기"
            />
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <Button onClick={handleSaveMemo} children="메모 저장" />
            </div>
          </div>
        )}
        <div className={s.calendarTodo}>
          <ul>
            <div>해야할 일</div>
            {events.map((event) => (
              <li key={event.id}>
                <div>{event.date}</div>
                <div>{event.memo}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
