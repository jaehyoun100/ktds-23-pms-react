import React, { useState } from "react";

function IssueModifyForm({ issueVO }) {
  const [issueTitle, setIssueTitle] = useState(issueVO.isTtl);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(issueVO.isCntnt);

  const handleTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };
  {
    /**
  <form
  id="writeForm"
  action={`/issue/modify/?isId=${issueVO.isId}`}
  method="post"
  encType="nultipart/form-data"
  onSubmit={handleSubmit}
  >
  <div className="grid" data-id={issueVO.isId}>
    <label htmlFor="issue-title"></label>
    <input type="text" id="issue-title" name="isTtl" value={issueTitle} onChange={handleTitleChange} />

    <label htmlFor="file">첨부파일</label>
    <div>
        <input type="file" name="file" id="file" onChange={handleFileChange} />
        현재 업로드된 파일: {issueVO.originFileName}
    </div>

    <div>
        <label
    </div>
*/
  }

  return (
    <form
      id="wirteForm"
      action={`/issue/modify/?isId=${issueVO.isId}`}
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="grid" data-id={issueVO.isId}>
        <label htmlFor="issue-title">이슈명</label>
        <input
          type="text"
          id="issue-title"
          name="isTtl"
          value={issueTitle}
          onChange={handleTitleChange}
        />

        <label htmlFor="file">첨부파일</label>
        <div>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          현재 업로드된 파일: {issueVO.originFileName}
        </div>

        <div>
          <label htmlFor="content">이슈 내용</label>
          <div className="hereCkEditor5">
            {/* 여기에 에디터 컴포넌트를 넣어주세요 */}
            <textarea
              className="editor"
              name="isCntnt"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>

      <div id="modify-btn">
        <button type="submit" data-type="modify">
          수정
        </button>
      </div>
    </form>
  );
}

export default IssueModifyForm;
