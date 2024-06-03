/**
 * 프로젝트에 참여한 인원이 후기를 작성하는 Component
 *
 */
import { useEffect, useRef } from "react";
import "../reviewCss/WriteReview.css";
import {
  loadOneProject,
  viewWriteReviewPage,
  writeReview,
} from "../../../http/reviewHttp";

export default function WriteReview() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    viewWriteReviewPage(token);
  }, [token]);

  const reviewContentRef = useRef();

  const onSaveClickHandler = async () => {
    const reviewContent = reviewContentRef.current.value;
    const json = await writeReview(token, reviewContent);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
    }

    console.log(token);
  };

  return (
    <>
      <div className="grid-container">
        <div className="prj-sub-container">
          {/* 프로젝트 제목 삽입 */}
          <div className="prj-sub">project</div>
        </div>
        <br></br>
        <br></br>
        <div className="write-review-container">
          <div></div>
          <span className="write-review-span">후기를 작성해주세요.</span>
          <div></div>
          <textarea
            className="write-review-text"
            ref={reviewContentRef}
          ></textarea>
          <div></div>
        </div>
        <div className="submit-btn-container">
          <button className="submit-btn" onClick={onSaveClickHandler}>
            제출
          </button>
        </div>

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z" />
          </svg>
        </div>
        <div className="footer">
          <span className="PMS-review">PMS 후기 작성지</span>
        </div>
      </div>
    </>
  );
}
