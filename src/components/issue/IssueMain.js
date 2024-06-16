import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadIssueList } from "../../http/issueHttp";
import ViewIssue from "./ViewIssue";
import WriteIssue from "./WriteIssue";
import Table from "../../utils/Table";

let pageNo = 0;
export default function IssueMain() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [issuelist, setIssue] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [needReload, setNeedReload] = useState();

  //토큰 정보를 받는다
  const token = localStorage.getItem("token");

  const isSelect = selectedSplId !== undefined;
  const memoizedLoadKnowLedgeList = useCallback(loadIssueList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadKnowLedgeList({ ...memoizedToken });

      setIssue(json.body);
      setNeedReload(false);
    };

    fetchingData();
  }, [memoizedLoadKnowLedgeList, memoizedToken]);

  const columns = [
    {
      title: "제목",
      dataIndex: "isTtl",
      key: "isTtl",
    },
    {
      title: "이슈",
      dataIndex: "isId",
      key: "isId",
    },
    {
      title: "작성자",
      dataIndex: "crtrId",
      key: "crtrId",
    },
    {
      title: "담당자",
      dataIndex: "isMngr",
      key: "isMngr",
    },
    {
      title: "난이도",
      dataIndex: "isLv",
      key: "isLv",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
    },
    {
      title: "진행상태",
      dataIndex: ["isStsVO", "cmcdName"],
      key: "cmcdName",
    },
    {
      title: "내용",
      dataIndex: "isCntnt",
      key: "isCntnt",
    },
  ];

  const filterOptions = [
    {
      label: "내용",
      value: "isCntnt",
    },
    {
      label: "담당자",
      value: "isMngr",
    },
    {
      label: "제목",
      value: "isTtl",
    },
    {
      label: "진행상태",
      value: ["isStsVO", "cmcdName"],
    },
  ];

  // 상세보기 페이지
  const onRowClickHandler = (rowId) => {
    setSelectedSplId(rowId);
  };

  const onCreateModeClickHandler = () => {
    setIsCreateMode(true);
  };

  return (
    <>
      {token && !isSelect && !isCreateMode && (
        <>
          <Table
            columns={columns}
            dataSource={issuelist}
            rowKey={(dt) => dt.isId}
            filter
            filterOptions={filterOptions}
            onRow={(record) => {
              return {
                onClick: () => {
                  onRowClickHandler(record.isId);
                },
                style: { cursor: "pointer" },
              };
            }}
          />
          <button onClick={onCreateModeClickHandler}>이슈 등록</button>
        </>
      )}

      {token && isSelect && !isCreateMode && (
        <ViewIssue
          selectedSplId={selectedSplId}
          setSelectedSplId={setSelectedSplId}
          setNeedReload={setNeedReload}
          needReload={needReload}
          token={token}
        />
      )}
      {isCreateMode && (
        <WriteIssue
          setIsCreateMode={setIsCreateMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
    </>
  );
}
