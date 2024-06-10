import { useCallback, useMemo, useState, useEffect } from "react";
import { loadknowledgeList } from "../../http/KnowledgeHttp";
import KnowledgeCreate from "./KnowledgeCreate";
import KnowledgeView from "./KnowledgeView";
import KnowledgeMainReply from "./Reply/KnowledgMainReply";

let pageNo = 0;
export default function KnowledgeMain() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [Knowledgelist, setKnowledge] = useState();
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
      setKnowledge(json);
      setNeedReload(false);
    };

    fetchingData();
  }, [memoizedLoadKnowLedgeList, memoizedToken]);

  const { body: Knowledge } = Knowledgelist || {};

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
          <div>
            <table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>내용</th>
                  <th>조회수</th>
                  <th>추천수</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {Knowledge &&
                  Knowledge.map((knowledgeItem) => (
                    <tr
                      key={knowledgeItem.knlId}
                      onClick={() => onRowClickHandler(knowledgeItem.knlId)}
                    >
                      <td>{knowledgeItem.knlTtl}</td>
                      <td>{knowledgeItem.crtrId}</td>
                      <td>{knowledgeItem.knlCntnt}</td>
                      <td>{knowledgeItem.knlCnt}</td>
                      <td>{knowledgeItem.knlRecCnt}</td>
                      <td>{knowledgeItem.crtDt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            
          </div>
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
