import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./requirement.module.css";

export default function RequirementView() {
  const [content, setContent] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const prjId = query.get("prjId");
  const rqmId = query.get("rqmId");

  console.log("@@@@@@@@@@@@" + rqmId);

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const onRqmModifyHandler = () => {
    alert("수정");
  };

  const onRqmDeleteHandler = () => {
    alert("삭제");
  };

  const onClickHandler = () => {
    navigate("/requirement");
  };

  useEffect(() => {
    // 요구사항 정보 불러오기
    const loadOneRequirement = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/requirement/view?prjId=${prjId}&rqmId=${rqmId}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      const json = await response.json();
      setContent(json);
    };

    loadOneRequirement();
  }, [token, prjId, rqmId]);

  const { body: data } = content || {};

  return (
    <>
      <div>요구사항 view 페이지</div>
      {content && (
        <>
          <div className={styles.mainInfo}>
            <div className={`${styles.grid} ${styles.infoBorder}`}>
              <div className={styles.subItem}>{data.rqmTtl}</div>
              <div className={styles.subItem}>프로젝트</div>
              <div className={styles.subItem}>{data.projectVO.prjName}</div>
              <div className={styles.subItem}>작성자</div>
              <div className={styles.subItem}>{data.crtrIdVO.empName}</div>
              <div className={styles.subItem}>기간</div>
              <div className={styles.subItem}>
                {data.strtDt} ~ {data.endDt}
              </div>
              <div className={styles.subItem}>작성일</div>
              <div className={styles.subItem}>{data.crtDt}</div>
            </div>
          </div>

          <div className={styles.subInfo}>
            <div className={`${styles.grid} ${styles.infoBorder}`}>
              <div className={styles.subItem}>일정상태</div>
              <div className={styles.flexRow}>
                <div className={styles.subItem}>{data.scdStsVO.cmcdName}</div>
                <button className={styles.subItem}>연기</button>
                <button className={styles.subItem}>승인</button>
                <button className={styles.subItem}>거절</button>
              </div>

              <div className={styles.subItem}>담당개발자</div>
              <div className={styles.subItem}>{data.dvlrpVO.empName}</div>

              <div className={styles.subItem}>진행상태</div>
              <div className={styles.subItem}>{data.rqmStsVO.cmcdName}</div>

              <div className={styles.subItem}>확인자</div>
              <div className={styles.subItem}>{data.cfrmrVO.empName}</div>

              <div className={styles.subItem}>파일</div>
              <div className={styles.subItem}>{data.rqmFile}</div>

              <div className={styles.subItem}>테스터</div>
              <div className={styles.flexRow}>
                <div className={styles.subItem}>{data.tstrVO.empName}</div>
                <button className={styles.subItem}>결과제출</button>
              </div>
            </div>
          </div>
          <div className={`${styles.contentInfo} ${styles.infoBorder}`}>
            <div className={styles.contentBorder}>
              <div>{data.rqmCntnt}</div>
            </div>
          </div>
        </>
      )}

      <div className="button-area right-align">
        <button onClick={onRqmModifyHandler}>수정</button>
        <button onClick={onRqmDeleteHandler}>삭제</button>
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
    </>
  );
}
