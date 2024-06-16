import { useCallback, useEffect, useMemo, useState } from "react";
import style from "../Memo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadDepartmentMemberList } from "../../../http/memoHttp";
import { useFetch } from "../../hook/useFetch";
import { memoAddrAction } from "../../../store/toolkit/slice/memoAddrSlice";
import Button from "../../common/Button/Button";

export default function SearchEmployee({
  token,
  selectedDeptId,
  setSelectedDeptId,
  selectTmId,
  isAllCheckedEmp,
  setIsAllCheckedEmp,
}) {
  // toolkit
  const memoDispatch = useDispatch();
  const [needLoad, setNeedLoad] = useState();
  const [checkedRcvList, setCheckedRcvList] = useState([]);
  const [isSearchEmp, setIsSearchEmp] = useState(0);
  const { searchEmployeeList } = useSelector((state) => state.receiverList);

  useEffect(() => {
    if (searchEmployeeList) {
      setIsSearchEmp(searchEmployeeList.length);
    }
  }, [searchEmployeeList, isSearchEmp]);

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

  useEffect(() => {
    if (isAllCheckedEmp && (searchEmployeeList || deptMemberList)) {
      let updatedList = [];
      if (searchEmployeeList) {
        const empUpdatedList = searchEmployeeList.map((emp) => ({
          ...emp,
          isChecked: true,
        }));
        updatedList = [...updatedList, ...empUpdatedList];
      }
      if (deptMemberList) {
        const deptUpdatedList = deptMemberList.map((emp) => ({
          ...emp,
          isChecked: true,
        }));
        updatedList = [...updatedList, ...deptUpdatedList];
      }
      setCheckedRcvList(updatedList);
    } else {
      setCheckedRcvList([]);
    }
  }, [isAllCheckedEmp, searchEmployeeList, deptMemberList]);

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
    setSelectedDeptId(undefined);
    setIsAllCheckedEmp(false);
    memoDispatch(memoAddrAction.resetSearchEmpList());
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
    setSelectedDeptId(undefined);
    setIsAllCheckedEmp(false);
    memoDispatch(memoAddrAction.resetSearchEmpList());
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
    setSelectedDeptId(undefined);
    setIsAllCheckedEmp(false);
    memoDispatch(memoAddrAction.resetSearchEmpList());
  };

  return (
    <>
      {/* <div className={style.modalEmployeeArea}> */}
      {isLoading && <div>데이터를 불러오는 중입니다.</div>}
      <div className={style.searchListItemsBtn}>
        <div className={`${style.tree} ${style.treeOverflowScroll}`}>
          {isDeptId &&
            !isTmId &&
            deptMemberList &&
            deptMemberList.map((emp) => (
              <>
                <div
                  key={emp.id}
                  className={style.treeItem}
                  onClick={() => handleCheckboxChange(emp)}
                >
                  <input
                    type="checkBox"
                    id={emp.empId}
                    className={style.treeItemToggle}
                    checked={checkedRcvList.some(
                      (item) => item.empId === emp.empId
                    )}
                    onChange={() => handleCheckboxChange(emp)}
                  />
                  <div key={emp.empId} className={style.treeItemInfo}>
                    {emp.empName} ({emp.email})
                  </div>
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
                    <div
                      className={style.treeItem}
                      onClick={() => handleCheckboxChange(emp)}
                    >
                      <input
                        type="checkBox"
                        id={emp.empId}
                        className={`${style.treeItemToggle} ${style.treeCheckbox}`}
                        checked={checkedRcvList.some(
                          (item) => item.empId === emp.empId
                        )}
                        onChange={() => handleCheckboxChange(emp)}
                      />
                      <div key={emp.empId} className={style.treeItemInfo}>
                        {emp.empName} ({emp.email})
                      </div>
                    </div>
                  </>
                )
            )}
          {searchEmployeeList &&
            isSearchEmp > 0 &&
            searchEmployeeList.map((emp) => (
              <>
                <div
                  className={style.treeItem}
                  onClick={() => handleCheckboxChange(emp)}
                >
                  <input
                    type="checkBox"
                    id={emp.empId}
                    className={`${style.treeItemToggle} ${style.treeCheckbox}`}
                    checked={checkedRcvList.some(
                      (item) => item.empId === emp.empId
                    )}
                    onChange={() => handleCheckboxChange(emp)}
                  />
                  <div key={emp.empId} className={style.treeItemInfo}>
                    {emp.empName} ({emp.email})
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className={style.treebtnArea}>
          <Button onClickHandler={onAddRcvClickHadler}>수신</Button>
          <Button onClickHandler={onAddRcvRefClickHadler}>참조</Button>
          <Button onClickHandler={onAddRcvSecretRefClickHadler}>
            숨은참조
          </Button>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
