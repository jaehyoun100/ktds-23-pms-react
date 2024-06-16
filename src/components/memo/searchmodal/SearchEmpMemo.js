import { useCallback, useMemo, useRef, useState } from "react";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { loadDepartmentList } from "../../../http/deptteamHttp";
import { useFetch } from "../../hook/useFetch";
import SearchTeam from "./SearchTeam";
import style from "../Memo.module.css";
import SearchEmployee from "./SearchEmployee";
import SearchAddReceiver from "./SearchAddReceiver";
import Search from "antd/es/input/Search";
import SearchBox from "./SearchBox";

export default function SearchEmpMemo() {
  const token = localStorage.getItem("token");
  const [needDeptLoad, setNeedDeptLoad] = useState();

  const textRef = useRef(null);

  const [openedDeptId, setOpenedDeptId] = useState(null);
  const [selectedDeptId, setSelectedDeptId] = useState();
  const [selectTmId, setSelectedTmId] = useState();
  const [isAllCheckedEmp, setIsAllCheckedEmp] = useState(false);

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

  const handleCheckboxChange = () => {
    setIsAllCheckedEmp(!isAllCheckedEmp);
  };

  return (
    <div className={style.modalBodyContainer}>
      <div className={`${style.contentGridTwo} ${style.heightFull}`}>
        <div className={style.searchBar}>
          <SearchBox />
          {/* <Search
            optionList={optionList}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            textRef={textRef}
            onClickHandler={onClickHandler}
          /> */}
        </div>
        <div className={style.modalBodyListSearch}>
          <div className={style.contentGridOne}>
            <div className={style.searchListContent}>
              <div className={`${style.oneSearchList}`}>
                <div className={style.searchListTitle}>부서/팀</div>
                <div className={style.searchListItemsWraps}>
                  <div className={style.searchListItems}>
                    <div className={style.tree}>
                      {deptList &&
                        deptList.map((dept) => (
                          <>
                            <div
                              key={dept.deptId}
                              className={style.treeItem}
                              onClick={() => onOpenClickHandler(dept.deptId)}
                            >
                              <div className={style.treeItemToggle}>
                                {dept &&
                                  (openedDeptId === dept.deptId ? (
                                    <BsChevronDown />
                                  ) : (
                                    <BsChevronRight />
                                  ))}
                              </div>
                              <div className={style.treeItemInfo}>
                                {dept.deptName}
                              </div>
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
              </div>
            </div>
            <div className={style.searchListContent}>
              <div className={`${style.oneSearchList}`}>
                <div className={style.searchListTitle}>
                  <div className={style.allCheck}>
                    <input
                      type="checkBox"
                      className={`${style.treeItemToggle} ${style.treeCheckbox}`}
                      checked={isAllCheckedEmp}
                      onChange={() => handleCheckboxChange()}
                    />
                  </div>
                  사원
                </div>
                <div className={style.searchListItemsWrapsEmp}>
                  <SearchEmployee
                    token={token}
                    selectedDeptId={selectedDeptId}
                    setSelectedDeptId={setSelectedDeptId}
                    selectTmId={selectTmId}
                    isAllCheckedEmp={isAllCheckedEmp}
                    setIsAllCheckedEmp={setIsAllCheckedEmp}
                  />
                </div>
              </div>
            </div>
            <div className={style.searchListContent}>
              <div className={`${style.oneSearchList}`}>
                <div className={style.searchListTitle}>수신</div>
                <div className={style.searchListItemsWrapsRcv}>
                  <div
                    className={`${style.searchListItems} ${style.heightFull}`}
                  >
                    <SearchAddReceiver />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
