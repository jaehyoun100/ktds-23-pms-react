import { useRef } from "react";
import { createNewKnowledgeReply } from "../../../http/KnowledgeReplyHttp";

import "../knowleddgeview.css";

export default function KnowledgeReplyWrite(
  { pPostId, token, setSelectedSplId, setNeedReload },
  setIsLoading
) {
  const ReplyRef = useRef();

  const onSaveClickHandler = async () => {
    const content = ReplyRef.current.value;

    if (!content) {
      alert("내용을 입력해 주세요");
    }

    const json = await createNewKnowledgeReply(content, pPostId, token);
    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    }
  };

  return (
    <div>
      <div class="board-comment">
        <textarea
          class="comment-input"
          placeholder="내용을 입력해주세요"
          ref={ReplyRef}
        ></textarea>
        <button class="btn-submit" onClick={onSaveClickHandler}>
          등록
        </button>
      </div>
    </div>
  );
}
