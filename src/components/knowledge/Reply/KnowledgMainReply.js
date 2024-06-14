import { useEffect, useState, useRef } from "react";
import {
  loadKnowledgeReply,
  updateKnowledgeReply,
} from "../../../http/KnowledgeReplyHttp";
import KnowledgeReplyWrite from "./knowReplywrite";
import { deleteKnowledgeReply } from "../../../http/KnowledgeReplyHttp";
import { replyRecommand } from "../../../http/KnowledgeReplyHttp";
import styles from "../knowleddgeview.module.css";

export default function KnowledgeMainReply(
  { pPostId, token, setSelectedSplId, setNeedReload },
  needReload
) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState([]); // 댓글 데이터 상태 변수
  const [selectedReplies, setSelectedReplies] = useState([]); // State to store selected reply IDs
  const [isEditing, setIsEditing] = useState({}); // Object to store edit state for each comment
  const contentref = useRef();

  const canEditOrDelete = (replyItem, userId) => {
    // Check if the current user (identified by userId) is the creator (crtrId) of the comment
    return replyItem.crtrId === userId;
  };

  //취소
  const cancelsave = () => {
    setIsEditing({});
  };

  // 댓글 번호 출력
  const handleCheckboxChange = (event) => {
    const rplId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedReplies([...selectedReplies, rplId]);
    } else {
      setSelectedReplies(selectedReplies.filter((id) => id !== rplId));
    }
  };

  //  댓글 번호 출력 후 삭제 진행
  const deleteKnowledgeReplyClickHandler = async () => {
    if (selectedReplies.length === 0) {
      // Handle no replies selected case (e.g., display an alert)
      alert("체크박스를 선택 입력하세요");
      return;
    } else {
      //obect를 String으로 변환
      const str = selectedReplies.toString();
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
    }
  };

  //댓글 추천
  const RecommandReply = async () => {
    if (selectedReplies.length === 0) {
      // Handle no replies selected case (e.g., display an alert)
      alert("체크박스를 선택 입력하세요");
      return;
    } else {
      const str = selectedReplies.toString();
      const json = await replyRecommand(str, token);

      if (json.errors) {
        json.errors.forEach((error) => {
          alert(error);
          return;
        });
      } else if (json.body) {
        alert("추천에 성공하였습니다");
        setSelectedSplId(undefined);
        setNeedReload(Math.random());
      }
    }
  };

  const handleEditComment = async (e, replyItem) => {
    e.preventDefault();
    if (selectedReplies.length === 0) {
      // Handle no replies selected case (e.g., display an alert)
      alert("체크박스를 선택 입력하세요");
      return;
    }

    const content = contentref.current.value;
    const str = selectedReplies.toString();

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

  useEffect(() => {
    // You can now use the `token` prop here
    console.log("Token:", token);
    console.log("pPostId:", pPostId);
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
    <>
      <>
        <div className={styles.registrationform}>
          <KnowledgeReplyWrite
            pPostId={pPostId}
            token={token}
            setSelectedSplId={setSelectedSplId}
            setNeedReload={setNeedReload}
          />
        </div>
      </>

      {token && (
        <>
          {knowledgeReplyBody &&
            knowledgeReplyBody.map((replyItem) => (
              <div class={styles.commentlist}>
                <div class={styles.comment}>
                  <div class={styles.commentauthor}>
                    {replyItem.crtrId} {replyItem.crtDt}
                  </div>
                  <div class={styles.commentcontent}>
                    <input
                      type="checkbox"
                      name="selectedReplies"
                      value={replyItem.rplId}
                      onChange={handleCheckboxChange}
                    />
                    {replyItem.rplCntnt}
                  </div>
                  <div class={styles.commentbuttons}>
                    <button
                      class={styles.commentbutton}
                      onClick={() =>
                        setIsEditing({ ...isEditing, [replyItem.rplId]: true })
                      }
                    >
                      수정
                    </button>
                    <button
                      class={styles.commentbutton}
                      onClick={deleteKnowledgeReplyClickHandler}
                    >
                      삭제
                    </button>
                    <button
                      class={styles.commentbutton}
                      onClick={RecommandReply}
                    >
                      추천
                    </button>
                  </div>
                </div>
                {isEditing[replyItem.rplId] && (
                  <td>
                    <form
                      className={styles.viewpage}
                      onSubmit={(e) => handleEditComment(e, replyItem)}
                    >
                      <textarea
                        type="text"
                        defaultValue={replyItem.rplCntnt}
                        className="knowledge-form-textarea"
                        ref={contentref}
                      />

                      <button type="submit">저장</button>
                      <button onClick={cancelsave}>취소</button>
                    </form>
                  </td>
                )}
              </div>
            ))}
        </>
      )}
    </>
  );
}
