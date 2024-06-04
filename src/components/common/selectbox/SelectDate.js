import styles from "./selectbox.module.css";
import React from "react";
import { DatePicker } from "antd";

const SelectDate = ({ setStartDate, setEndDate, onChangeSelect }) => {
  return (
    <div>
      <DatePicker
        className={styles.datePicker}
        onClick={async (e) => {
          await setStartDate(e);
          await onChangeSelect();
        }}
      />
      ~
      <DatePicker
        className={styles.datePicker2}
        onClick={(e) => {
          setEndDate(e);
          onChangeSelect();
        }}
      />
    </div>
  );
};
export default SelectDate;
