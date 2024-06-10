import { useRef, useState, useEffect, useMemo } from "react";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function TeamMate() {
  const [teammateList, setTeammateList] = useState([]);
  const [pm, setPm] = useState();
  const [deptId, setDeptId] = useState();
  const [memberList, setMemberList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Selectbox 표시 여부 관리
  const [temporaryList, setTemporaryList] = useState([]); // 임시 데이터 저장용
  const nameRef = useRef();

  const location = useLocation();
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  // 프로젝트 정보 로드
  useMemo(() => {
    const item = location.state.key;
    console.log(item);
    console.log(item.project.projectTeammateList, "!@@@@");
    setTeammateList(item.project.projectTeammateList);
    setPm(item.project.pm);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

  // 부서 구성원 리스트 로드
  useEffect(() => {
    const getEmp = async () => {
      const response = await fetch(
        `http://localhost:8080/api/project/employee/findbydeptid/${deptId}`,
        { headers: { Authorization: tokenInfo.token }, method: "GET" }
      );
      const json = await response.json();
      console.log(json, ")!@!@!@!@!@");
      setMemberList([]);
      for (let i of json.body) {
        setMemberList((prev) => [
          ...prev,
          { label: i.empName, value: i.empId },
        ]);
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          {pm && (
            <tr>
              <td style={{ width: "300px" }}>{pm.employeeVO.empName}</td>
              <td style={{ width: "300px" }}>{pm.role}</td>
            </tr>
          )}
          {teammateList.map((item, idx) => (
            <tr key={idx}>
              <td style={{ width: "300px" }}>
                {isEditing ? (
                  <Selectbox
                    optionList={memberList}
                    selectedData={item.empName || "추가할 직원을 선택해주세요."}
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
                    selectedData={item.role || "직책을 선택해주세요."}
                    style={{ width: "100%" }}
                    onChangeFn={(selectedOption) =>
                      onChangeSelectHandler(selectedOption, idx, "role")
                    }
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
          {isEditing &&
            temporaryList.map((item, idx) => (
              <tr key={teammateList.length + idx}>
                <td style={{ width: "300px" }}>
                  <Selectbox
                    optionList={memberList}
                    selectedData={item.empName || "추가할 직원을 선택해주세요."}
                    style={{ width: "100%" }}
                    onChangeFn={(selectedOption) =>
                      onChangeSelectHandler(selectedOption, idx, "empName")
                    }
                  />
                </td>
                <td style={{ width: "300px" }}>
                  <Selectbox
                    optionList={[
                      { label: "PL", value: "PL" },
                      { label: "NONE", value: "NONE" },
                    ]}
                    selectedData={item.role || "직책을 선택해주세요."}
                    style={{ width: "100%" }}
                    onChangeFn={(selectedOption) =>
                      onChangeSelectHandler(selectedOption, idx, "role")
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <div ref={buttonHiddenRef}>
          <Button onClickHandler={onModifyClickHandler} children="수정" />
        </div>
        <div ref={buttonGroupHiddenRef}>
          <Button onClickHandler={onPlusClickHandler} children="추가" />
          <Button onClickHandler={onSaveClickHandler} children="저장" />
        </div>
      </div>
    </div>
  );
}
