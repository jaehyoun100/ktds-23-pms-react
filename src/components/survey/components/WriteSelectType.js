import React from "react";

export default function WriteSelectType({
  selectOptionAddClickHandler,
  selectOptionSubClickHandler,
  selectOptionCount,
  surveyQuestionCount,
  handleOptionChange,
  optionsData,
  isLinked,
  currentQuestionNumber,
  question,
  handleQuestionChange,
}) {
  return (
    <>
      <div>
        질문
        <input
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          style={{ margin: "0 0 10px 50px" }}
        />
        <button
          onClick={selectOptionAddClickHandler}
          style={{
            marginLeft: "10px",
            width: "28px",
            height: "28px",
          }}
        >
          +
        </button>
        <button
          onClick={selectOptionSubClickHandler}
          style={{
            marginLeft: "10px",
            width: "28px",
            height: "28px",
          }}
        >
          -
        </button>
      </div>
      {Array.from({ length: selectOptionCount }).map((_, idx) => (
        <div key={idx} style={{ display: "flex" }}>
          선택지 {idx + 1}
          <input
            type="text"
            value={optionsData[idx]?.sqpCntnt || ""}
            onChange={(e) =>
              handleOptionChange(idx, "sqpCntnt", e.target.value)
            }
            style={{ margin: "0 0 10px 23px" }}
          />
          {isLinked && (
            <div style={{ marginLeft: "10px" }}>
              다음문항
              <select
                value={optionsData[idx]?.nextId || ""}
                onChange={(e) =>
                  handleOptionChange(idx, "nextId", e.target.value)
                }
                style={{ marginLeft: "10px", height: "30px" }}
              >
                <option value="">선택</option>
                {Array.from({ length: surveyQuestionCount }).map(
                  (_, optionIdx) =>
                    optionIdx + 1 !== currentQuestionNumber && (
                      <option key={optionIdx} value={optionIdx + 1}>
                        {optionIdx + 1}
                      </option>
                    )
                )}
              </select>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
