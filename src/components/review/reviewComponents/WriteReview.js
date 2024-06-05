/**
 * 프로젝트에 참여한 인원이 후기를 작성하는 Component
 *
 */
import { useEffect, useRef } from "react";
import styles from "../reviewCss/write.module.css";
import { viewWriteReviewPage, writeReview } from "../../../http/reviewHttp";

export default function WriteReview() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    viewWriteReviewPage(token);
  }, [token]);

  const rvCntntRef = useRef();
  const prjIdRef = useRef();

  // 임시 콘솔
  console.log(prjIdRef);

  const onSaveClickHandler = async () => {
    const rvCntnt = rvCntntRef.current.value;
    const prjId = "PRJ_240501_000224";
    const json = await writeReview(token, rvCntnt, prjId);

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
      <div className={styles.gridContainer}>
        <div className={styles.prjSubContainer}>
          {/* 프로젝트 제목 삽입 */}
          <div className={styles.prjSub}>project</div>
        </div>
        <br></br>
        <br></br>
        <div className={styles.writeReviewContainer}>
          <div></div>
          <span className={styles.writeReviewSpan}>후기를 작성해주세요.</span>
          <div></div>
          <textarea
            className={styles.writeReviewText}
            ref={rvCntntRef}
          ></textarea>
          <div></div>
        </div>
        <div className={styles.submitBtnContainer}>
          <button className={styles.submitBtn} onClick={onSaveClickHandler}>
            제출
          </button>
        </div>

        <div className={styles.svgContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z" />
          </svg>
        </div>
        <div className={styles.footer}>
          <span className={styles.PMSreview}>PMS 후기 작성지</span>
        </div>
      </div>
    </>
  );
}
