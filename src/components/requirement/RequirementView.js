import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import styles from "./requirement.module.css";
import {
  delayApprove,
  delayRequirement,
  deleteRequirement,
  loadOneRequirement,
  loadTeamListByPrjId,
  requirementFileDownload,
  requirementTestResult,
} from "../../http/requirementHttp";
import RequirementModify from "./RequirementModify";

export default function RequirementView() {
  const [content, setContent] = useState({
    requirement: [],
    isPmAndPl: [],
  });
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReloadDetail, setNeedReloadDetail] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const prjId = query.get("prjId");
  const rqmId = query.get("rqmId");

  const [userData, setUserData] = useState();
  const [teamList, setTeamList] = useState([]);

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
        navigate(`/requirement/${prjId}`);
      } else {
        alert("삭제할 권한이 없습니다.");
      }
    }
  };

  const onClickHandler = () => {
    navigate(`/requirement/${prjId}`);
  };

  const onFileClickHandler = async (requirementId, fileName) => {
    // 클릭 시 파일 다운로드
    const response = await requirementFileDownload(token, requirementId);

    if (!response.ok) {
      console.error(
        `File download failed with status code: ${response.status}`
      );
      throw new Error("File download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const delayCallHandler = async (requirementId) => {
    // 클릭 시 '연기신청' 상태로 변경
    const check = window.confirm("연기신청을 하시겠습니까?");
    if (check) {
      const json = await delayRequirement(token, requirementId);
      console.log(json);
      setNeedReloadDetail(Math.random());
    }
  };

  const delayAccessHandler = async (requirementId, isApprove) => {
    // 승인, 거절 버튼 클릭에 따라서 다르게 처리
    const check = isApprove
      ? window.confirm("승인하시겠습니까?")
      : window.confirm("거절하시겠습니까?");

    if (check) {
      const json = await delayApprove(token, requirementId, isApprove);
      console.log(json);
      setNeedReloadDetail(Math.random());
    }
  };

  const testResultHandler = async (requirementId, testResult) => {
    // 완료, 실패 버튼 클릭에 따라서 다르게 처리
    const check = window.confirm("결과를 전송하시겠습니까?");
    if (check) {
      const json = await requirementTestResult(
        token,
        requirementId,
        testResult
      );
      console.log(json);

      if (json.body === true) {
        setNeedReloadDetail(Math.random());
      }
      if (json.body !== (true || false)) {
        alert(json.body);
      }
    }
  };

  const fetchParams = useMemo(() => {
    return { token, needReloadDetail };
  }, [token, needReloadDetail]);

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchLoadOneRequirement = useCallback(async (params) => {
    const { token, prjId, rqmId } = params;
    return await loadOneRequirement(token, prjId, rqmId);
  }, []);

  // 로그인 유저의 정보를 받아오는 API
  useEffect(() => {
    if (!token) {
      return;
    }
    const userInfo = async () => {
      const response = await fetch("http://localhost:8080/api/", {
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
      const json = await fetchLoadOneRequirement({
        ...fetchParams,
        prjId,
        rqmId,
      });
      const { requirement, isPmAndPl } = json.body;
      setContent({
        requirement,
        isPmAndPl,
      });
      // console.log("isPmAndPl: ", isPmAndPl);
    };

    getOneRequirement();
  }, [fetchLoadOneRequirement, fetchParams, prjId, rqmId]);

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
              <div style={{ marginBottom: "20px" }}>{data.rqmTtl}</div>
              <div className={styles.mainInfo}>
                <div className={styles.grid}>
                  <div className={styles.mainItem}>프로젝트</div>
                  <div className={styles.subItem}>{data.projectVO.prjName}</div>
                  <div className={styles.mainItem}>작성자</div>
                  <div className={styles.subItem}>{data.crtrIdVO.empName}</div>
                  <div className={styles.mainItem}>기간</div>
                  <div className={styles.subItem}>
                    {data.strtDt} ~ {data.endDt}
                  </div>
                  <div className={styles.mainItem}>작성일</div>
                  <div className={styles.subItem}>{data.crtDt}</div>
                </div>
              </div>

              <div className={styles.subInfo}>
                <div className={`${styles.grid}`}>
                  <div className={styles.mainItem}>일정상태</div>
                  <div className={styles.flexRow}>
                    <div className={styles.subItem}>
                      {data.scdStsVO.cmcdName}
                    </div>
                    {data.rqmStsVO.cmcdName !== "개발완료" && (
                      <>
                        {data.scdStsVO.cmcdName !== "연기필요" ? (
                          <>
                            {/** 연기 버튼을 클릭 시 '연기필요' 상태로 바뀜 */}
                            <button
                              onClick={() => delayCallHandler(data.rqmId)}
                            >
                              연기
                            </button>
                          </>
                        ) : (
                          <>
                            {/** 관리자이거나 PM or PL일 경우 승인, 거절 버튼 보여주기 */}
                            {(userData.admnCode === "301" ||
                              isPmAndPl === true) && (
                              <>
                                <button
                                  onClick={() =>
                                    delayAccessHandler(data.rqmId, true)
                                  }
                                >
                                  승인
                                </button>
                                <button
                                  onClick={() =>
                                    delayAccessHandler(data.rqmId, false)
                                  }
                                >
                                  거절
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className={styles.mainItem}>담당개발자</div>
                  <div className={styles.subItem}>{data.dvlrpVO.empName}</div>

                  <div className={styles.mainItem}>진행상태</div>
                  <div className={styles.subItem}>{data.rqmStsVO.cmcdName}</div>

                  <div className={styles.mainItem}>확인자</div>
                  <div className={styles.subItem}>{data.cfrmrVO.empName}</div>

                  <div className={styles.mainItem}>파일</div>
                  <div
                    className={styles.subItem}
                    onClick={() => onFileClickHandler(data.rqmId, data.rqmFile)}
                  >
                    {data.rqmFile}
                  </div>

                  <div className={styles.mainItem}>테스터</div>
                  <div className={styles.flexRow}>
                    <div className={styles.subItem}>{data.tstrVO.empName}</div>
                    {data.rqmSts === "604" && // 단위테스트 진행중이고
                      (data.tstrVO.empName === userData.empName || // 로그인한 사용자 = 테스터이거나
                        userData.admnCode === "301") && ( // 관리자일때
                        <>
                          <div
                            className={styles.subItem}
                            style={{ marginLeft: "20px" }}
                          >
                            테스트 결과:{" "}
                          </div>
                          <button
                            className={styles.subItem}
                            onClick={() => testResultHandler(data.rqmId, true)}
                          >
                            완료
                          </button>
                          <button
                            className={styles.subItem}
                            onClick={() => testResultHandler(data.rqmId, false)}
                          >
                            실패
                          </button>
                        </>
                      )}
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
              prjName={data.projectVO.prjName}
            />
          )}

          <div className="button-area right-align">
            {!isModifyMode &&
              data &&
              (userData.empName === data.crtrIdVO.empName ||
                userData.admnCode === "301") &&
              data.scdStsVO.cmcdName !== "종료" && (
                <>
                  {/** 작성자이거나 관리자일때 수정, 삭제 버튼 보여줌 */}
                  <button onClick={onRqmModifyHandler}>수정</button>
                  <button onClick={onRqmDeleteHandler}>삭제</button>
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
