import React, { useEffect, useRef, useState } from "react";
import { loadSurveyList, registSurveyQuestion } from "../../../http/surveyhttp";

export default function SurveyAnswer({
  token,
  selectedProjectId,
  setAnswerMode,
  setReload,
}) {
  const [surveyLists, setSurveyLists] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [highlightedQuestions, setHighlightedQuestions] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const textarea = useRef();

  useEffect(() => {
    if (!token || !selectedProjectId) {
      return;
    }
    const loadSurvey = async () => {
      const json = await loadSurveyList(token, selectedProjectId);
      console.log("설문 ", json.body);
      setSurveyLists(json.body);
    };
    loadSurvey();
  }, [token, selectedProjectId]);

  const cancleHandler = () => {
    if (!window.confirm("설문은 취소 하시겠습니까?")) {
      return;
    }
    setAnswerMode(false);
  };

  const handleAnswerChange = (srvId, value, nextId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [srvId]: value,
    }));

    let newSkipped = skippedQuestions.slice();
    let newHighlighted = highlightedQuestions.slice();
    let newAnswered = answeredQuestions.slice();

    // 현재 질문을 answeredQuestions에 추가
    const currentSeq = surveyLists[1]?.questionList[currentQuestionIndex].seq;
    if (!newAnswered.includes(currentSeq)) {
      newAnswered.push(currentSeq);
    }

    // 모든 문항을 재활성화 (초기화)
    newSkipped = [];

    if (nextId) {
      const targetQuestion = surveyLists[1]?.questionList.find(
        (question) => question.seq === parseInt(nextId)
      );
      if (targetQuestion) {
        if (!newHighlighted.includes(targetQuestion.seq)) {
          newHighlighted.push(targetQuestion.seq);
        }

        for (
          let i = currentQuestionIndex + 1;
          i < surveyLists[1].questionList.length;
          i++
        ) {
          const questionSeq = surveyLists[1].questionList[i].seq;
          if (questionSeq === targetQuestion.seq) break;
          if (!newSkipped.includes(questionSeq)) {
            newSkipped.push(questionSeq);
          }
        }

        setHighlightedQuestions(newHighlighted);
        setSkippedQuestions(newSkipped);
        setAnsweredQuestions(newAnswered);
        setCurrentQuestionIndex(
          surveyLists[1].questionList.findIndex(
            (question) => question.seq === parseInt(nextId)
          )
        );
      }
    } else {
      updateCurrentQuestionIndex(newSkipped, newHighlighted, newAnswered);
    }
  };

  const handleTextAnswerChange = (srvId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [srvId]: value,
    }));
  };

  const handleTextAnswerBlur = () => {
    updateCurrentQuestionIndex(
      skippedQuestions,
      highlightedQuestions,
      answeredQuestions
    );
  };

  const updateCurrentQuestionIndex = (
    newSkipped,
    newHighlighted,
    newAnswered
  ) => {
    setCurrentQuestionIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
      while (
        nextIndex < surveyLists[1]?.questionList.length &&
        newSkipped.includes(surveyLists[1].questionList[nextIndex].seq)
      ) {
        nextIndex++;
      }
      return nextIndex < surveyLists[1]?.questionList.length
        ? nextIndex
        : prevIndex;
    });

    setSkippedQuestions(newSkipped);
    setHighlightedQuestions(newHighlighted);
    setAnsweredQuestions(newAnswered);
  };

  const surveyCompleateHandler = async () => {
    if (!window.confirm("답변을 제출 하시겠습니까?")) {
      return;
    }
    for (const surveyList of surveyLists[1].questionList) {
      const srvId = surveyList.srvId;
      const srvRplCntnt =
        surveyList.typeYn === "N"
          ? surveyLists[2].find(
              (question) =>
                question.srvId === srvId && question.seq === answers[srvId]
            )?.sqpCntnt
          : answers[srvId];
      const sqpId =
        surveyList.typeYn === "N"
          ? surveyLists[2].find(
              (question) =>
                question.srvId === srvId && question.seq === answers[srvId]
            )?.sqpId
          : null;
      await registSurveyQuestion(token, srvId, srvRplCntnt, sqpId);
    }

    setAnswerMode(false);
    setReload(Math.random());
  };

  const getRowStyle = (index, seq) => {
    if (answeredQuestions.includes(seq)) {
      return { color: "lightgray" };
    }
    if (highlightedQuestions.includes(seq) || index === currentQuestionIndex) {
      return { color: "black" };
    }
    return { color: "lightgray" };
  };

  const getDisabledState = (seq) => {
    return skippedQuestions.includes(seq);
  };

  return (
    <>
      <table style={{ width: "90%", margin: "30px 0 0 50px" }}>
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
              {surveyLists[1].questionList.map((surveyList, index) => (
                <tr
                  key={surveyList.srvId}
                  style={getRowStyle(index, surveyList.seq)}
                >
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
                                      question.seq,
                                      question.nextId
                                    )
                                  }
                                  disabled={getDisabledState(surveyList.seq)}
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
                            placeholder="자유롭게 작성해주세요"
                            ref={textarea}
                            style={{ width: "450%" }}
                            onChange={(e) =>
                              handleTextAnswerChange(
                                surveyList.srvId,
                                e.target.value
                              )
                            }
                            onBlur={handleTextAnswerBlur}
                            disabled={getDisabledState(surveyList.seq)}
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
