import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { CiCircleMinus } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import MainHeader from "../MainHeader";
import { getEmp, getEmpData } from "../../../../http/projectHttp";

export default function TeamMate() {
  const [teammateList, setTeammateList] = useState([]);
  const [project, setproject] = useState([]);
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
  const [willInsertData, setWillInsertData] = useState([]);
  const [canAdd, setCanAdd] = useState(true);
  const [isPossible, setIsPossible] = useState(false);
  const nameRef = useRef();

  const navigate = useNavigate();

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
    setproject(item.project);

    const pmData = item.project.pm;
    const teamListWithoutPm = item.project.projectTeammateList.filter(
      (member) => member.empId !== pmData.empId
    );

    setTeammateList(teamListWithoutPm);
    setPm(pmData);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

  // 부서 구성원 리스트 로드
  const memoizedGetEmp = useCallback(getEmp, []);

  useEffect(() => {
    memoizedGetEmp(deptId, tokenInfo.token, setMemberList);
  }, [deptId, tokenInfo.token, memoizedGetEmp]);

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
        { empName: "", empId: "", role: "", key: Date.now() },
      ]);
    }
  };

  const onSaveClickHandler = () => {
    console.log(selectedData, selectedRoleData);
    if (selectedData.length === 0 || selectedRoleData.length === 0) {
      alert("값을 선택해주세요");
      return;
    }
    console.log(selectedData.length);

    const newData = selectedData.map((data, index) => ({
      prjId: project.prjId,
      tmId: data,
      role: selectedRoleData[index],
    }));

    setWillInsertData((prev) => [...prev, ...newData]);
    setIsPossible(true);
  };

  useEffect(() => {
    const sendRequest = async () => {
      if (willInsertData.length > 0 && isPossible) {
        console.log(willInsertData);
        const res = await fetch(
          `http://localhost:8080/api/project/teammate/${project.prjId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfo.token,
            },
            body: JSON.stringify(willInsertData),
          }
        );
        const json = await res.json();
        if (json.status === 200) {
          setIsEditing(false);
          navigate("/project/view", { state: { key: project } });
        }
        setWillInsertData([]);
        setIsPossible(false);
      }
    };

    sendRequest();
  }, [willInsertData, isPossible]);

  const onModifyClickHandler = () => {
    setIsEditing(true);
    buttonGroupHiddenRef.current.style.display = "block";
    buttonHiddenRef.current.style.display = "none";
  };

  const onChangeSelectHandler = async (selectedOption, idx, type) => {
    for (let item of project.projectTeammateList) {
      if (selectedOption?.value === item.tmId) {
        alert("이미 존재하는 사원입니다.");
        setCanAdd(false);
        return;
      }
    }
    for (let item of selectedData) {
      if (selectedOption?.value === item) {
        alert("이미 존재하는 사원입니다.");
        setCanAdd(false);
        return;
      }
    }
    if (selectedOption && canAdd) {
      canAdd &&
        setTemporaryList((prevList) =>
          prevList?.map((item, index) =>
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
      return;
    }
  };

  const memoizedGetEmpData = useCallback(getEmpData, []);
  useEffect(() => {
    const data = async () => {
      const getdata = await memoizedGetEmpData(lastModifyData, tokenInfo.token);
      await setSelectedEmpData(getdata.body);
    };
    data();
  }, [lastModifyData, tokenInfo.token, memoizedGetEmpData]);

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
      <MainHeader project={project} />
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
              {project.projectTeammateList &&
                project.projectTeammateList
                  .filter((item) => item.role !== "PM")
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.employeeVO.empName}</td>
                      <td>{item.role}</td>
                      {isEditing && <td></td>}
                    </tr>
                  ))}
              {isEditing &&
                temporaryList.map((item, idx) => (
                  <tr key={item.key}>
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
