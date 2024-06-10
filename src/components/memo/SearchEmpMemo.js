import { useCallback, useMemo, useRef, useState } from "react";
import Search from "../common/search/Search";
import { loadDepartmentList, loadTeamList } from "../../http/deptteamHttp";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";
import tree from "./testData";
import SearchTeam from "./SearchTeam";

export default function SearchEmpMemo() {
  const token = localStorage.getItem("token");
  const [needDeptLoad, setNeedDeptLoad] = useState();
  const [needTeamLoad, setNeedTeamLoad] = useState();
  const [selectedData, setSelectedData] = useState("Select Option");
  const optionList = [
    { label: "부서", value: "deptId" },
    { label: "팀", value: "tmId" },
    { label: "사원명", value: "empId" },
    { label: "이메일", value: "email" },
  ];
  const textRef = useRef(null);

  // 부서목록
  const fetchLoadDeptList = useCallback(loadDepartmentList, []);
  const fetchDeptParam = useMemo(() => {
    return { token, needDeptLoad };
  }, [token, needDeptLoad]);
  const { deptData, setDeptData } = useFetch(
    undefined,
    fetchLoadDeptList,
    fetchDeptParam
  );
  const { body: deptList } = deptData || {};
  // console.log(deptList);

  // 팀목록
  // const fetchLoadTeamList = useCallback(loadTeamList, []);
  // const fetchTeamParam = useMemo(() => {
  //   return { token, needTeamLoad };
  // }, [token, needTeamLoad]);
  // const { teamData, setTeamData } = useFetch(
  //   undefined,
  //   fetchLoadTeamList,
  //   fetchTeamParam
  // );
  // const { body: teamList } = teamData || {};
  // console.log(teamList);

  const onClickHandler = () => {
    const searchKeyword = textRef.current.value;
    // 주소록 찾기
  };

  return (
    <div>
      <div className="searchBar">
        <Search
          optionList={optionList}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          textRef={textRef}
          onClickHandler={onClickHandler}
        />
      </div>
      <div className={style.flex}>
        <div className="col-1-3">
          부서/팀
          <div>
            {/* {deptList &&
              deptList.map((dept) => (
                <div key={dept.deptId}>{dept.deptName}</div>
              ))} */}
            <div className={style.tree}>
              {tree.children.map((dept) => (
                <SearchTeam item={dept} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-1-3">사원</div>
        <div className="col-1-3">수신</div>
      </div>
    </div>
  );
}
