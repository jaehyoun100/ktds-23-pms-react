import React, { useEffect, useState } from "react";

export default function SurveyWrite({ token, setWriteMode }) {
  const [chooseType, SetChooseType] = useState(undefined);

  const selectTypeClickHandler = () => {
    SetChooseType(false);
  };
  const writeTypeClickHandler = () => {
    SetChooseType(true);
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
  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>설문 문항</th>
          </tr>
        </thead>
        <tbody>
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
                        <React.Fragment style={{ marginTop: "" }}>
                          <div>
                            질문
                            <input
                              type="text"
                              style={{ margin: "10px 35px" }}
                            />
                          </div>
                          <div>
                            선택지 1번
                            <input type="text" style={{ marginLeft: "35px" }} />
                          </div>
                          <div>
                            선택지 2번
                            <input type="text" style={{ marginLeft: "35px" }} />
                          </div>
                        </React.Fragment>
                      ) : (
                        "서술형"
                      )}
                    </>
                  )}
                </td>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button onClick={registHandler}>등록</button>
        <button onClick={temporarySaveHandler}>임시저장</button>
        <button onClick={cancleHandler}>취소</button>
      </div>
    </>
  );
}
