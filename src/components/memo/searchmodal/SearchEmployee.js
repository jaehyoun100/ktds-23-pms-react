import { useCallback, useMemo, useState } from "react";
import style from "../Memo.module.css";
import { useDispatch } from "react-redux";
import { loadDepartmentMemberList } from "../../../http/memoHttp";
import { useFetch } from "../../hook/useFetch";
import { memoAddrAction } from "../../../store/toolkit/slice/memoAddrSlice";
import Button from "../../common/Button/Button";

export default function SearchEmployee({ token, selectedDeptId, selectTmId }) {
  // toolkit
  const memoDispatch = useDispatch();
  const [needLoad, setNeedLoad] = useState();
  const [checkedRcvList, setCheckedRcvList] = useState([]);

  const isDeptId = selectedDeptId !== null && selectedDeptId !== "";
  const isTmId = selectTmId !== null && selectTmId !== "";

  // 부서원 조회
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
  console.log(",,,,,,", deptMemberList);

  // 선택 사원 배열
  const handleCheckboxChange = (emp) => {
    setCheckedRcvList((prevCheckedRcvList) => {
      if (prevCheckedRcvList.some((item) => item.empId === emp.empId)) {
        return prevCheckedRcvList.filter((item) => item.empId !== emp.empId);
      } else {
        return [...prevCheckedRcvList, emp];
      }
    });
  };

  // 수신 목록 전달
  const onAddRcvClickHadler = () => {
    if (checkedRcvList.length < 1) {
      alert("수신인를 선택해주세요");
    }
    memoDispatch(
      memoAddrAction.addRcvList({
        rcvList: checkedRcvList,
      })
    );
    setCheckedRcvList([]);
  };

  // 참조 목록 전달
  const onAddRcvRefClickHadler = () => {
    if (checkedRcvList.length < 1) {
      alert("참조인를 선택해주세요");
    }
    memoDispatch(
      memoAddrAction.addRcvRefList({
        rcvRefList: checkedRcvList,
      })
    );
    setCheckedRcvList([]);
  };

  // 숨은참조 목록 전달
  const onAddRcvSecretRefClickHadler = () => {
    if (checkedRcvList.length < 1) {
      alert("숨은참조인를 선택해주세요");
    }
    memoDispatch(
      memoAddrAction.addRcvSecretRefList({
        rcvSecretRefList: checkedRcvList,
      })
    );
    setCheckedRcvList([]);
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
                checked={checkedRcvList.some(
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
                <>
                  <input
                    type="checkBox"
                    id={emp.empId}
                    checked={checkedRcvList.some(
                      (item) => item.empId === emp.empId
                    )}
                    onChange={() => handleCheckboxChange(emp)}
                  />
                  <div key={emp.empId}>
                    {emp.empName} ({emp.email})
                  </div>
                </>
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
