import { useCallback, useEffect, useMemo, useState } from "react";
import { loadKnowledge } from "../../http/KnowledgeHttp";
import { deleteKnowledge } from "../../http/KnowledgeHttp";
import KnowledgeUpdate from "./KnowledgeUpdate";
import { KnowledgeRecommand } from "../../http/KnowledgeHttp";
import KnowledgeMainReply from "./Reply/KnowledgMainReply";
import "./knowleddgeview.css";

export default function KnowledgeView({
  selectedSplId,
  setSelectedSplId,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  const backToListHandler = () => {
    setSelectedSplId(undefined);
    setNeedReload(Math.random());
  };

  // 지식 관리 추천
  const recommendKnowledge = async () => {
    const json = await KnowledgeRecommand(selectedSplId, token);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  const memoizedLoadKnowledge = useCallback(loadKnowledge, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token, needReload };
  }, [selectedSplId, token, needReload]);
  console.log(memoizedParam);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const json = await memoizedLoadKnowledge(memoizedParam);
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [memoizedLoadKnowledge, memoizedParam, setData]);

  const { body: knowledgeBody } = data || {};
  console.log(knowledgeBody);

  // 글작성자만 수정 삭제 가능하도록 설정
  const { crtrId } = knowledgeBody || {};

  // 글작성자만  삭제 가능하도록 설정
  const deleteKnowledgeClickHandler = async () => {
    const json = await deleteKnowledge(knowledgeBody.knlId, token);

    if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    } else {
      console.log(json);
      alert(json.errors);
    }
  };

  // 글작성자만 수정  가능하도록 설정
  const UpdateClickHandler = () => {
    setIsUpdateMode(true);
  };

  return (
    <>
      {token && !isUpdateMode && (
        <div class="board-container">
          {knowledgeBody && (
            <div class="board-content">
              <div class="board-stats">
                <div class="board-views">
                  제목 <input type="text" defaultValue={knowledgeBody.knlTtl} />
                </div>
              </div>
              <div class="board-stats">
                <div class="board-views">
                  작성자
                  <input type="text" defaultValue={knowledgeBody.crtrId} />
                </div>
              </div>
              <div class="board-stats">
                <div class="board-views">
                  작성일{" "}
                  <input type="text" defaultValue={knowledgeBody.crtDt} />
                </div>
              </div>
              <div class="board-stats">
                <div class="board-views">
                  첨부파일
                  <input type="text" defaultValue={knowledgeBody.fileName} />
                </div>
              </div>
              <div class="board-stats">
                <div class="board-views">지식내용</div>
              </div>
              <textarea
                className="knowledge-form-textarea"
                defaultValue={knowledgeBody.knlCntnt}
              ></textarea>
              <div>
                <button onClick={recommendKnowledge}>추천하기</button>
                <button onClick={UpdateClickHandler}>수정</button>
                <button onClick={deleteKnowledgeClickHandler}>삭제</button>
                <button onClick={backToListHandler}>목록보기</button>
              </div>
              <span style={{ background: "#fff", padding: "0 10px" }}></span>
              <KnowledgeMainReply
                pPostId={selectedSplId}
                token={token}
                setSelectedSplId={setSelectedSplId}
                setNeedReload={setNeedReload}
                needReload={needReload}
              />
            </div>
          )}
        </div>
      )}
      {isUpdateMode && (
        <KnowledgeUpdate
          knowledgeBody={knowledgeBody}
          setNeedReload={setNeedReload}
          setIsUpdateMode={setIsUpdateMode}
          token={token}
        />
      )}
    </>
  );
}
