import React, { useState } from "react";

export default function SurveyWrite({ token, setWriteMode }) {
  const [chooseType, SetChooseType] = useState(undefined);
  const [selectOptionCount, setSelectOptionCount] = useState(0);
  const [surveyQuestionCount, setSurveyQuestionCount] = useState(1);

  const selectTypeClickHandler = () => {
    SetChooseType(false);
  };
  const writeTypeClickHandler = () => {
    SetChooseType(true);
  };
  const selectOptionAddClickHandler = () => {
    setSelectOptionCount(Math.min(8, selectOptionCount + 1));
  };
  const selectOptionSubClickHandler = () => {
    setSelectOptionCount(Math.max(0, selectOptionCount - 1));
  };

  const surveyQuestionAddClickHandler = () => {
    setSurveyQuestionCount(surveyQuestionCount + 1);
  };
  const surveyQuestionSubClickHandler = () => {
    setSurveyQuestionCount(Math.max(1, surveyQuestionCount - 1));
  };

  const registHandler = () => {
    setWriteMode(false);
  };
  const temporarySaveHandler = () => {
    setWriteMode(false);
  };
  const cancleHandler = () => {
    setWriteMode(false);
  };

  console.log(selectOptionCount);
  //선택형 서술형 선택
  /**
   * 선택형
   * 질문 내용 input
   * 선택지 기본2개
   * 선택지 1 input 선택지 추가 버튼
   * 선택지 2 input
   * 선택지 추가버튼을 클릭하면
   * 선택지 3 input (-)button
   * 추가된 선택지는 input 옆에 - 버튼
   * 선택지 번호 지정은 어떻게 할까?
   *
   * 특정 선택지 클릭시 몇번으로 갈건지 지정해주는 기능
   *
   */

  return (
    <>
      <table style={{ width: "100%" , minWidth: "510px"}}>
        <thead>
          <tr>
            <th>설문 문항</th>
          </tr>
        </thead>
        <tbody>
          {surveyQuestionCount && (
            <>
              {[...Array(surveyQuestionCount)].map((index) => (
                <>
                  <tr>
                    <td>
                      설문 유형
                      <button
                        onClick={selectTypeClickHandler}
                        style={{ margin: "0 20px" }}
                      >
                        선택형
                      </button>
                      <button onClick={writeTypeClickHandler}>서술형</button>
                      <div>
                        {/* {!chooseType && <td>선택형</td>}
                {chooseType && <td>서술형</td>} */}
                        <td>
                          {chooseType !== undefined && (
                            <>
                              {!chooseType ? (
                                <>
                                  <div>
                                    질문
                                    <input
                                      type="text"
                                      style={{ margin: "0 0 10px 50px" }}
                                    />
                                    <button
                                      style={{ marginLeft: "10px" }}
                                      onClick={surveyQuestionAddClickHandler}
                                    >
                                      추가
                                    </button>
                                    {surveyQuestionCount !== 1 && (
                                      <>
                                        <button
                                          style={{ marginLeft: "10px" }}
                                          onClick={
                                            surveyQuestionSubClickHandler
                                          }
                                        >
                                          삭제
                                        </button>
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    선택지
                                    <input
                                      type="text"
                                      style={{ margin: "0 0 10px 35px" }}
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
                                  <div>
                                    선택지
                                    <input
                                      type="text"
                                      style={{ margin: "0 0 10px 35px" }}
                                    />
                                  </div>
                                  {selectOptionCount !== 0 && (
                                    <>
                                      {[...Array(selectOptionCount)].map(
                                        (index) => (
                                          <>
                                            <div key={index}>
                                              선택지
                                              <input
                                                type="text"
                                                style={{
                                                  margin: "0 0 10px 35px",
                                                }}
                                              />{" "}
                                            </div>
                                          </>
                                        )
                                      )}
                                    </>
                                  )}
                                </>
                              ) : (
                                <div>
                                  질문
                                  <input
                                    type="text"
                                    style={{ margin: "0 0 10px 50px" }}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </td>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </>
          )}
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
