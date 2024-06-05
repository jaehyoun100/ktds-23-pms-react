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
      console.log(json);
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
              <td>{pm.employeeVO.empName}</td>
              <td>PM</td>
            </tr>
          )}
          {memberList?.map((item, idx) => (
            <td key={idx}>
              <Selectbox />
            </td>
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
