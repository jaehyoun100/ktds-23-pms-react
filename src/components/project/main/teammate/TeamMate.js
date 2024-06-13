import { useRef, useState, useEffect, useMemo } from "react";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { CiCircleMinus } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import MainHeader from "../MainHeader";

export default function TeamMate() {
  const [teammateList, setTeammateList] = useState([]);
  const [projectId, setprojectId] = useState([]);
  const [pm, setPm] = useState(null);
  const [deptId, setDeptId] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [selectedRoleData, setSelectedRoleData] = useState([]);
  const [lastModifiedIndex, setLastModifiedIndex] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [temporaryList, setTemporaryList] = useState([]);
  const [lastModifyData, setLastModifyData] = useState([]);
  const [selectedEmpData, setSelectedEmpData] = useState();
  const nameRef = useRef();

  const location = useLocation();
  const tokenInfo = useSelector((state) => ({
    token: state.tokenInfo.token,
    credentialsExpired: state.tokenInfo.credentialsExpired,
  }));

  useEffect(() => {
    console.log(selectedData, selectedRoleData);
  }, [selectedData, selectedRoleData]);

  useMemo(() => {
    const item = location.state.key;
    setprojectId(item.project);

    const pmData = item.project.pm;
    const teamListWithoutPm = item.project.projectTeammateList.filter(
      (member) => member.empId !== pmData.empId
    );

    setTeammateList(teamListWithoutPm);
    setPm(pmData);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

  useEffect(() => {
    const getEmp = async () => {
      if (deptId) {
        const response = await fetch(
          `http://localhost:8080/api/project/employee/findbydeptid/${deptId}`,
          {
            headers: {
              Authorization: tokenInfo.token,
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const json = await response.json();
        const members = json.body.map((emp) => ({
          label: emp.empName,
          value: emp.empId,
        }));
        setMemberList(members);
      }
    };
    getEmp();
  }, [deptId, tokenInfo.token]);

  const buttonGroupHiddenRef = useRef(null);
  const buttonHiddenRef = useRef(null);

  useEffect(() => {
    if (buttonGroupHiddenRef.current) {
      buttonGroupHiddenRef.current.style.display = "none";
    }
  }, []);

  const onPlusClickHandler = () => {
    if (isEditing) {
      setTemporaryList((prev) => [
        ...prev,
        { empName: "", empId: "", role: "" },
      ]);
    }
  };

  const onSaveClickHandler = async () => {
    alert("save를 클릭함.");
  };

  const onModifyClickHandler = () => {
    setIsEditing(true);
    buttonGroupHiddenRef.current.style.display = "block";
    buttonHiddenRef.current.style.display = "none";
  };

  const onChangeSelectHandler = (selectedOption, idx, type) => {
    if (selectedOption) {
      setTemporaryList((prevList) =>
        prevList.map((item, index) =>
          index === idx
            ? {
                ...item,
                [type]: selectedOption.label,
                empId: type === "empName" ? selectedOption.value : item.empId,
              }
            : item
        )
      );
      setLastModifiedIndex(idx);
    }
  };

  useEffect(() => {
    const getEmpData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/employee/view/${lastModifyData}`,
        {
          headers: {
            Authorization: tokenInfo.token,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const json = await response.json();
      return json;
    };

    const data = async () => {
      const getdata = await getEmpData();
      await setSelectedEmpData(getdata.body);
    };
    data();
  }, [lastModifyData, tokenInfo.token]);

  useEffect(() => {
    if (lastModifiedIndex !== null) {
      const lastModifiedData = {
        empName: selectedData[lastModifiedIndex],
      };
      setLastModifyData(lastModifiedData.empName);
    }
  }, [lastModifiedIndex, selectedData]);

  const onDeleteHandler = (idx) => {
    const updatedTemporaryList = [...temporaryList];
    updatedTemporaryList.splice(idx, 1);
    setTemporaryList(updatedTemporaryList);

    const updatedSelectedData = [...selectedData];
    updatedSelectedData.splice(idx, 1);
    setSelectedData(updatedSelectedData);

    const updatedSelectedRoleData = [...selectedRoleData];
    updatedSelectedRoleData.splice(idx, 1);
    setSelectedRoleData(updatedSelectedRoleData);
  };

  return (
    <div>
      <MainHeader project={projectId} />
      <div className={s.teamMateContainer}>
        <div className={s.teamMateTableContainer}>
          <table className={s.teamMateTable}>
            <thead>
              <tr>
                <th>이름</th>
                <th>역할</th>
                {isEditing && <th>삭제</th>}
              </tr>
            </thead>
            <tbody>
              {pm && (
                <tr>
                  <td style={{ width: "300px" }}>{pm.employeeVO.empName}</td>
                  <td style={{ width: "300px" }}>{pm.role}</td>
                  {isEditing && <td></td>}
                </tr>
              )}
              {isEditing &&
                temporaryList.map((item, idx) => (
                  <tr key={teammateList.length + idx}>
                    <td style={{ width: "300px" }}>
                      <Selectbox
                        optionList={memberList}
                        selectedData={selectedData}
                        setSelectedData={setSelectedData}
                        idx={idx}
                        style={{ width: "100%" }}
                        onChangeFn={(selectedOption) =>
                          onChangeSelectHandler(selectedOption, idx, "empName")
                        }
                        initial="추가할 직원을 선택해주세요"
                      />
                    </td>
                    <td style={{ width: "300px" }}>
                      <div className={s.teamMateDisplayFlex}>
                        <Selectbox
                          optionList={[
                            { label: "PL", value: "PL" },
                            { label: "NONE", value: "NONE" },
                          ]}
                          idx={idx}
                          selectedData={selectedRoleData}
                          setSelectedData={setSelectedRoleData}
                          style={{ width: "100%" }}
                          onChangeFn={(selectedOption) =>
                            onChangeSelectHandler(selectedOption, idx, "role")
                          }
                          initial="직책을 선택해주세요"
                        />
                      </div>
                    </td>
                    <td className={s.svgTeammateContainer}>
                      <CiCircleMinus onClick={() => onDeleteHandler(idx)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={s.teamMateButtonArea}>
          <div ref={buttonHiddenRef}>
            <Button onClickHandler={onModifyClickHandler} children="수정" />
          </div>
          <div ref={buttonGroupHiddenRef}>
            <Button onClickHandler={onPlusClickHandler} children="추가" />
            <Button onClickHandler={onSaveClickHandler} children="저장" />
          </div>
        </div>
        <div className={s.teamMateEmpArea}>
          <div className={s.teamMateEmpPhoto}>
            {selectedEmpData && selectedEmpData.originPrflFileName !== null ? (
              selectedEmpData.originPrflFileName
            ) : (
              <IoPersonCircleSharp />
            )}
          </div>
          <div className={s.teamMateEmpInfo}>
            <div className={s.teamMateEmpInfoFlex}>
              <div>이름 :</div>
              <div>{selectedEmpData && selectedEmpData.empName}</div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>소속 :</div>
              <div>
                {selectedEmpData && selectedEmpData.departmentVO.deptName}
                {selectedEmpData && "/"}
                {selectedEmpData && selectedEmpData.teamVO?.tmName}
              </div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>직급 :</div>
              <div>{selectedEmpData && selectedEmpData.cmcdName}</div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>직무 :</div>
              <div>{selectedEmpData && selectedEmpData.jobVO.jobName}</div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>생년월일 :</div>
              <div>{selectedEmpData && selectedEmpData.brth}</div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>이메일 :</div>
              <div>{selectedEmpData && selectedEmpData.email}</div>
            </div>
            <div className={s.teamMateEmpInfoFlex}>
              <div>주소 :</div>
              <div>{selectedEmpData && selectedEmpData.addr}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
