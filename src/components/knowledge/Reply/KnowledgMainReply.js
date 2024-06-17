import { useEffect, useState, useRef } from "react";
import {
  loadKnowledgeReply,
  updateKnowledgeReply,
} from "../../../http/KnowledgeReplyHttp";
import KnowledgeReplyWrite from "./knowReplywrite";
import { deleteKnowledgeReply } from "../../../http/KnowledgeReplyHttp";
import { replyRecommand } from "../../../http/KnowledgeReplyHttp";
import styles from "../knowleddgeview.module.css";
import { createNewreReply } from "../../../http/KnowledgeReplyHttp";
import { loadKnowledgereReply } from "../../../http/KnowledgeReplyHttp";

export default function KnowledgeMainReply(
  { pPostId, token, setSelectedSplId, setNeedReload },
  needReload
) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState([]); // 댓글 데이터 상태 변수
  const [selectedReplies, setSelectedReplies] = useState([]); // State to store selected reply IDs
  const [isEditing, setIsEditing] = useState({}); // Object to store edit state for each comment
  const [isReplying, setIsReplying] = useState({});
  const [subReplies, setSubReplies] = useState({});
  const [isViewingReplies, setIsViewingReplies] = useState({});
  const [isEditingSubReply, setIsEditingSubReply] = useState({});
  const [isShowAnswer, setIsShowAnswer] = useState(true);
  const [isRecommanded, setIsRecommanded] = useState({});
  const contentref = useRef();
  const rplIdRef = useRef();
  const subReplyRef = useRef();
  const subReplyEditRef = useRef();

  //취소
  const cancelsave = () => {
    setIsEditing({});
  };

  // 답변 작성글 취소
  const reReplycancelsave = () => {
    setIsReplying({});
  };

  // 답변 취소
  const cancelsaveSubReply = () => {
    setIsEditingSubReply({});
  };

  const deleteKnowledgeReplyClickHandler = async (replyItem) => {
    const str = replyItem.rplId;
    const json = await deleteKnowledgeReply(str, token);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
        return;
      });
    } else {
      alert("삭제에 성공하였습니다");
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  //댓글 추천
  const RecommandReply = async (replyItem) => {
    const str = replyItem.rplId;
    try {
      const json = await replyRecommand(str, token);
      if (json.body == false) {
        alert(" 이미 추천되었습니다");
      }

      // 추천 여부 업데이트
      setIsRecommanded({
        ...isRecommanded,
        [replyItem.rplId]: true,
      });
      return;
    } catch (error) {
      console.error("Error recommending reply:", error);
    }
  };

  const handleEditComment = async (e, replyItem) => {
    e.preventDefault();
    const content = contentref.current.value;
    const str = replyItem.rplId;

    const json = await updateKnowledgeReply(content, str, token);

    if (json.errors) {
      alert("수정에 실패해습니다");
      return;
    } else if (json.body) {
      alert("수정이 완료되었습니다");
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  const fetchSubreReplies = async (rplId) => {
    const json = await loadKnowledgereReply(rplId, token);
    if (!json.errors) {
      setSubReplies((prevSubReplies) => ({
        ...prevSubReplies,
        [rplId]: json.body || [],
      }));
    }
  };

  // 대답 화면 뛰우기
  const handleReplyClick = (replyItem) => {
    setIsReplying({ ...isReplying, [replyItem.rplId]: true });
  };

  const handleClick = (replyItem) => {
    console.log(replyItem.rplId);
    setIsViewingReplies({ ...isViewingReplies, [replyItem.rplId]: true });
    fetchSubreReplies(replyItem.rplId);
  };

  // 답변 추가
  const handleAddSubReply = async (e, replyItem) => {
    e.preventDefault();
    const replyContent = subReplyRef.current.value;
    const str = replyItem.rplId;

    const json = await createNewreReply(pPostId, str, replyContent, token);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
      return;
    } else if (json.body) {
      alert("답변이 추가되었습니다");
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  // 답변삭제
  const deleteReply = async (subReply) => {
    const json = await deleteKnowledgeReply(subReply.rplId, token);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
        return;
      });
    } else {
      alert("삭제에 성공하였습니다");
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  // 답변 보기 닫기 버튼
  const handlCancelClick = () => {
    if (isShowAnswer == true) {
      setIsShowAnswer(isShowAnswer);
      setSubReplies({});
    }
  };

  // 답변 수정
  const handleEditSubReply = async (e, subReply) => {
    e.preventDefault();
    const content = subReplyEditRef.current.value;
    const str = subReply.rplId;

    const json = await updateKnowledgeReply(content, str, token);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      alert("수정이 완료되었습니다");
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await loadKnowledgeReply({ pPostId, token });
      setData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [pPostId, token]);

  const { body: knowledgeReplyBody } = data || {};

  return (
    <div className={styles.commentinputareas}>
      <KnowledgeReplyWrite
        pPostId={pPostId}
        token={token}
        setSelectedSplId={setSelectedSplId}
        setNeedReload={setNeedReload}
      />
      <div className={styles.commentlist}>
        {token && (
          <>
            {knowledgeReplyBody &&
              knowledgeReplyBody.map(
                (replyItem) =>
                  replyItem.rplPid === null && (
                    <div class={styles.commentlist}>
                      <input
                        type="number"
                        className={styles.inputbox}
                        name="selectedReplies"
                        defaultValue={replyItem.rplId}
                        ref={rplIdRef}
                      />
                      <div class={styles.comment}>
                        <div class={styles.commentauthor}>
                          {replyItem.crtrId} {replyItem.crtDt}
                        </div>
                        <div class={styles.commentcontent}>
                          조회수: {replyItem.rplcnt}
                        </div>
                        <div class={styles.commentcontent}>
                          {replyItem.rplCntnt}
                        </div>

                        <div class={styles.commentbuttons}>
                          <button
                            type="button"
                            onClick={() =>
                              setIsEditing({
                                ...isEditing,
                                [replyItem.rplId]: true,
                              })
                            }
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              deleteKnowledgeReplyClickHandler(replyItem)
                            }
                          >
                            삭제
                          </button>
                          <button
                            type="button"
                            onClick={() => RecommandReply(replyItem)}
                            className={
                              isRecommanded[replyItem.rplId]
                                ? styles.recommandedButton
                                : styles.defaultButton
                            }
                          >
                            추천
                          </button>
                          <button onClick={() => handleReplyClick(replyItem)}>
                            답변
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClick(replyItem)}
                          >
                            답변 보기
                          </button>
                        </div>
                      </div>
                      {isShowAnswer && (
                        <button type="button" onClick={handlCancelClick}>
                          답변 숨기기
                        </button>
                      )}

                      {isEditing[replyItem.rplId] && (
                        <td>
                          <form
                            className={styles.commentform}
                            onSubmit={(e) => handleEditComment(e, replyItem)}
                          >
                            <textarea
                              type="text"
                              defaultValue={replyItem.rplCntnt}
                              ref={contentref}
                            />

                            <button type="submit" className={styles.button}>
                              저장
                            </button>
                            <button
                              onClick={cancelsave}
                              className={styles.button}
                            >
                              취소
                            </button>
                            <div></div>
                          </form>
                        </td>
                      )}

                      {isReplying[replyItem.rplId] && (
                        <div>
                          <form
                            className={styles.commentform}
                            onSubmit={(e) => handleAddSubReply(e, replyItem)}
                          >
                            <textarea
                              type="text"
                              placeholder="재댓글을 입력하세요"
                              ref={subReplyRef}
                            />
                            <button type="submit">작성</button>
                            <button
                              onClick={reReplycancelsave}
                              className={styles.button}
                            >
                              취소
                            </button>
                          </form>
                        </div>
                      )}
                      {subReplies &&
                        Array.isArray(subReplies[replyItem.rplId]) &&
                        subReplies[replyItem.rplId].map((subReply) => (
                          <div class={styles.commentlist}>
                            <input
                              type="number"
                              className={styles.inputbox}
                              name="selectedReplies"
                              defaultValue={replyItem.rplId}
                              ref={rplIdRef}
                            />
                            <div class={styles.comment}>
                              <div class={styles.commentauthor}>
                                {subReply.crtrId} {subReply.crtDt}
                              </div>
                              <div class={styles.commentcontent}>
                                {subReply.rplCntnt}
                              </div>
                              <div className={styles.commentcontent}>
                                {isEditingSubReply[subReply.rplId] ? (
                                  <form
                                    onSubmit={(e) =>
                                      handleEditSubReply(e, subReply)
                                    }
                                  >
                                    <textarea
                                      name="subReplyContent"
                                      defaultValue={subReply.rplCntnt}
                                      ref={subReplyEditRef}
                                    />
                                    <button
                                      type="submit"
                                      className={styles.button}
                                    >
                                      저장
                                    </button>
                                    <button
                                      onClick={cancelsaveSubReply}
                                      type="button"
                                    >
                                      취소
                                    </button>
                                  </form>
                                ) : (
                                  <div></div>
                                )}
                              </div>

                              <div class={styles.commentbuttons}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsEditingSubReply({
                                      ...isEditingSubReply,
                                      [subReply.rplId]: true,
                                    })
                                  }
                                >
                                  수정
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteReply(subReply)}
                                >
                                  삭제
                                </button>
                              </div>
                            </div>

                            {isViewingReplies[replyItem.rplId] &&
                              subReplies[replyItem.rplId] &&
                              Array.isArray(subReplies[replyItem.rplId]) &&
                              subReplies[replyItem.rplId].map((subReply) => (
                                <div
                                  className={styles.commentlist}
                                  key={subReply.rplId}
                                ></div>
                              ))}
                          </div>
                        ))}
                    </div>
                  )
              )}
          </>
        )}
      </div>
    </div>
  );
}
