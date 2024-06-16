/**
 * 관리자 또는 PM 이 확인할 수 있는 후기 보기 Component
 */
import { getReviewResultByprjId } from "../../../http/reviewHttp";
import w from "../reviewCss/write.module.css";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Table from "../../../utils/Table";
import ViewStarRating from "./ViewStarRating";

export default function ViewReview() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const getReviewResult = location.state  || {};
  const [reviewResult, setReviewResult] = useState([]);
  const [avgStarRating, setAvgStarRating] = useState([]);

  useEffect(() => {
  const loadData = async () => {
    const prjId = getReviewResult.viewResult.prjId;
    const json = await getReviewResultByprjId(token, prjId);
    setReviewResult(json);
  var addStar = 0;
  for (let i in json.body.reviewList) {
    var temp = parseFloat(json.body.reviewList[i].starRating);
    addStar += temp;
  }
  setAvgStarRating(addStar/json.body.reviewCnt);
  };
loadData();
  }, [setReviewResult]);

  return (
    <>
          {reviewResult.body !== undefined ? (reviewResult.body.reviewList[0].projectVO !== undefined ?(
          <div className={w.reviewResultContainer}>
            <div className={w.reviewResultProjectContainer}>
      <div>프로젝트 이름 : {reviewResult.body.reviewList[0].projectVO.prjName}</div>
      <div onClick={() => console.log(reviewResult.body)}>작성된 후기 개수 : {reviewResult.body.reviewCnt}</div>
              <div>평균 별점 : {avgStarRating}</div>
              </div>
            {reviewResult.body.reviewList.map(index => (
      <div key={index.rvCntnt} key={index.starRating}>
        <div onClick={() => console.log(index.rvCntnt)}>후기 내용 : {index.rvCntnt}</div>
        <div>별점 : <ViewStarRating rating={index.starRating}/></div>
      </div>
            ))}
            </div>) : <div>작성된 리뷰가 없습니다.</div>
      ) : <div>작성된 리뷰가 없습니다.</div> }


    </>
  );
}
