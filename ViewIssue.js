import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {
  deleteIssue,
  loadOneIssue,
  loadTeamListByPrjId,
} from "../../http/issueHttp";
import ModifyIssue from "./ModifyIssue";
import styles from "./issue.module.css";

export default function RequirementView() {
  const [content, setContent] = useState({
    requirement: [],
    isPmAndPl: [],
  });
  const url = "43.202.29.221";
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReloadDetail, setNeedReloadDetail] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const prjId = query.get("prjId");
  const rqmId = query.get("rqmId");
  const isId = query.get("isId");

  const [userData, setUserData] = useState();
  const [teamList, setTeamList] = useState([]);

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const onIsModifyHandler = () => {
    setIsModifyMode(true);
  };

  const onIsDeleteHandler = async () => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      const json = await deleteIssue(token, isId);
      if (json) {
        navigate(`/issue/${rqmId}`);
      } else {
        alert("삭제할 권한이 없습니다.");
      }
    }
  };

  const onClickHandler = () => {
    navigate(`/issue/${rqmId}`);
  };

  // const onFileClickHandler = async (requirementId, fileName) => {
  //   // 클릭 시 파일 다운로드
  //   const response = await issueFileDownload(token, requirementId);

  //   if (!response.ok) {
  //     console.error(
  //       `File download failed with status code: ${response.status}`
  //     );
  //     throw new Error("File download failed");
  //   }

  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  // };

  const fetchParams = useMemo(() => {
    return { token, needReloadDetail };
  }, [token, needReloadDetail]);

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchLoadOneIssue = useCallback(async (params) => {
    const { token, prjId, isId } = params;
    return await loadOneIssue(token, rqmId, isId);
  }, []);

  // 로그인 유저의 정보를 받아오는 API
  useEffect(() => {
    if (!token) {
      return;
    }
    const userInfo = async () => {
      const response = await fetch(`${url}/api/`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await response.json();
      setUserData(json.body);
    };
    userInfo();
  }, [token]);

  useEffect(() => {
    // 선택한 요구사항 정보 불러오기
    const getOneRequirement = async () => {
      const json = await fetchLoadOneIssue({
        ...fetchParams,
        rqmId,
        isId,
      });
      const { issue, isPmAndPl } = json.body;
      setContent({
        issue,
        isPmAndPl,
      });
      // console.log("isPmAndPl: ", isPmAndPl);
    };

    getOneRequirement();
  }, [fetchLoadOneIssue, fetchParams, rqmId, isId]);

  useEffect(() => {
    // 프로젝트 ID로 팀원들의 정보 가져오기
    const getTeammateList = async () => {
      const json = await loadTeamListByPrjId(token, prjId);

      const { body: teammateData } = json;

      const list = teammateData.map((item) => item.employeeVO);
      setTeamList(list);
    };

    getTeammateList();
  }, [token, prjId]);

  // 객체 분해해서 값 추출
  const { requirement: data, isPmAndPl } = content || {};

  //   // 로그인한 사원이 프로젝트의 팀원에 속해 있으면 true, 아니면 false 반환.
  //   const isUserInTeam =
  //     teamList &&
  //     teamList.find((member) => member.empName === userData.empName) !== undefined
  //       ? true
  //       : false;

  // const { body: data } = content || {};

  if (!data || !data.projectVO) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  return (
    <>
      {userData && data && (
        <>
          {/** 데이터가 불러와졌고, 수정모드가 아니고, 로그인 사용자 정보가 로딩됐을시 */}
          {!isModifyMode && (
            <>
              <div style={{ marginBottom: "20px" }}>{data.isTtl}</div>
              <div className={styles.mainInfo}>
                <div className={styles.grid}>
                  <div className={styles.mainItem}>요구사항</div>
                  <div className={styles.subItem}>
                    {data.requirementVO.rqmName}
                  </div>
                  <div className={styles.mainItem}>작성자</div>
                  <div className={styles.subItem}>{data.crtrIdVO.empName}</div>
                  <div className={styles.mainItem}>기간</div>
                  <div className={styles.subItem}>
                    {data.strtDt} ~ {data.endDt}
                  </div>
                  <div className={styles.mainItem}>작성일</div>
                  <div className={styles.subItem}>{data.crtDt}</div>

                  <div className={styles.mainItem}>일정상태</div>
                  <div className={styles.flexRow}>
                    <div className={styles.subItem}>
                      {data.scdStsVO.cmcdName}
                    </div>
                    {data.rqmStsVO.cmcdName !== "개발완료"}
                  </div>

                  <div className={styles.mainItem}>진행상태</div>
                  <div className={styles.subItem}>{data.rqmStsVO.cmcdName}</div>

                  <div className={styles.mainItem}>파일</div>
                  {/* <div
                    className={styles.subItem}
                    onClick={() => onFileClickHandler(data.rqmId, data.rqmFile)}
                  >
                    {data.rqmFile}
                  </div> */}
                </div>
              </div>
              <div className={`${styles.contentInfo} ${styles.infoBorder}`}>
                <div className={styles.contentBorder}>
                  <div>{data.isCntnt}</div>
                </div>
              </div>
            </>
          )}

          {isModifyMode && (
            <ModifyIssue
              requirementId={rqmId}
              issueId={isId}
              setIsModifyMode={setIsModifyMode}
              setNeedReloadDetail={setNeedReloadDetail}
              rqmName={data.projectVO.rqmName}
            />
          )}

          <div className="button-area right-align">
            {!isModifyMode &&
              data &&
              (userData.empName === data.crtrIdVO.empName ||
                userData.admnCode === "301") &&
              data.scdStsVO.cmcdName !== "처리완료" && (
                <>
                  {/** 작성자이거나 관리자일때 수정, 삭제 버튼 보여줌 */}
                  <button onClick={onIsModifyHandler}>수정</button>
                  <button onClick={onIsDeleteHandler}>삭제</button>
                </>
              )}

            {!isModifyMode && (
              <button onClick={onClickHandler}>목록으로 이동</button>
            )}
          </div>
        </>
      )}
    </>
  );
}
