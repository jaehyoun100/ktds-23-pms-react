export default function SurveyResult({ setSurveyResultMode }) {
  const backListClickHandler = () => {
    setSurveyResultMode(false);
  };
  return (
    <div>
      <button onClick={backListClickHandler}>목록으로</button>
    </div>
  );
}
