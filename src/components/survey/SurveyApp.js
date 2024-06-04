// SurveyApp.js

import React, { useEffect, useState } from "react";
import SurveyAnswer from "./SurveyAnswer";
import SurveyWrite from "./SurveyWiteApp";
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
    const loadboard = async () => {
      const response = await fetch("http://localhost:8080/api/survey/list", {
        method: "GET",
        headers: {
          Authorization: tokenInfo.token,
        },
      });

      const json = await response.json();
      setSurveys(json.body);
      //console.log("teammate : ", json.body[0]);
      //손봐야함
      console.log("json.body : ", json.body);
      //본인이 속한 프로젝트를 가져옴 관리자면 다가져옴
      //console.log("projectCommonCodeList : ", json.body[2]);
      //공통코드를 가져옴(써놨길래 일단 가져옴)
      //console.log("surveyYn : ", json.body[3]);
      //의도를 모르겠네
      //console.log("searchSurveyVO : ", json.body[4]);
      //로그인한 사원의 정보
      //console.log("isPM : ", json.body[5]);
      //PM여부 확인
    };
    loadboard();
  }, [tokenInfo.token]);

  //답변하기 버튼을 클릭했을 때
  const surveyWriteAnswerClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setAnswerMode(true);
  };

  //설문 작성 버튼을 클릭했을 때
  const surveyWriteQuestionClickHandler = () => {
    setWriteMode(true);
  };

  return (
    <>
      {!answerMode && !writeMode && (
        <>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td>프로젝트 명</td>
                <td>고객사</td>
                <td>담당 부서</td>
                {!surveys[5] && <td>설문 생성 여부</td>}
                {surveys[5] && <td>설문 작성</td>}
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
                      {!surveys[5] && (
                        //프로젝트의 설문 sts의 여부에 따라 조건부 랜더링을 하자
                        <td>
                          <button
                            onClick={() =>
                              surveyWriteAnswerClickHandler(survey.prjId)
                            }
                          >
                            설문 답변
                          </button>
                        </td>
                      )}
                      {surveys[5] && (
                        <td>
                          <button onClick={surveyWriteQuestionClickHandler}>
                            설문 작성
                          </button>
                          {/* 미작성 || 작성중이라면 버튼이 보이고 
                      작성이 완료되었다면 버튼을 사라지게 만들자 */}
                        </td>
                      )}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          {/* <div height>
            <select>
              <option>프로젝트명</option>
              <option>고객사</option>
              <option>담당부서</option>
            </select>
            <input type="text" />
            <button>검색</button>
          </div> */}
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
        <SurveyWrite token={tokenInfo.token} setWriteMode={setWriteMode} />
      )}
    </>
  );
}
