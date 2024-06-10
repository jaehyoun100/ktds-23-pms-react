import React, { useEffect, useState } from "react";
import SurveyAnswer from "./components/SurveyAnswer";
import SurveyWrite from "./components/SurveyWriteApp";
import { useSelector } from "react-redux";

export default function SurveyApp() {
  // Receive token as prop
  const [surveys, setSurveys] = useState([]);
  const [answerMode, setAnswerMode] = useState(false);
  const [writeMode, setWriteMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    if (!tokenInfo.token) {
      return;
    }
    const loadsurvey = async () => {
      const response = await fetch("http://localhost:8080/api/survey/list", {
        method: "GET",
        headers: {
          Authorization: tokenInfo.token,
        },
      });

      const json = await response.json();
      setSurveys(json.body);
      console.log("SurveyApp json.body : ", json.body);
    };
    loadsurvey();
  }, [tokenInfo.token]);

  //답변하기 버튼을 클릭했을 때
  const surveyWriteAnswerClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setAnswerMode(true);
  };

  //설문 작성 버튼을 클릭했을 때
  const surveyWriteQuestionClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setWriteMode(true);
  };

  return (
    <>
      {!answerMode && !writeMode && (
        <>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <td>프로젝트 명</td>
                <td>고객사</td>
                <td>담당 부서</td>
                {!surveys[3] && <td>설문</td>}
                {surveys[3] && <td>설문 작성</td>}
              </tr>
            </thead>
            <tbody>
              {surveys[1] && surveys[1].projectList && (
                <>
                  {surveys[1].projectList.map((survey) => (
                    <tr key={survey.prjId}>
                      <td>{survey.prjName}</td>
                      <td>{survey.clntInfo}</td>
                      <td>{survey.deptVO.deptName}</td>
                      {survey.prjSts !== "409" ? (
                        <td>프젝 미종료</td>
                      ) : (
                        <>
                          {!surveys[3] ? (
                            <>
                              {survey.srvSts === "N" ? (
                                <td
                                  style={{ fontWeight: "bold", color: "#f44" }}
                                >
                                  미작성
                                </td>
                              ) : (
                                <>
                                  {survey.srvSts === "W" ? (
                                    <td style={{ fontWeight: "bold" }}>
                                      작성중 ...
                                    </td>
                                  ) : (
                                    <td>
                                      <button
                                        onClick={() =>
                                          surveyWriteAnswerClickHandler(
                                            survey.prjId
                                          )
                                        }
                                      >
                                        설문 답변
                                      </button>
                                    </td>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {survey.srvSts === "N" ||
                              survey.srvSts === "W" ? (
                                <td>
                                  <button
                                    onClick={() =>
                                      surveyWriteQuestionClickHandler(
                                        survey.prjId
                                      )
                                    }
                                  >
                                    설문 작성
                                  </button>
                                </td>
                              ) : (
                                <td>설문 작성 완료</td>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </>
      )}
      {answerMode && (
        <SurveyAnswer
          token={tokenInfo.token}
          selectedProjectId={selectedProjectId}
          setAnswerMode={setAnswerMode}
        />
      )}
      {writeMode && (
        <SurveyWrite
          token={tokenInfo.token}
          setWriteMode={setWriteMode}
          surveys={surveys} // 설문 데이터를 SurveyWrite 컴포넌트로 전달
          selectedProjectId={selectedProjectId} // 선택된 프로젝트 ID 전달
        />
      )}
    </>
  );
}
