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

  const temporarySaveHandler = () => {
    setWriteMode(false);
  };

  const cancleHandler = () => {
    setWriteMode(false);
  };

  return (
    <>
      <table style={{ width: "100%", minWidth: "510px" }}>
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
        <button onClick={temporarySaveHandler} style={{ marginRight: "10px" }}>
          임시저장
        </button>
        <button onClick={cancleHandler} style={{ marginRight: "10px" }}>
          취소
        </button>
      </div>
    </>
  );
}
