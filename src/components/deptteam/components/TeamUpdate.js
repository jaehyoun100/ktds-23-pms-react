export default function TeamUpdate({ setIsModalOpen, setModalContent }) {
  const onCancelClickHandler = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onUpdateClickHandler = async () => {};

  return (
    <>
      <h4>팀 정보 수정</h4>
      <div>
        <div>
          <label>팀 명</label>
          <input type="text" />
        </div>
        <div>
          <label>팀장 ID</label>
          <input type="text" />
        </div>
      </div>
      <div>
        <button onClick={onUpdateClickHandler}>수정</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </>
  );
}