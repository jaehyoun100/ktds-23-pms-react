import { useCallback, useMemo, useRef, useState } from "react";
import Button from "../../common/Button/Button";
import style from "../Memo.module.css";
import { loadEmployeeSearch } from "../../../http/memoHttp";
import { loadData } from "../../../http/employeeHttp";
import { useFetch } from "../../hook/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { memoAddrAction } from "../../../store/toolkit/slice/memoAddrSlice";
import TextInput from "../../common/input/TextInput";
import { BsTrash3Fill } from "react-icons/bs";

export default function SearchBox() {
  const token = localStorage.getItem("token");
  const [needLoad, setNeedLoad] = useState();
  const searchRef = useRef(null);
  const searchInput = searchRef.current;
  const memoDispatch = useDispatch();
  const { searchEmployeeList } = useSelector((state) => state.receiverList);

  // 사원데이터
  const fetchLoadEmployee = useCallback(loadData, []);
  const fetchParam = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);
  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadEmployee,
    fetchParam
  );
  const { body: employees } = data || {};

  // 사원 검색
  const inputKeyword = async () => {
    const searchKeyword = searchInput.value;
    const searchEmpList = employees.filter((employee) =>
      employee.empName.toLowerCase().includes(searchKeyword)
    );
    memoDispatch(memoAddrAction.saveSearchEmpList({ searchEmpList }));
  };

  // 키워드 삭제
  const onResetSearchkeyword = () => {
    searchRef.current.value = "";
    memoDispatch(memoAddrAction.resetSearchEmpList());
  };

  return (
    <>
      <div className={style.saerchbox}>
        {/* <label htmlFor="searchArea">Search</label> */}
        <input
          type="text"
          id="searchArea"
          className={style.searchInput}
          defaultValue={""}
          ref={searchRef}
          onChange={inputKeyword}
        />
      </div>
      <Button onClickHandler={() => onResetSearchkeyword()}>
        <BsTrash3Fill />
      </Button>
    </>
  );
}
