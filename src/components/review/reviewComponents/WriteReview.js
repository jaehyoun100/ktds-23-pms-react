/**
 * 프로젝트에 참여한 인원이 후기를 작성하는 Component
 *
 */
import { useEffect, useRef, useState } from "react";
import w from "../reviewCss/write.module.css";
import { viewWriteReviewPage, writeReview } from "../../../http/reviewHttp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProjectListApp from "../../project/projectlist/ProjectListApp";
import WriteReviewStarRating from "./WriteReviewStarRating";

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

  const onSaveClickHandler = async () => {
    const rvCntnt = rvCntntRef.current.value;
    const prjId = projectInfo.writeReview.prjId;
    const starRating = selectedRating;
    const json = await writeReview(token, rvCntnt, prjId, starRating);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
    }

    reloadProjectView();
  };

  const reloadProjectView = () => {
    navigate("/project");
  };

  return (
    <>
      <div className={w.gridContainer}>
        <div className={w.prjSubContainer}>
          <div></div>
          <span className={w.projectReview}>프로젝트 후기 제출지</span>
          <div></div>
          <span className={w.projectSub}>
            프로젝트 : {projectInfo.writeReview.prjName}
          </span>
          <div></div>
          <span className={w.projectSub}>
            PM : {projectInfo.writeReview.pm.employeeVO.empName}
          </span>
        </div>
        <br></br>
        <br></br>
        <div className={w.writeReviewContainer}>
          <div></div>
          <span className={w.writeReviewSpan}>후기를 작성해주세요.</span>
          <div></div>
          <textarea className={w.writeReviewText} ref={rvCntntRef}></textarea>
          <div></div>
          <div className={w.svgContainer}>
            <div>
              <span className={w.writeReviewStar}>별점을 남겨주세요.</span>
              <WriteReviewStarRating onChange={handleRatingChange} />
              <p className={w.writeReviewPtag}>선택된 별점: {selectedRating}</p>
            </div>
          </div>
        </div>
        <div className={w.submitBtnContainer}>
          <button className={w.submitBtn} onClick={onSaveClickHandler}>
            제출
          </button>
        </div>
        <div className={w.footer}>
          <span className={w.PMSreview}>PMS 후기 작성지</span>
        </div>
      </div>
    </>
  );
}
