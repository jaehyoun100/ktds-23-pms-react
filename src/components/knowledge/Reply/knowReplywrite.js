import { useRef, useState, useEffect } from "react";
import { createNewKnowledgeReply } from "../../../http/KnowledgeReplyHttp";
import styles from "../knowleddgeview.module.css";
import KnowledgeMainReply from "./KnowledgMainReply";

export default function KnowledgeReplyWrite(
  { pPostId, token, setSelectedSplId, setNeedReload, needReload },
  setIsLoading
) {
  const ReplyRef = useRef();
  const [isReplying, setIsReplying] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [replies, setReplies] = useState([]);

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
      // Update replies state with new reply data
      setReplies((prevReplies) => [...prevReplies, json.body]);
      setIsUpdateMode(true); // Trigger re-render for UI update
      ReplyRef.current.value = "";
      setIsReplying(true);
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
