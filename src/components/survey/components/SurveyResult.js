import React, { useEffect, useRef, useState } from "react";
import { loadSurveyList } from "../../../http/surveyhttp";

export default function SurveyResult({
  token,
  selectedProjectId,
  setSurveyResultMode,
}) {
  const [surveyLists, setSurveyLists] = useState([]);

  useEffect(() => {
    if (!token || !selectedProjectId) {
      return;
    }
    // async await??
    const test = async () => {
      const json = await loadSurveyList(token, selectedProjectId);
      console.log("설문 ", json.body);
      setSurveyLists(json.body);
    };
    test();
  }, [token, selectedProjectId]);

  const backListClickHandler = () => setSurveyResultMode(false);

  return (
    <>
      <table style={{ width: "90%", margin: "30px 0 0 50px" }}>
        <thead>
          <tr>
            <h2>프로젝트 설문결과</h2>
            <div style={{ marginBottom: "10px" }}>
              설문 참여 비율(PM, PL 제외)
            </div>
            <div style={{ marginBottom: "10px" }}>
              전체 팀원의 수 {surveyLists[3]} / 설문에 응답한 팀원의 수{" "}
              {surveyLists[4]}
            </div>
          </tr>
        </thead>
        <tbody>
          {surveyLists[1] && (
            <>
              {surveyLists[1].questionList.map((surveyList) => (
                <tr key={surveyList.srvId}>
                  <div>
                    <td>선택 횟수</td>
                    <td>{surveyList.seq}번</td>
                    <td>{surveyList.srvQst}</td>
                  </div>
                  <div>
                    {surveyList.typeYn === "N" && (
                      <td colSpan="2">
                        <div>
                          {surveyLists[2].map((question) =>
                            question.srvId === surveyList.srvId ? (
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <div
                                  key={question.seq}
                                  style={{ margin: "0 20px" }}
                                >
                                  {question.sqpCount}회
                                </div>
                                <div style={{ margin: "0 23px" }}>
                                  {question.seq}번{" "}
                                </div>
                                <div>{question.sqpCntnt}</div>
                              </div>
                            ) : null
                          )}
                        </div>
                      </td>
                    )}
                    {surveyList.typeYn === "Y" && (
                      <td>
                        {surveyLists[5].map((descriptive, index) =>
                          surveyList.srvId === descriptive.srvId ? (
                            <div style={{ marginBottom: "10px" }}>
                              - {descriptive.srvRplCntnt}
                            </div>
                          ) : null
                        )}
                      </td>
                    )}
                  </div>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "right", margin: "10px 10px 0 0" }}>
        <button onClick={backListClickHandler}>목록으로</button>
      </div>
    </>
  );
}
