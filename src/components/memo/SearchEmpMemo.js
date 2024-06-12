import { useCallback, useMemo, useRef, useState } from "react";
import Search from "../common/search/Search";
import { loadDepartmentList } from "../../http/deptteamHttp";
import { useFetch } from "../hook/useFetch";
import style from "./Memo.module.css";
import SearchTeam from "./SearchTeam";
import { BsFolder, BsFolder2Open, BsDashSquare } from "react-icons/bs";
import SearchEmployee from "./SearchEmployee";
import SearchAddReceiver from "./SearchAddReceiver";

export default function SearchEmpMemo() {
  const token = localStorage.getItem("token");
  const [needDeptLoad, setNeedDeptLoad] = useState();
  const [selectedData, setSelectedData] = useState("Select Option");
  const optionList = [
    { label: "부서", value: "deptId" },
    { label: "팀", value: "tmId" },
    { label: "사원명", value: "empId" },
    { label: "이메일", value: "email" },
  ];

  const textRef = useRef(null);

  const [openedDeptId, setOpenedDeptId] = useState(null);
  const [selectedDeptId, setSelectedDeptId] = useState();
  const [selectTmId, setSelectedTmId] = useState();

  // 부서목록
  const fetchLoadDeptList = useCallback(loadDepartmentList, []);
  const fetchDeptParam = useMemo(() => {
    return { token, needDeptLoad };
  }, [token, needDeptLoad]);
  const { data, setData } = useFetch(
    undefined,
    fetchLoadDeptList,
    fetchDeptParam
  );
  const { body: deptList } = data || {};

  const onClickHandler = () => {
    const searchKeyword = textRef.current.value;
    // 주소록 찾기
  };

  const onOpenClickHandler = (deptId) => {
    setSelectedDeptId(deptId);
    setOpenedDeptId(deptId === openedDeptId ? null : deptId);
    setSelectedTmId("");
  };

  // 자식에서 teamId 전달
  const onTeamClick = (teamId) => {
    setSelectedTmId(teamId);
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
          <div className="searchTitle">부서/팀</div>
          <div>
            <div className={style.tree}>
              {deptList &&
                deptList.map((dept) => (
                  <>
                    <div
                      key={dept.deptId}
                      className={style.treeItem}
                      onClick={() => onOpenClickHandler(dept.deptId)}
                    >
                      {dept &&
                        (openedDeptId === dept.deptId ? (
                          <>
                            <BsFolder2Open />
                          </>
                        ) : (
                          <BsFolder />
                        ))}
                      {dept.deptName}
                    </div>
                    <div>
                      {dept && openedDeptId === dept.deptId && (
                        <>
                          <SearchTeam
                            token={token}
                            selectedDeptId={selectedDeptId}
                            onTeamClick={onTeamClick}
                            setSelectedTmId={setSelectedTmId}
                          />
                        </>
                      )}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className="col-1-3">
          <div className="searchTitle">사원</div>
          <SearchEmployee
            token={token}
            selectedDeptId={selectedDeptId}
            selectTmId={selectTmId}
          />
        </div>
        <div className="col-1-3">
          <div className="searchTitle">수신</div>
          <SearchAddReceiver />
        </div>
      </div>
    </div>
  );
}
