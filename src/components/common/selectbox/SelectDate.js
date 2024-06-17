import styles from "./selectbox.module.css";
import React, { useRef, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";

const SelectDate = ({
  startDateRef,
  endDateRef,
  onChangeSelect,
  onChangeHandler,
  defaultStart,
  defaultEnd,
}) => {
  // const startDateRef = useRef(null);
  // const endDateRef = useRef(null);
  const [startDate, setStartDate] = useState(
    defaultStart ? defaultStart : undefined
  );
  const [a, seta] = useState(moment());
  const [endDate, setEndDate] = useState(defaultEnd ? defaultEnd : undefined);

  const handleStartDateChange = async (date) => {
    if (date && date.$d) {
      let origin = new Date(date.$d);
      const year = origin.getFullYear(); // 연도 가져오기
      const month = (origin.getMonth() + 1).toString().padStart(2, "0"); // 월 가져오기 (0부터 시작하므로 +1 해준 후 2자리로 만들기)
      const day = origin.getDate().toString().padStart(2, "0"); // 일 가져오기 (2자리로 만들기)

      const dateVal = `${year}${month}${day}`; // YYYYmmdd 형식으로 조합

      startDateRef.current = dateVal;
    } else {
      startDateRef.current = undefined;
    }
    onChangeSelect();
  };

  const handleEndDateChange = (date) => {
    if (date && date.$d) {
      let origin = new Date(date.$d);
      const year = origin.getFullYear(); // 연도 가져오기
      const month = (origin.getMonth() + 1).toString().padStart(2, "0"); // 월 가져오기 (0부터 시작하므로 +1 해준 후 2자리로 만들기)
      const day = origin.getDate().toString().padStart(2, "0"); // 일 가져오기 (2자리로 만들기)

      const dateVal = `${year}${month}${day}`; // YYYYmmdd 형식으로 조합
      endDateRef.current = dateVal;
    } else {
      endDateRef.current = undefined;
    }
    onChangeSelect();
  };

  return (
    <div onChange={onChangeHandler}>
      <DatePicker
        className={styles.datePicker}
        onChange={handleStartDateChange}
        // ref={startDateRef}
        defaultValue={dayjs(startDate, "YYYY-MM-DD")}
        format="YYYY-MM-DD"
      />
      ~
      <DatePicker
        className={styles.datePicker2}
        onChange={handleEndDateChange}
        // ref={endDateRef}
        defaultValue={dayjs(endDate, "YYYY-MM-DD")}
        format="YYYY-MM-DD"
      />
    </div>
  );
};
export default SelectDate;
