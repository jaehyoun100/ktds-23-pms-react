import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

const Modal = ({ content, onConfirm, onCancel }) => (
  <div className="modal">
    <p>{content}</p>
    <button onClick={onConfirm}>확인</button>
    <button onClick={onCancel}>취소</button>
  </div>
);

const IssueDetails = ({ issueId }) => {
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [replyMode, setReplyMode] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [modal, setModal] = useState({
    visible: false,
    content: "",
    onConfirm: () => {},
  });
  const history = useHistory();

  useEffect(() => {
    loadReplies(issueId);
  }, [issueId]);

  const loadReplies = async (issueId) => {
    try {
      const response = await fetch(`/ajax/issue/reply/${issueId}`);
      const data = await response.json();
      setReplies(data.issueReplies);
    } catch (error) {
      console.error("Error loading replies:", error);
    }
  };

  const handleReplySubmit = async () => {
    if (replyContent.trim() === "") return;

    const body = { rplCntnt: replyContent.trim() };
    let url = `/ajax/issue/reply/${issueId}`;

    if (replyMode === "re-reply") {
      body.rplPid = replyTarget;
    }

    if (replyMode === "modify") {
      url = `/ajax/issue/reply/modify/${replyTarget}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.result) {
        loadReplies(issueId);
        setReplyContent("");
        setReplyMode("");
        setReplyTarget(null);
      } else {
        alert("댓글을 등록할 수 없습니다. 잠시 후 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDeleteReply = (replyId) => {
    setModal({
      visible: true,
      content: "댓글을 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          const response = await fetch(`/ajax/issue/reply/delete/${replyId}`);
          const data = await response.json();
          if (data.result) {
            loadReplies(issueId);
            setReplyContent("");
          }
        } catch (error) {
          console.error("Error deleting reply:", error);
        }
        setModal({ visible: false, content: "", onConfirm: () => {} });
      },
    });
  };

  const handleModifyReply = (reply) => {
    setReplyContent(reply.rplCntnt);
    setReplyMode("modify");
    setReplyTarget(reply.rplId);
  };

  const handleReReply = (replyId) => {
    setReplyMode("re-reply");
    setReplyTarget(replyId);
    setReplyContent("");
  };

  const handleIssueDelete = () => {
    setModal({
      visible: true,
      content: "이 게시글을 정말 삭제하시겠습니까?",
      onConfirm: () => {
        history.push(`/issue/delete/${issueId}`);
      },
    });
  };

  return (
    <div>
      {modal.visible && (
        <Modal
          content={modal.content}
          onConfirm={modal.onConfirm}
          onCancel={() =>
            setModal({ visible: false, content: "", onConfirm: () => {} })
          }
        />
      )}

      <div className="reply-items">
        {replies.map((reply) => (
          <div
            key={reply.rplId}
            className="reply"
            style={{
              paddingLeft: `${(reply.level - 1) * 40}px`,
              color: reply.delYn === "Y" ? "#F33" : "#333",
            }}
          >
            <div className="author">{reply.employeeVO.empName}</div>
            <div className="datetime">
              <span className="crtdt">등록: {reply.crtDt}</span>
              {reply.mdfDt && (
                <span className="mdfDt">(수정: {reply.mdfDt})</span>
              )}
            </div>
            <div className="contents">
              {reply.delYn === "Y" ? "삭제된 댓글입니다." : reply.rplCntnt}
            </div>
            {reply.delYn !== "Y" && (
              <div className="control">
                <span
                  className="re-reply"
                  onClick={() => handleReReply(reply.rplId)}
                >
                  답변하기
                </span>
                {reply.crtrId ===
                  document.getElementById("login-email").innerText && (
                  <>
                    <span
                      className="modify-reply"
                      onClick={() => handleModifyReply(reply)}
                    >
                      수정
                    </span>
                    <span
                      className="delete-reply"
                      onClick={() => handleDeleteReply(reply.rplId)}
                    >
                      삭제
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <textarea
        id="txt-reply"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      />
      <button id="btn-save-reply" onClick={handleReplySubmit}>
        댓글 등록
      </button>
      <button
        id="btn-cancel-reply"
        onClick={() => {
          setReplyContent("");
          setReplyMode("");
          setReplyTarget(null);
        }}
      >
        취소
      </button>

      <button
        id="modify"
        onClick={() => history.push(`/issue/modify?isId=${issueId}`)}
      >
        수정
      </button>
      <button className="delete-issue" onClick={handleIssueDelete}>
        삭제
      </button>
    </div>
  );
};

const App = () => (
  <Router>
    <Switch>
      <Route
        path="/issue/:id"
        render={(props) => <IssueDetails issueId={props.match.params.id} />}
      />
      {/* 다른 라우트들 */}
    </Switch>
  </Router>
);

export default App;
