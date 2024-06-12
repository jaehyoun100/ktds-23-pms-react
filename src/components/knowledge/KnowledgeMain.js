import { useCallback, useMemo, useState, useEffect } from "react";
import { loadknowledgeList } from "../../http/KnowledgeHttp";
import KnowledgeCreate from "./KnowledgeCreate";
import KnowledgeView from "./KnowledgeView";
import Table from "../../utils/Table";

let pageNo = 0;
export default function KnowledgeMain() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [Knowledgelist, setKnowledge] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [needReload, setNeedReload] = useState();

  //토큰 정보를 받는다
  const token = localStorage.getItem("token");

  const isSelect = selectedSplId !== undefined;
  const memoizedLoadKnowLedgeList = useCallback(loadknowledgeList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadKnowLedgeList({ ...memoizedToken });
      setKnowledge(json.body);
      setNeedReload(false);
    };

    fetchingData();
  }, [memoizedLoadKnowLedgeList, memoizedToken]);

  const columns = [
    {
      title: "제목",
      dataIndex: "knlTtl",
      key: "knlTtl",
      // width: "20%"
    },
    {
      title: "작성자",
      dataIndex: "crtrId",
      key: "crtrId",
    },
    {
      title: "내용",
      dataIndex: "knlCntnt",
      key: "knlCntnt",
    },
    {
      title: "조회수",
      dataIndex: "knlCnt",
      key: "knlCnt",
    },
    {
      title: "추천수",
      dataIndex: "knlRecCnt",
      key: "knlRecCnt",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
    },
  ];

  const filterOptions = [
    {
      label: "제목",
      value: "knlTtl",
    },
    {
      label: "작성자",
      value: "crtrId",
    },
    {
      label: "내용",
      value: "knlCntnt",
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
            dataSource={Knowledgelist}
            rowKey={(dt) => dt.knlId}
            filter
            filterOptions={filterOptions}
            onRow={(record) => {
              return {
                onClick: () => {
                  onRowClickHandler(record.knlId);
                },
                style: { cursor: "pointer" },
              };
            }}
          />
          <button onClick={onCreateModeClickHandler}>신규등록</button>
        </>
      )}

      {token && isSelect && !isCreateMode && (
        <KnowledgeView
          selectedSplId={selectedSplId}
          setSelectedSplId={setSelectedSplId}
          setNeedReload={setNeedReload}
          needReload={needReload}
          token={token}
        />
      )}
      {isCreateMode && (
        <KnowledgeCreate
          setIsCreateMode={setIsCreateMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
    </>
  );
}
