import styles from "./selectbox.module.css";
import React, { useRef } from "react";
import { DatePicker } from "antd";

const SelectDate = ({ startDateRef, endDateRef, onChangeSelect }) => {
  // const startDateRef = useRef(null);
  // const endDateRef = useRef(null);

  const handleStartDateChange = async (date) => {
    // console.log(date !== null ? date.$d : null, "????????????");
    let origin = date.$d ? new Date(date.$d).toISOString() : null;
    let dateVal = origin.replace(/-/g, "").slice(0, 8);
    console.log(dateVal, "!!!!!!!!?");
    startDateRef.current = dateVal;
    // await setStartDate(dateVal);
    onChangeSelect();
  };
  const handleEndDateChange = (date) => {
    let origin = new Date(date?.$d).toISOString();
    let dateVal = origin.replace(/-/g, "").slice(0, 8);
    endDateRef.current = dateVal;
    // setEndDate(dateVal);
    onChangeSelect();
  };

  return (
    <div>
      <DatePicker
        className={styles.datePicker}
        onChange={handleStartDateChange}
      />
      ~
      <DatePicker
        className={styles.datePicker2}
        onChange={handleEndDateChange}
      />
    </div>
  );
};
export default SelectDate;
