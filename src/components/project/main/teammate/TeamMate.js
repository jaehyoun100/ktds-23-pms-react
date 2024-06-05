import { useRef, useState, useEffect, useMemo } from "react";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function TeamMate() {
  // 기존 팀원 리스트
  const [teammateList, setTeammateList] = useState([]);
  // 기존 pm
  const [pm, setPm] = useState();
  const [deptId, setDeptId] = useState();
  // 해당 부서의 구성원 리스트
  const [memberList, setMemberList] = useState([]);
  const [selectedData, setSelectedData] =
    useState("추가할 직원을 선택해주세요.");
  const nameRef = useRef();

  const location = useLocation();
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  useMemo(() => {
    const item = location.state.key;
    console.log(item.project.projectTeammateList, "!@@@@");
    setTeammateList(item.project.projectTeammateList);
    setPm(item.project.pm);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

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
  }, []); // 마운트될 때 한 번 실행

  const onPlusClickHandler = () => {
    const item = { name: {}, role: {} };
    setMemberList((prev) => [...prev, item]);
  };

  const onSaveClickHandler = () => {
    buttonGroupHiddenRef.current.style.display = "none";
    buttonHiddenRef.current.style.display = "block";
  };

  const onModifyClickHandler = () => {
    buttonGroupHiddenRef.current.style.display = "block";
    buttonHiddenRef.current.style.display = "none";
  };

  const onChangeSelectHandler = async () => {
    console.log(nameRef.current);
    const response = await fetch(
      `http://localhost:8080/api/v1/employee/${nameRef.current}`,
      {
        method: "GET",
        headers: {
          Authorization: tokenInfo.token,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
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
              <td style={{ width: "300px" }}>PM</td>
            </tr>
          )}
          {teammateList?.map((item, idx) => (
            <tr key={idx}>
              <td>
                {memberList && (
                  <Selectbox
                    optionList={memberList}
                    setSelectedData={setSelectedData}
                    selectedData={selectedData}
                    style={{ width: "100%" }}
                    onChangeFn={onChangeSelectHandler}
                    selectRef={nameRef}
                  />
                )}
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
