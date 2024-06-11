import { useCallback, useMemo, useRef, useState } from "react";
import { useFetch } from "../hook/useFetch";
import { loadDepartmentMemberList } from "../../http/memoHttp";
import Button from "../common/Button/Button";
import style from "./Memo.module.css";

export default function SearchEmployee({
  token,
  selectedDeptId,
  selectTmId,
  onAddRcv,
  onAddRcvRef,
  onAddRcvSecretRef,
  checkedEmployees,
  setCheckedEmployees,
}) {
  const [needLoad, setNeedLoad] = useState();
  // const [checkedEmployees, setCheckedEmployees] = useState([]);
  const isDeptId = selectedDeptId !== null && selectedDeptId !== "";
  const isTmId = selectTmId !== null && selectTmId !== "";

  const fetchLoadDeptMemberList = useCallback(loadDepartmentMemberList, []);
  const fetchDeptMemberParam = useMemo(() => {
    return { selectedDeptId, token, needLoad };
  }, [selectedDeptId, token, needLoad]);
  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadDeptMemberList,
    fetchDeptMemberParam
  );
  const { body: deptMemberList } = data || {};

  // const onAddEmpHandler = (empId, empName, email) => {
  //   const isChecked = checkedEmployees.includes(empId);

  //   if (isChecked) {
  //     setCheckedEmployees(checkedEmployees.filter((id) => id !== empId));
  //   } else {
  //     setCheckedEmployees([...checkedEmployees, { empId, empName, email }]);
  //   }
  // };

  // const handleCheckboxChange = (empId) => {
  //   setCheckedEmployees((prevCheckedEmployees) => {
  //     if (prevCheckedEmployees.includes(empId)) {
  //       // 이미 체크된 경우, 해당 아이템을 배열에서 제거
  //       return prevCheckedEmployees.filter((id) => id !== empId);
  //     } else {
  //       // 체크되지 않은 경우, 해당 아이템을 배열에 추가
  //       return [...prevCheckedEmployees, empId];
  //     }
  //   });
  // };

  const handleCheckboxChange = (emp) => {
    setCheckedEmployees((prevCheckedEmployees) => {
      if (prevCheckedEmployees.some((item) => item.empId === emp.empId)) {
        // 이미 체크된 경우, 해당 아이템을 배열에서 제거
        return prevCheckedEmployees.filter((item) => item.empId !== emp.empId);
      } else {
        // 체크되지 않은 경우, 해당 아이템을 배열에 추가
        return [...prevCheckedEmployees, emp];
      }
    });
  };

  console.log("10823049>> ", checkedEmployees);

  // 수신 목록 전달
  const onAddRcvClickHadler = () => {
    onAddRcv(checkedEmployees);
  };

  // 참조 목록 전달
  const onAddRcvRefClickHadler = () => {
    onAddRcvRef(checkedEmployees);
  };

  // 숨은참조 목록 전달
  const onAddRcvSecretRefClickHadler = () => {
    onAddRcvSecretRef(checkedEmployees);
  };

  return (
    <div className={style.modalEmployeeArea}>
      {isLoading && <div>데이터를 불러오는 중입니다.</div>}
      <div className={style.modalEmpInfo}>
        {isDeptId &&
          !isTmId &&
          deptMemberList &&
          deptMemberList.map((emp) => (
            <>
              <input
                type="checkBox"
                id={emp.empId}
                checked={checkedEmployees.some(
                  (item) => item.empId === emp.empId
                )}
                onChange={() => handleCheckboxChange(emp)}
              />
              <div key={emp.empId} className="emp-id-info">
                {emp.empName} ({emp.email})
              </div>
            </>
          ))}
        {isDeptId &&
          isTmId &&
          deptMemberList &&
          deptMemberList.map(
            (emp) =>
              emp.tmId === selectTmId && (
                <div key={emp.empId}>
                  {emp.empName} ({emp.email})
                </div>
              )
          )}
      </div>
      <div className={style.modalBtnArea}>
        <Button onClickHandler={onAddRcvClickHadler}>수신</Button>
        <Button onClickHandler={onAddRcvRefClickHadler}>참조</Button>
        <Button onClickHandler={onAddRcvSecretRefClickHadler}>숨은참조</Button>
      </div>
    </div>
  );
}
