/**
 * 프로젝트에 참여한 인원이 후기를 작성하는 Component
 *
 */
import {useEffect, useRef, useState} from "react";
import styles from "../reviewCss/write.module.css";
import { viewWriteReviewPage, writeReview } from "../../../http/reviewHttp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProjectListApp from "../../project/projectlist/ProjectListApp";
import WriteReviewStarRating from "./WriteReviewStarRating"

export default function WriteReview() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const projectInfo = location.state || {};
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  useEffect(() => {
    viewWriteReviewPage(token);
  }, [token]);

  const rvCntntRef = useRef();
  const prjIdRef = useRef();

  // 임시 콘솔
  console.log(projectInfo);
  console.log(projectInfo.writeReview.prjName);
  console.log(projectInfo.writeReview.prjId);

  const onSaveClickHandler = async () => {
    const rvCntnt = rvCntntRef.current.value;
    const prjId = projectInfo.writeReview.prjId;
    const json = await writeReview(token, rvCntnt, prjId);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
    }

    console.log(token);
    reloadProjectView();
  };

  const reloadProjectView = () => {
    navigate("/project");
  };

  return (
    <>
      <div className={styles.gridContainer}>
        <div className={styles.prjSubContainer}>
          <div className={styles.prjSub}>{projectInfo.writeReview.prjName}</div>
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
          <div className={styles.svgContainer}>
            <div>
              <span className={styles.writeReviewSpan}>별점을 남겨주세요.</span>
              <WriteReviewStarRating onChange={handleRatingChange}/>
              <p>선택된 별점: {selectedRating}</p>
            </div>
          </div>
        </div>
        <div className={styles.submitBtnContainer}>
          <button className={styles.submitBtn} onClick={onSaveClickHandler}>
            제출
          </button>
        </div>
        <div className={styles.footer}>
          <span className={styles.PMSreview}>PMS 후기 작성지</span>
        </div>
      </div>
    </>
  );
}
