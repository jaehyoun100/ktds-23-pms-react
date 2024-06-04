import styles from "./selectbox.module.css";
import React, { useRef } from "react";
import { DatePicker, Button } from "antd";

const SelectDate = ({ onStartDateSelect, onEndDateSelect }) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleStartDateChange = (date) => {
    startDateRef.current = date;
  };
  const handleEndDateChange = (date) => {
    endDateRef.current = date;
  };

  const handleButtonClick = () => {
    if (!startDateRef.current) {
      alert(" 시작 날짜를 선택해 주세요.");
      return;
    } else if (!endDateRef.current) {
      alert(" 끝나는 날짜를 선택해 주세요.");
    } else if (startDateRef.current > endDateRef.current) {
      alert(" 시작날짜가 끝날짜보다 클 수 없습니다.");
    }
    onStartDateSelect(startDateRef.current);
    onEndDateSelect(endDateRef.current);
  };

  return (
    <div>
      <DatePicker
        className={styles.datePicker}
        onChange={handleStartDateChange}
      />
      ~
      <DatePicker
        className={styles.datePicker}
        onChange={handleEndDateChange}
      />
      <Button type="primary" onClick={handleButtonClick}>
        선택
      </Button>
    </div>
  );
};
export default SelectDate;
