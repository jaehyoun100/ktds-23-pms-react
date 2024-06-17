import { useRef } from "react";
import { createNewKnowledgeReply } from "../../../http/KnowledgeReplyHttp";
import styles from "../knowleddgeview.module.css";
import KnowledgeMainReply from "./KnowledgMainReply";

export default function KnowledgeReplyWrite(
  { pPostId, token, setSelectedSplId, setNeedReload },
  setIsLoading
) {
  const ReplyRef = useRef();

  const onSaveClickHandler = async (event) => {
    const content = ReplyRef.current.value;

    if (!content) {
      event.preventDefault();
      alert("내용을 입력해 주세요");
      return;
    }

    const json = await createNewKnowledgeReply(content, pPostId, token);
    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random()); // Can be used if necessary
    }
  };

  return (
    <div className={styles.commentform}>
      <form>
        <label for="comment">댓글:</label>
        <textarea
          id="comment"
          placeholder="내용을 입력해주세요"
          ref={ReplyRef}
        ></textarea>

        <button type="button" onClick={onSaveClickHandler}>
          등록
        </button>
      </form>
    </div>
  );
}
