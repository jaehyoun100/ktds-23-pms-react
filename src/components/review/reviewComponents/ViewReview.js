/**
 * 관리자 또는 PM 이 확인할 수 있는 후기 보기 Component
 */
import { getReviewResult } from "../../../http/reviewHttp";
import w from "../reviewCss/write.module.css";

export default function ViewReview(project) {
  const token = localStorage.getItem("token");
  const prjId = project;

  const loadData = async () => {
    const json = await getReviewResult(token, prjId);
  };

  return (
    <>
      <div></div>
    </>
  );
}
