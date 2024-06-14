import React, { useEffect, useRef, useState } from "react";
import { loadSurveyList } from "../../../http/surveyhttp";

export default function SurveyAnswer({
  token,
  selectedProjectId,
  setAnswerMode,
  setReload,
}) {
  const [surveyLists, setSurveyLists] = useState([]);
  const [answers, setAnswers] = useState({});
  const textarea = useRef();

  useEffect(() => {
    if (!token || !selectedProjectId) {
      return;
    }
    // async await??
    const test = async () => {
      const json = await loadSurveyList(token, selectedProjectId);
      console.log(json.body);
      setSurveyLists(json.body);
    };
    test();
  }, [token, selectedProjectId]);

  const cancleHandler = () => setAnswerMode(false);

  const handleAnswerChange = (srvId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [srvId]: value,
    }));
  };

  const surveyCompleateHandler = async () => {
    for (const surveyList of surveyLists[1].questionList) {
      const srvId = surveyList.srvId;
      const srvRplCntnt =
        surveyList.typeYn === "N"
          ? surveyLists[2].find(
              (question) =>
                question.srvId === srvId && question.seq === answers[srvId]
            )?.sqpCntnt
          : answers[srvId];
      const crtrId =
        surveyList.typeYn === "N"
          ? surveyLists[2].find(
              (question) =>
                question.srvId === srvId && question.seq === answers[srvId]
            )?.sqpId
          : null;
      const response = await fetch(
        `http://localhost:8080/api/survey/reply/${srvId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ srvId, srvRplCntnt, crtrId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit survey answer for srvId: ${srvId}`);
      }
    }

    setAnswerMode(false);
    setReload(Math.random());
  };

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <h2>프로젝트 설문조사</h2>
            <div style={{ marginBottom: "10px" }}>
              설문 결과는 익명으로 저장됩니다.
            </div>
          </tr>
        </thead>
        <tbody>
          {surveyLists[1] && (
            <>
              {surveyLists[1].questionList.map((surveyList) => (
                <tr key={surveyList.srvId}>
                  <div>
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
                                key={question.seq}
                                style={{ marginBottom: "10px" }}
                              >
                                <input
                                  type="radio"
                                  id={`${surveyList.srvId}${question.seq}`}
                                  name={`${surveyList.srvId}`}
                                  value={question.seq}
                                  onChange={() =>
                                    handleAnswerChange(
                                      surveyList.srvId,
                                      question.seq
                                    )
                                  }
                                />
                                {question.seq}. {question.sqpCntnt}
                              </div>
                            ) : null
                          )}
                        </div>
                      </td>
                    )}
                    {surveyList.typeYn === "Y" && (
                      <>
                        <td>답변</td>
                        <td>
                          <textarea
                            placeholder="간단하게 작성해주세요"
                            ref={textarea}
                            style={{ width: "80%" }}
                            onChange={(e) =>
                              handleAnswerChange(
                                surveyList.srvId,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </>
                    )}
                  </div>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "right", margin: "10px 10px 0 0" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={surveyCompleateHandler}
        >
          제출
        </button>
        <button onClick={cancleHandler}>취소</button>
      </div>
    </>
  );
}
