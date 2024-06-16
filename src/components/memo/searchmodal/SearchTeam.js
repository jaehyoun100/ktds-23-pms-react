import { useCallback, useMemo, useState } from "react";
import style from "../Memo.module.css";
import { loadTeamList } from "../../../http/deptteamHttp";
import { useFetch } from "../../hook/useFetch";
import { BsDot } from "react-icons/bs";

export default function SearchTeam({
  token,
  selectedDeptId,
  setSelectedTmId,
  onTeamClick,
}) {
  const [needTeamLoad, setNeedTeamLoad] = useState();
  // const [selectTmId, setSelectedTmId] = useState();

  // 팀목록
  const fetchLoadTeamList = useCallback(loadTeamList, []);
  const fetchTeamParam = useMemo(() => {
    return { selectedDeptId, token, needTeamLoad };
  }, [selectedDeptId, token, needTeamLoad]);
  const { data, setData } = useFetch(
    undefined,
    fetchLoadTeamList,
    fetchTeamParam
  );
  const { body: teamList } = data || {};

  const onClickHandler = (tmId) => {
    setSelectedTmId(tmId);
    // 부모로 전달
    onTeamClick(tmId);
  };

  return (
    <div className={style.searchListItems}>
      <div className={style.tree}>
        {teamList &&
          teamList.map((team) => (
            <div
              key={team.tmId}
              className={style.treeSubItem}
              onClick={() => onClickHandler(team.tmId)}
            >
              <div className={style.treeItemToggle}>
                <BsDot />
              </div>
              <div className={style.treeItemInfo}>{team.tmName}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
