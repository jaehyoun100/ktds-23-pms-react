import { useCallback, useEffect, useMemo, useState } from "react";
import { loadTeamMemberList } from "../../../http/deptteamHttp";
import Table from "../../../utils/Table";

export default function TeamMemberList({ selectTmId, setSelectTmId, token }) {
  const [data, setData] = useState();
  const [selectTeamMemberId, setSelectTeamMemberId] = useState();

  const memoizedloadTeamMemberList = useCallback(loadTeamMemberList, []);
  const memoizedParam = useMemo(() => {
    return { selectTmId, token };
  }, [selectTmId, token]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await memoizedloadTeamMemberList(memoizedParam);
      setData(json.body);
    };

    fetchData();
  }, [memoizedloadTeamMemberList, memoizedParam, setData]);

  const columns = [
    {
      title: "팀원명",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "직급",
      dataIndex: "cmcdName",
      key: "cmcdName",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <>
      {data && (
        <Table columns={columns} dataSource={data} rowKey={(dt) => dt.empId} />
      )}
    </>
  );
}
