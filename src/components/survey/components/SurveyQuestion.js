import React from "react";
import WriteSelectType from "./WriteSelectType";

export default function SurveyQuestion({
  question,
  index,
  questionsLength,
  handleQuestionChange,
  handleOptionChange,
  handleQuestionNumberChange,
  handleLinkedChange,
  selectTypeClickHandler,
  writeTypeClickHandler,
  selectOptionAddClickHandler,
  selectOptionSubClickHandler,
  surveyQuestionSubClickHandler,
}) {
  return (
    <tr>
      <td style={{ paddingBottom: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            설문 유형
            <button
              onClick={selectTypeClickHandler}
              style={{ margin: "0 20px" }}
            >
              선택형
            </button>
            <button onClick={writeTypeClickHandler}>서술형</button>
          </div>
          {questionsLength > 1 && (
            <>
              <div>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={surveyQuestionSubClickHandler}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
        {questionsLength > 1 && (
          <div
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <div>
              문항 번호
              <select
                value={question.questionNumber}
                onChange={(e) => handleQuestionNumberChange(e.target.value)}
                style={{ marginLeft: "20px" }}
              >
                {Array.from({ length: questionsLength }, (_, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>
            {question.type === false && (
              <div style={{ marginLeft: "20px" }}>
                연결 문항{" "}
                <input
                  type="checkbox"
                  checked={question.isLinked}
                  onChange={(e) => handleLinkedChange(e.target.checked)}
                />
              </div>
            )}
          </div>
        )}
        <tbody>
          <td>
            {question.type !== undefined && (
              <>
                {!question.type ? (
                  <WriteSelectType
                    selectOptionAddClickHandler={selectOptionAddClickHandler}
                    selectOptionSubClickHandler={selectOptionSubClickHandler}
                    selectOptionCount={question.options}
                    surveyQuestionCount={questionsLength}
                    handleOptionChange={handleOptionChange}
                    optionsData={question.optionsData}
                    isLinked={question.isLinked}
                    currentQuestionNumber={index + 1}
                    question={question.question}
                    handleQuestionChange={handleQuestionChange}
                  />
                ) : (
                  <div style={{display: "flex"}}>
                    <div>질문</div>
                    <div>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(e.target.value)}
                        style={{ margin: "0 0 0 50px", width: "250%" }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </td>
        </tbody>
      </td>
    </tr>
  );
}
