import { useCallback, useEffect, useMemo, useState } from "react";
import { loadTeamList } from "../../../http/deptteamHttp";

export default function DepartmentList({
  selectedDeptId,
  setSelectedDeptId,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const memoizedloadTeamList = useCallback(loadTeamList, []);
  const memoizedParam = useMemo(() => {
    return { selectedDeptId, token, needReload };
  }, [selectedDeptId, token, needReload]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const json = await memoizedloadTeamList(memoizedParam);
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [memoizedloadTeamList, memoizedParam, setData]);

  const { body: teamList } = data || {};
  console.log(teamList);
  return (
    <div>
      <h4>팀</h4>
      <div>
        <table>
          <thead>
            <tr>
              <th>팀ID</th>
              <th>팀명</th>
            </tr>
          </thead>
          <tbody>
            {teamList &&
              teamList.map((teamList) => (
                <tr key={teamList.tmId}>
                  <td>{teamList.tmId}</td>
                  <td>{teamList.tmName}</td>
                  {/* <div>{teamList.}</div>
          <div>{teamList.}</div>
          <div>{teamList.}</div> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
