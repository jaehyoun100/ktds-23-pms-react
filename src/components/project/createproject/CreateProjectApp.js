import React, { useRef, useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";
import Selectbox from "../../common/selectbox/Selectbox";
import SelectDate from "../../common/selectbox/SelectDate";

const CreateProjectApp = () => {
  const prjNameRef = useRef();
  const prjMemoRef = useRef();

  const [clientSelectedData, setClientSelectedData] =
    useState("값을 선택해주세요");
  const clientOptionList = [
    { label: "KT DS", value: "옵션value값" },
    { label: "삼성전자", value: "옵션value값2" },
  ];

  const [deptSelectedData, setDeptSelectedData] = useState("값을 선택해주세요");
  const deptOptionList = [
    { label: "운영 개발", value: "옵션value값" },
    { label: "어플리케이션 개발", value: "옵션value값2" },
  ];

  const [pmSelectedData, setPmSelectedData] = useState("값을 선택해주세요");
  const pmOptionList = [
    { label: "김소현", value: "옵션value값" },
    { label: "박상걸", value: "옵션value값2" },
  ];

  const [startSelectedDate, setStartSelectedDate] = useState(null);

  const handleStartDateSelect = (date) => {
    setStartSelectedDate(date);
  };
  const [endSelectedDate, setEndSelectedDate] = useState(null);

  const handleEndDateSelect = (date) => {
    setEndSelectedDate(date);
  };

  return (
    <div className={styles.createContainer}>
      <h3 className={styles.createAndModify}>프로젝트 생성 / 수정</h3>
      <div className={styles.createGrid}>
        <div>프로젝트명</div>
        <div>
          <TextInput id="prjName" textref={prjNameRef} />
        </div>
        <div>고객사</div>
        <div>
          <Selectbox
            optionList={clientOptionList}
            setSelectedData={setClientSelectedData}
            selectedData={clientSelectedData}
          />
        </div>
        <div>부서</div>
        <div>
          <Selectbox
            optionList={deptOptionList}
            setSelectedData={setDeptSelectedData}
            selectedData={deptSelectedData}
          />
        </div>
        <div>Project Manage</div>
        <div>
          <Selectbox
            optionList={pmOptionList}
            setSelectedData={setPmSelectedData}
            selectedData={pmSelectedData}
          />
        </div>
        <div>프로젝트 기간</div>
        <div>
          <SelectDate
            onStartDateSelect={handleStartDateSelect}
            onEndDateSelect={handleEndDateSelect}
          />
        </div>
        <div>Project Readme</div>
        <div>
          <TextInput id="prjMemo" textref={prjMemoRef} />
        </div>
      </div>
    </div>
  );
};

export default CreateProjectApp;
