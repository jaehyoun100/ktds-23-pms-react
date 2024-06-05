import React, { useEffect, useRef, useState } from "react";

export default function SurveyAnswer({
  token,
  selectedProjectId,
  setAnswerMode,
}) {
  const [surveyLists, setSurveyLists] = useState([]);
  const textarea = useRef();

  // const handleResizeHeight = (e) => {
  //   e.target.style.height = "auto"; //height 초기화
  //   e.target.style.height = e.target.scrollHeight + "px";
  // };

  useEffect(() => {
    if (!token || !selectedProjectId) {
      return;
    }
    const loadSurveyList = async () => {
      const response = await fetch(
        `http://localhost:8080/api/survey/view/${selectedProjectId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const json = await response.json();
      console.log(json.body);
      setSurveyLists(json.body);
    };
    loadSurveyList();
  }, [token, selectedProjectId]);

  const cancleHandler = () => setAnswerMode(false);
  const surveyCompleateHandler = () => setAnswerMode(false);

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td style={{ minWidth: "60px" }}>문항</td>
            <td>질문</td>
          </tr>
        </thead>
        <tbody>
          {surveyLists[1] && (
            <>
              {surveyLists[1].questionList.map((surveyList) => (
                <>
                  <tr>
                    <td>{surveyList.seq}번</td>
                    <td>{surveyList.srvQst}</td>
                  </tr>
                  <tr>
                    {surveyList.typeYn === "N" && (
                      <td colSpan="2">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {surveyLists[2].map((question) =>
                            question.srvId === surveyList.srvId ? (
                              <div>{question.sqpCntnt} </div>
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
                            /* onChange={handleResizeHeight} */
                            ref={textarea}
                            style={{ width: "80%" }}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                </>
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
