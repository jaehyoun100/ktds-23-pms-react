import { useCallback, useEffect, useMemo, useState } from "react";
import { loadTeamList } from "../../../http/deptteamHttp";
import Table from "../../../utils/Table";
import TeamMemberList from "./TeamMemberList.js";

export default function TeamList({
  selectedDeptId,
  token,
  setSelectTmId,
  selectTmId,
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

  const columns = [
    {
      title: "팀명",
      dataIndex: "tmName",
      key: "tmName",
    },
    {
      title: "팀장명",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
  ];

  const onTeamClick = (rowId) => {
    setSelectTmId((prevId) => (prevId === rowId ? undefined : rowId));
  };

  return (
    <>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(dt) => dt.tmId}
          onRow={(record) => {
            return {
              onClick: () => {
                onTeamClick(record.tmId);
              },
              style: { cursor: "pointer" },
            };
          }}
        />
      )}
      {selectTmId && (
        <div>
          <TeamMemberList
            selectTmId={selectTmId}
            setSelectTmId={setSelectTmId}
            token={token}
          />
        </div>
      )}
    </>
  );
}
