import { useCallback, useEffect, useMemo, useState } from "react";
import { loadTeamList } from "../../../http/deptteamHttp";
import Table from "../../../utils/Table";

export default function DepartmentList({
  selectedDeptId,
  setSelectedDeptId,
  token,
}) {
  const [data, setData] = useState();

  const memoizedloadTeamList = useCallback(loadTeamList, []);
  const memoizedParam = useMemo(() => {
    return { selectedDeptId, token };
  }, [selectedDeptId, token]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await memoizedloadTeamList(memoizedParam);
      setData(json.body);
    };

    fetchData();
  }, [memoizedloadTeamList, memoizedParam, setData]);

  const { body: teamList } = data || {};

  const columns = [
    { title: "팀ID", dataIndex: "tmId", key: "tmId", width: "50%" },
    {
      title: "팀명",
      dataIndex: "tmName",
      key: "tmName",
      width: "50%",
    },
  ];

  return (
    // <div>
    //   <h4>팀</h4>
    //   <div>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>팀ID</th>
    //           <th>팀명</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {teamList &&
    //           teamList.map((teamList) => (
    //             <tr key={teamList.tmId}>
    //               <td>{teamList.tmId}</td>
    //               <td>{teamList.tmName}</td>
    //               {/* <div>{teamList.}</div>
    //       <div>{teamList.}</div>
    //       <div>{teamList.}</div> */}
    //             </tr>
    //           ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <>
      {data && (
        <Table columns={columns} dataSource={data} rowKey={(dt) => dt.tmId} />
      )}
    </>
  );
}
