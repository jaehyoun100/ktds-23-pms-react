import { useCallback, useEffect, useMemo, useState } from "react";
import { loadKnowledge } from "../../http/KnowledgeHttp";
import { deleteKnowledge } from "../../http/KnowledgeHttp";
import KnowledgeUpdate from "./KnowledgeUpdate";
import { KnowledgeRecommand } from "../../http/KnowledgeHttp";
import KnowledgeMainReply from "./Reply/KnowledgMainReply";
import styles from "./knowleddgeview.module.css";

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

  const UpdateClickHandler = () => {
    setIsUpdateMode(true);
  };

  return (
    <>
      {token && !isUpdateMode && (
        <div className={styles.viewpage}>
          {knowledgeBody && (
            <>
              <div className={styles.knowledgeinfo}>
                <button type="button" onClick={backToListHandler}>
                  뒤로 가기
                </button>
                <div className={styles.knowledgecardheader}>
                  <h4>{knowledgeBody.knlTtl}</h4>
                  <div className={styles.knowledgecardinfo}>
                    <p style={{ display: "inline-block" }}>
                      작성자: {knowledgeBody.crtrId}
                    </p>
                    <p style={{ display: "inline-block", marginLeft: "10px" }}>
                      작성일: {knowledgeBody.crtDt}
                    </p>
                    {knowledgeBody.fileName && (
                      <p
                        style={{ display: "inline-block", marginLeft: "10px" }}
                      >
                        첨부파일: {knowledgeBody.fileName}
                      </p>
                    )}
                    {!knowledgeBody.fileName && (
                      <p
                        style={{ display: "inline-block", marginLeft: "10px" }}
                      >
                        첨부파일이 없습니다
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.knowledgecontent}>
                  <p>{knowledgeBody.knlCntnt}</p>
                </div>

                <div className={styles.buttongroup}>
                  <button type="button" onClick={UpdateClickHandler}>
                    수정
                  </button>
                  <button type="button" onClick={deleteKnowledgeClickHandler}>
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={recommendKnowledge}
                    className={
                      isRecommended ? styles.recommendedButton : styles.button
                    } // Apply different styles based on state
                  >
                    추천 {knowledgeBody.knlRecCnt}
                  </button>
                </div>
              </div>

              <div className={styles.commentinputareas}>
                <KnowledgeMainReply
                  pPostId={selectedSplId}
                  token={token}
                  setSelectedSplId={setSelectedSplId}
                  setNeedReload={setNeedReload}
                  needReload={needReload}
                />
              </div>
            </>
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
