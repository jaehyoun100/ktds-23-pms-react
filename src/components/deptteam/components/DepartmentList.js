import { useCallback, useEffect, useMemo, useState } from "react";
import { loadDepartmentList } from "../../../http/deptteamHttp.js";
import TeamList from "./TeamList.js";

export default function DepartmentList({ token }) {
  const [selectedDeptId, setSelectedDeptId] = useState();
  const [needReload, setNeedReload] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isSelect = selectedDeptId !== undefined;
  // departmentList;
  const memoizedLoaddepartmentList = useCallback(loadDepartmentList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoaddepartmentList({ ...memoizedToken });
      setData(json);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoaddepartmentList, memoizedToken]);

  const { count, pages, next } = data || {};
  const { body: departmentList } = data || {};

  const onDepartmentClick = (rowId) => {
    setSelectedDeptId(rowId);
  };

  return (
    <>
      <div>
        <h4>부서</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>부서ID</th>
                <th>부서명</th>
              </tr>
            </thead>
            <tbody>
              {departmentList &&
                departmentList.map((department) => (
                  <tr
                    key={department.deptId}
                    onClick={() => onDepartmentClick(department.deptId)}
                  >
                    <td>{department.deptId}</td>
                    <td>{department.deptName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedDeptId && (
        <TeamList
          selectedDeptId={selectedDeptId}
          setSelectedDeptId={setSelectedDeptId}
          needReload={needReload}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
    </>
  );
}
