export default function WriteSelectType({
  selectOptionAddClickHandler,
  surveyQuestionAddClickHandler,
  selectOptionSubClickHandler,
  surveyQuestionSubClickHandler,
  selectOptionCount,
  surveyQuestionCount,
}) {


  return (
    <>
      <div>
        질문
        <input type="text" style={{ margin: "0 0 10px 50px" }} />
        
      </div>
      <div>
        선택지
        <input type="text" style={{ margin: "0 0 10px 35px" }} />
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
        <input type="text" style={{ margin: "0 0 10px 35px" }} />
      </div>
      {selectOptionCount !== 0 && (
        <>
          {[...Array(selectOptionCount)].map((index) => (
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
          ))}
        </>
      )}
    </>
  );
}
