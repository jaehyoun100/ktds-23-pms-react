import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import s from "../project.module.css";
import styles from "../Calendar.module.css";
import Button from "../../common/Button/Button";
import { format } from "date-fns";

const CalendarComponent = ({
  events,
  saveMemo,
  memoRef,
  isNeedRender,
  setNeedRender,
}) => {
  const [date, setDate] = useState(new Date());
  const [memo, setMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const memoHiddenRef = useRef(null);
  const todoHiddenRef = useRef(null);

  useEffect(() => {
    if (selectedDate && memoHiddenRef.current) {
      if (memoHiddenRef.current.style.display === "none") {
        memoHiddenRef.current.style.display = "block";
      }
      todoHiddenRef.current.style.display = "none";
      const event = events.find(
        (event) => event.date === format(selectedDate, "yyyy-MM-dd")
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
      saveMemo(format(selectedDate, "yyyy-MM-dd"), memo);
    }
    setMemo("");
  };

  const handleChangeMemo = () => {
    if (memoHiddenRef.current) {
      memoHiddenRef.current.style.display = "none";
      todoHiddenRef.current.style.display = "block";
    }
    setNeedRender(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      return <div>{date.getDate()}</div>;
    }
    return null;
  };

  return (
    <div>
      <div className={s.calendarContainer}>
        <Calendar
          className={styles.reactCalendar}
          onChange={handleDateChange}
          value={date}
          locale={"ko-KR"}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          tileContent={tileContent}
        />
        {selectedDate && (
          <div
            className={s.calendarMemoContainer}
            id="change-hidden-memo"
            ref={memoHiddenRef}
          >
            <div className={s.calendarMemoDate}>
              날짜 :{" "}
              {selectedDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </div>
            <textarea
              ref={memoRef}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 작성하기"
            />
            <div style={{ display: "flex", justifyContent: "right" }}>
              <div
                style={{
                  textAlign: "right",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                <Button onClickHandler={handleSaveMemo} children="메모 저장" />
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <Button
                  onClickHandler={handleChangeMemo}
                  children="할일 보기"
                />
              </div>
            </div>
          </div>
        )}
        <div
          className={s.calendarTodo}
          id="change-hidden-todo"
          ref={todoHiddenRef}
        >
          <ul>
            <div className={s.todo}>해야할 일</div>
            <div className={s.ulContainer}>
              {events.map((event, idx) => (
                <li key={idx}>
                  <span className={s.eventDate}>{event.date}</span>
                  {"  "}
                  <span>{event.memo}</span>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
