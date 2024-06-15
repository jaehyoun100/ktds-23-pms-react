/**
 * 관리자 또는 PM 이 확인할 수 있는 후기 보기 Component
 */
import { getReviewResultByprjId } from "../../../http/reviewHttp";
import w from "../reviewCss/write.module.css";
import {json, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ViewReview() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const getReviewResult = location.state  || {};
  const [reviewResult, setReviewResult] = useState([]);

  useEffect(() => {
  const loadData = async () => {
    console.log(getReviewResult.viewResult.prjId);
    console.log(token);
    const prjId = getReviewResult.viewResult.prjId;
    const json = await getReviewResultByprjId(token, prjId);
    setReviewResult(json);
  };
loadData();
  }, []);

  return (
    <>
      {reviewResult.body !== undefined && (
          <div>
      <div>작성된 후기 개수 : {reviewResult.body.reviewCnt}</div>
      <div>프로젝트 이름 : {reviewResult.body.reviewList[0].projectVO.prjName}</div>
      <div>후기 내용 : {reviewResult.body.reviewList[0].rvCntnt}</div>
            </div>
      )}
      <div>123</div>
    </>
  );
}
