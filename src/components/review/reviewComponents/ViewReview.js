/**
 * 관리자 또는 PM 이 확인할 수 있는 후기 보기 Component
 */
import { getReviewResultByprjId } from "../../../http/reviewHttp";
import w from "../reviewCss/write.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "../../../utils/Table";
import ViewStarRating from "./ViewStarRating";
import { jwtDecode } from "jwt-decode";
import MainHeader from "../../project/main/MainHeader";
import { FaCircleUser } from "react-icons/fa6";

export default function ViewReview() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const getReviewResult = location.state || {};
  const [reviewResult, setReviewResult] = useState([]);
  const [avgStarRating, setAvgStarRating] = useState([]);
  const userInfo = jwtDecode(token);
  console.log(getReviewResult);

  useEffect(() => {
    const loadData = async () => {
      const prjId = getReviewResult.viewResult.prjId;
      const json = await getReviewResultByprjId(token, prjId);
      setReviewResult(json);
      var addStar = 0;
      console.log(json);
      console.log(userInfo.user.admnCode);
      for (let i in json.body.reviewList) {
        var temp = parseFloat(json.body.reviewList[i].starRating);
        addStar += temp;
      }
      setAvgStarRating(addStar / json.body.reviewCnt);
    };
    loadData();
  }, [setReviewResult]);

  console.log(reviewResult);
  const reviewDeleteHandler = () => {};

  return (
    <>
      <MainHeader project={getReviewResult.viewResult} />
      {reviewResult.body !== undefined ? (
        reviewResult.body.reviewList[0].projectVO !== undefined ? (
          <div className={""}>
            <div className={w.reviewResultInfo}>
              <div className={w.reviewResultInfoItems}>
                <div>프로젝트 이름</div>
                <div className={w.reviewResultInfoItemsContent}>
                  {reviewResult.body.reviewList[0].projectVO.prjName}
                </div>
              </div>
              <div className={w.reviewResultInfoItems}>
                <div>작성된 후기 개수</div>
                <div className={w.reviewResultInfoItemsContent}>
                  {reviewResult.body.reviewCnt}
                </div>
              </div>
              <div className={w.reviewResultInfoItems}>
                <div>평균 별점</div>
                <div className={w.reviewResultInfoItemsContent}>
                  {avgStarRating}
                </div>
              </div>
            </div>
            {reviewResult.body.reviewList.map((index) => (
              <div className={w.reviewResultContainer} key={index.rvCntnt}>
                <div className={w.userIconContainer}>
                  <FaCircleUser className={w.userIcon} />
                </div>
                <div className={w.reviewResultContent}>
                  <div>
                    <div className={w.reviewResultStarFlex}>
                      <ViewStarRating rating={index.starRating} />
                      <span className={w.starRatingPosition}>
                        {index.starRating}
                      </span>
                    </div>
                    {userInfo.user.admnCode === "301" && (
                      <div>작성날짜 | {index.crtDt}</div>
                    )}
                  </div>
                </div>
                <div></div>
                <div>
                  <div>후기 내용</div>
                  <div>{index.rvCntnt}</div>
                </div>
                <div onClick={console.log(index.rvId)}>1</div>
                <button onClick={reviewDeleteHandler(index.prjId)}>삭제</button>
              </div>
            ))}
          </div>
        ) : (
          <div>작성된 리뷰가 없습니다.</div>
        )
      ) : (
        <div>작성된 리뷰가 없습니다.</div>
      )}
    </>
  );
}
