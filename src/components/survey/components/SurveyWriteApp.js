import React, { useState } from "react";
import SurveyQuestion from "./SurveyQuestion";
import { createSurvey, createSurveyPick } from "../../../http/surveyhttp";
import {
  selectTypeClickHandler,
  writeTypeClickHandler,
  selectOptionAddClickHandler,
  selectOptionSubClickHandler,
  surveyQuestionAddClickHandler,
  surveyQuestionSubClickHandler,
  handleQuestionChange,
  handleOptionChange,
  handleQuestionNumberChange,
  handleLinkedChange,
} from "../funtion.js/Writefn";

export default function SurveyWrite({
  token,
  setWriteMode,
  info,
  selectedProjectId,
  setReload,
}) {
  const [questions, setQuestions] = useState([
    {
      type: undefined,
      options: 0,
      question: "",
      questionNumber: 1,
      optionsData: [],
      isLinked: false,
    },
  ]);

  const registHandler = async () => {
    // 문항 번호 중복 체크
    const questionNumbers = questions.map(
      (question) => question.questionNumber
    );
    const hasDuplicates = questionNumbers.some(
      (item, index) => questionNumbers.indexOf(item) !== index
    );

    // 질문 혹은 선택지 입력 여부 체크
    for (const question of questions) {
      if (!question.question.trim()) {
        alert("질문을 입력해 주세요.");
        return;
      }
      if (question.type === false) {
        for (const option of question.optionsData) {
          if (!option.sqpCntnt.trim()) {
            alert("선택지를 입력해 주세요.");
            return;
          }
        }
      }
    }
    if (hasDuplicates) {
      alert("설문 문항 번호가 중복됩니다!");
      return;
    }
    if (!window.confirm("등록하시겠습니까?")) {
      return;
    }

    const requestData = questions.map((question) => ({
      prjId: selectedProjectId,
      srvQst: question.question,
      crtrId: info[2].empId,
      seq: question.questionNumber,
      typeYn: question.type === false ? "N" : "Y",
      options: question.optionsData,
    }));

    const json = await createSurvey(selectedProjectId, token, requestData);
    const createdQuestions = json.body;

    for (let i = 0; i < createdQuestions.length; i++) {
      const question = createdQuestions[i];
      if (question.typeYn === "N") {
        const options = requestData[i].options;
        await createSurveyPick(question.srvId, token, options);
      }
    }
    setWriteMode(false);
    setReload(Math.random());
  };

  /* const temporarySaveHandler = () => {
    setWriteMode(false);
  }; */

  const cancleHandler = () => {
    if (!window.confirm("등록을 취소하시겠습니까?")) {
      return;
    }
    setWriteMode(false);
  };

  return (
    <>
      <table style={{ width: "90%", minWidth: "510px", margin: "30px 0 0 50px" }}>
        <thead>
          <tr>
            <th style={{ display: "flex", justifyContent: "space-between" }}>
              <div>설문 문항</div>
              <div>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => surveyQuestionAddClickHandler(setQuestions)}
                >
                  추가
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <SurveyQuestion
              key={index}
              index={index}
              question={question}
              questionsLength={questions.length}
              handleQuestionChange={(value) =>
                handleQuestionChange(index, value, setQuestions)
              }
              handleOptionChange={(oIndex, field, value) =>
                handleOptionChange(index, oIndex, field, value, setQuestions)
              }
              handleQuestionNumberChange={(value) =>
                handleQuestionNumberChange(index, value, setQuestions)
              }
              handleLinkedChange={(value) =>
                handleLinkedChange(index, value, setQuestions)
              }
              selectTypeClickHandler={() =>
                selectTypeClickHandler(index, setQuestions)
              }
              writeTypeClickHandler={() =>
                writeTypeClickHandler(index, setQuestions)
              }
              selectOptionAddClickHandler={() =>
                selectOptionAddClickHandler(index, setQuestions)
              }
              selectOptionSubClickHandler={() =>
                selectOptionSubClickHandler(index, setQuestions)
              }
              surveyQuestionSubClickHandler={() =>
                surveyQuestionSubClickHandler(index, setQuestions)
              }
            />
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button onClick={registHandler} style={{ marginRight: "10px" }}>
          등록
        </button>
        {/* <button onClick={temporarySaveHandler} style={{ marginRight: "10px" }}>
          임시저장
        </button> */}
        <button onClick={cancleHandler} style={{ marginRight: "10px" }}>
          취소
        </button>
      </div>
    </>
  );
}
