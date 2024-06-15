import React, { useEffect, useState } from "react";
import s from "./TeamMate.module.css";

const TeammateEmpInfo = ({ empData }) => {
  const [selectedEmpData, setSelectedEmpData] = useState();
  useEffect(() => {
    setSelectedEmpData(empData);
  }, [empData]);
  return (
    <div className={s.teamMateEmpInfo}>
      <div className={s.teamMateEmpInfoFlex}>
        <div>이름</div>
        <div>{selectedEmpData && selectedEmpData.empName}</div>
      </div>
      <div className={s.teamMateEmpInfoFlex}>
        <div>소속</div>
        <div>
          {selectedEmpData && selectedEmpData.departmentVO.deptName}
          {selectedEmpData && "/"}
          {selectedEmpData && selectedEmpData.teamVO?.tmName}
        </div>
      </div>
      <div className={s.teamMateEmpInfoFlex}>
        <div>직급</div>
        <div>{selectedEmpData && selectedEmpData.pstnName}</div>
      </div>
      <div className={s.teamMateEmpInfoFlex}>
        <div>직무</div>
        <div>{selectedEmpData && selectedEmpData.jobVO.jobName}</div>
      </div>
      <div className={s.teamMateEmpInfoFlex}>
        <div>생년월일</div>
        <div>{selectedEmpData && selectedEmpData.brth}</div>
      </div>
      <div className={s.teamMateEmpInfoFlex}>
        <div>이메일</div>
        <div>{selectedEmpData && selectedEmpData.email}</div>
      </div>
      <div className={`${s.teamMateEmpInfoFlex} ${s.lastInfo}`}>
        <div>주소</div>
        <div>{selectedEmpData && selectedEmpData.addr}</div>
      </div>
    </div>
  );
};

export default TeammateEmpInfo;
