// 선택형 설문 문항의 유형을 설정하는 함수
export const selectTypeClickHandler = (index, setQuestions) => {
  setQuestions((prevQuestions) =>
    // 질문들을 반복하면서 해당 index의 질문을 업데이트
    prevQuestions.map(
      (question, i) =>
        i === index
          ? {
              ...question,
              type: false, // 설문 유형
              options: 2, // 기본 선택지 개수
              optionsData: [
                { sqpCntnt: "", nextId: "", seq: 1 },
                { sqpCntnt: "", nextId: "", seq: 2 },
              ],
            }
          : question // 해당 index가 아닌 질문은 그대로 유지
    )
  );
};

// 서술형 설문 문항의 유형을 설정하는 함수
export const writeTypeClickHandler = (index, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index ? { ...question, type: true } : question
    )
  );
};

// 선택형 설문 문항에 선택지를 추가하는 함수
export const selectOptionAddClickHandler = (index, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index
        ? {
            ...question,
            options: Math.min(8, question.options + 1), // 선택지 8개
            optionsData: [
              ...question.optionsData,
              {
                sqpCntnt: "",
                nextId: "",
                seq: question.optionsData.length + 1, //추가
              },
            ],
          }
        : question
    )
  );
};

// 선택형 설문 문항에서 선택지를 제거하는 함수
export const selectOptionSubClickHandler = (index, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index
        ? {
            ...question,
            options: Math.max(2, question.options - 1), // 최소 2개
            optionsData: question.optionsData.slice(0, -1), // 선택지 삭제
          }
        : question
    )
  );
};

// 새로운 설문 문항을 추가하는 함수
export const surveyQuestionAddClickHandler = (setQuestions) => {
  setQuestions((prevQuestions) => [
    ...prevQuestions,
    {
      type: undefined,
      options: 0,
      question: "",
      questionNumber: prevQuestions.length + 1,
      optionsData: [],
      isLinked: false, // 연결 상태 초기화
    },
  ]);
};

// 특정 설문 문항을 제거하는 함수
export const surveyQuestionSubClickHandler = (index, setQuestions) => {
  setQuestions(
    (prevQuestions) => prevQuestions.filter((_, i) => i !== index)
  );
};

// 질문 내용을 변경하는 함수
export const handleQuestionChange = (index, value, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index ? { ...question, question: value } : question
    )
  );
};

// 선택지 내용을 변경하는 함수
export const handleOptionChange = (
  qIndex,
  oIndex,
  field,
  value,
  setQuestions
) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === qIndex
        ? {
            ...question,
            optionsData: question.optionsData.map((option, oi) =>
              oi === oIndex ? { ...option, [field]: value } : option
            ),
          }
        : question
    )
  );
};

// 질문 번호를 변경하는 함수
export const handleQuestionNumberChange = (index, value, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index ? { ...question, questionNumber: parseInt(value) } : question
    )
  );
};

// 질문의 연결 상태를 변경하는 함수
export const handleLinkedChange = (index, value, setQuestions) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((question, i) =>
      i === index ? { ...question, isLinked: value } : question
    )
  );
};
