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
  const [selectedData, setSelectedData] = useState([
    "추가할 직원을 선택해주세요",
  ]);
  const [selectedRoleData, setSelectedRoleData] = useState([
    "직책을 선택해주세요.",
  ]);
  const [memberList, setMemberList] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [temporaryList, setTemporaryList] = useState([]);
  const nameRef = useRef();

  const location = useLocation();
  const tokenInfo = useSelector((state) => ({
    token: state.tokenInfo.token,
    credentialsExpired: state.tokenInfo.credentialsExpired,
  }));

  console.log(selectedData);
  // 프로젝트 정보 로드
  useMemo(() => {
    const item = location.state.key;
    console.log(item);
    setprojectId(item.project);
    console.log(projectId);

    const pmData = item.project.pm;
    const teamListWithoutPm = item.project.projectTeammateList.filter(
      (member) => member.empId !== pmData.empId
    );

    setTeammateList(teamListWithoutPm);
    setPm(pmData);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

  // 부서 구성원 리스트 로드
  useEffect(() => {
    const getEmp = async () => {
      if (deptId) {
        const response = await fetch(
          `http://localhost:8080/api/project/employee/findbydeptid/${deptId}`,
          { headers: { Authorization: tokenInfo.token }, method: "GET" }
        );
        const json = await response.json();
        console.log(json, ")!@!@!@!@!@");
        const members = json.body.map((emp) => ({
          label: emp.empName,
          value: emp.empId,
        }));
        const memberInfo = json.body.map((emp) => ({
          id: emp.empId,
          name: emp.empName,
          prfl: emp.prfl,
          cntct: emp.cntct,
          joblevel: emp.cmcdName,
          email: emp.email,
          addr: emp.addr,
        }));
        console.log(members, "231231231");
        console.log(memberInfo);
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
    }
  };

  // 삭제 핸들러 함수
  const onDeleteHandler = (idx, listType) => {
    if (listType === "teammateList") {
      setTeammateList((prev) => prev.filter((_, index) => index !== idx));
    } else if (listType === "temporaryList") {
      setTemporaryList((prev) => prev.filter((_, index) => index !== idx));
    }
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
                {!isEditing && <th></th>}
                {isEditing && <th>삭제</th>} {/* 삭제 컬럼 추가 */}
              </tr>
            </thead>
            <tbody>
              {pm && (
                <tr>
                  <td style={{ width: "300px" }}>{pm.employeeVO.empName}</td>
                  <td style={{ width: "300px" }}>{pm.role}</td>
                  <td></td> {/* 삭제 아이콘 자리 비우기 */}
                </tr>
              )}
              {teammateList.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ width: "300px" }}>
                    {isEditing ? (
                      <Selectbox
                        optionList={memberList}
                        selectedData={selectedData[idx]}
                        setSelectedData={setSelectedData}
                        style={{ width: "100%" }}
                        onChangeFn={(selectedOption) =>
                          onChangeSelectHandler(selectedOption, idx, "empName")
                        }
                      />
                    ) : (
                      item.empName
                    )}
                  </td>
                  <td style={{ width: "300px" }}>
                    {isEditing ? (
                      <Selectbox
                        optionList={[
                          { label: "PL", value: "PL" },
                          { label: "NONE", value: "NONE" },
                        ]}
                        selectedData={selectedRoleData[idx]}
                        setSelectedData={setSelectedRoleData}
                        style={{ width: "100%" }}
                        onChangeFn={(selectedOption) =>
                          onChangeSelectHandler(selectedOption, idx, "role")
                        }
                      />
                    ) : (
                      item.role
                    )}
                  </td>
                  {isEditing && (
                    <td>
                      <CiCircleMinus
                        onClick={() => onDeleteHandler(idx, "teammateList")}
                      />
                    </td>
                  )}
                </tr>
              ))}
              {isEditing &&
                temporaryList.map((item, idx) => (
                  <tr key={teammateList.length + idx}>
                    <td style={{ width: "300px" }}>
                      <Selectbox
                        optionList={memberList}
                        selectedData={selectedData[idx]}
                        setSelectedData={setSelectedData}
                        idx={idx}
                        style={{ width: "100%" }}
                        onChangeFn={(selectedOption) =>
                          onChangeSelectHandler(selectedOption, idx, "empName")
                        }
                      />
                    </td>
                    <td style={{ width: "300px" }}>
                      <div className={s.teamMateDisplayFlex}>
                        <Selectbox
                          optionList={[
                            { label: "PL", value: "PL" },
                            { label: "NONE", value: "NONE" },
                          ]}
                          selectedData={selectedRoleData[idx]}
                          setSelectedData={setSelectedRoleData}
                          style={{ width: "100%" }}
                          onChangeFn={(selectedOption) =>
                            onChangeSelectHandler(selectedOption, idx, "role")
                          }
                        />
                      </div>
                    </td>
                    <td className={s.svgTeammateContainer}>
                      <CiCircleMinus
                        onClick={() => onDeleteHandler(idx, "temporaryList")}
                      />
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
            <IoPersonCircleSharp />
          </div>
          <div className={s.teamMateEmpInfo}>사원 정보 공간입니다.</div>
        </div>
      </div>
    </div>
  );
}
