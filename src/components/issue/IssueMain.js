import { useCallback, useMemo, useState, useEffect } from "react";
import { loadIssueList } from "../../http/issueHttp";
import { useNavigate } from "react-router-dom";

let pageNo = 0;
export default function IssueMain() {
  const [issue, setIsuue] = useState();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const onIsCreateHandler = () => {
    navigate("/issue/write");
  };

  //이슈 리스트
  useEffect(
    () => {
      const getIssueList = async () => {
        const json = await loadIssueList(token);
        setIsuue(json);
      };

      getIssueList();
    },
    { token }
  );

  const { count, body: data } = issue || {};

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩
  }

  //테이블 칼럼
  const columns = [
    {
      title: "요구사항",
      dataIndex: ["requirementVO", "rqmTtl"],
      key: "rqmTtl",
    },
    {
      title: "제목",
      dataIndex: "isTtl",
      key: "isTtl",
      width: "20%",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={() => navigate(``)} />
      ),
    },
    {
      title: "작성자",
      dataIndex: ["crtrIdVO", "empName"],
    },
  ];

  return <div></div>;
}
