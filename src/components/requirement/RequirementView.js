import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./requirement.module.css";
import {
  deleteRequirement,
  loadOneRequirement,
} from "../../http/requirementHttp";
import RequirementModify from "./RequirementModify";

export default function RequirementView() {
  const [content, setContent] = useState();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReloadDetail, setNeedReloadDetail] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const prjId = query.get("prjId");
  const rqmId = query.get("rqmId");

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const onRqmModifyHandler = () => {
    setIsModifyMode(true);
  };

  const onRqmDeleteHandler = async () => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      const json = await deleteRequirement(token, rqmId);
      if (json) {
        navigate("/requirement");
      } else {
        alert("삭제할 권한이 없습니다.");
      }
    }
  };

  const onClickHandler = () => {
    navigate("/requirement");
  };

  const fetchParams = useMemo(() => {
    return { token, needReloadDetail };
  }, [token, needReloadDetail]);

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchLoadOneRequirement = useCallback(async (params) => {
    const { token, prjId, rqmId } = params;
    return await loadOneRequirement(token, prjId, rqmId);
  }, []);

  useEffect(() => {
    // 선택한 요구사항 정보 불러오기
    const getOneRequirement = async () => {
      const json = await fetchLoadOneRequirement({
        ...fetchParams,
        prjId,
        rqmId,
      });
      setContent(json);
    };

    getOneRequirement();
  }, [fetchLoadOneRequirement, fetchParams, prjId, rqmId]);

  const { body: data } = content || {};

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  return (
    <>
      {/** 데이터가 불러와졌고, 수정모드가 아니면 */}
      {data && !isModifyMode && (
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
              <div className={styles.subItem}>
                <Link to={`/requirement/downloadFile/${data.rqmId}`}>
                  {data.rqmFile}
                </Link>
              </div>

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

      {isModifyMode && (
        <RequirementModify
          projectId={prjId}
          requirementId={rqmId}
          setIsModifyMode={setIsModifyMode}
          setNeedReloadDetail={setNeedReloadDetail}
        />
      )}

      <div className="button-area right-align">
        {!isModifyMode && content && (
          <>
            <button onClick={onRqmModifyHandler}>수정</button>
            <button onClick={onRqmDeleteHandler}>삭제</button>
          </>
        )}

        <button onClick={onClickHandler}>목록으로 이동</button>
      </div>
    </>
  );
}
