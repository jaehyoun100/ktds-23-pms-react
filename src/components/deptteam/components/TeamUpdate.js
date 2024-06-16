import { useRef } from "react";
import { modifyTeam } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function TeamUpdate({
  setIsModalOpen,
  setModalContent,
  data,
  token,
  setShowModal,
}) {
  const tmNameRef = useRef();
  const tmLeadIdRef = useRef();
  const empNameRef = useRef();
  const alertRef = useRef();
  const alertRef2 = useRef();

  const onCancelClickHandler = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onUpdateClickHandler = async () => {
    const tmName = tmNameRef.current.value;
    const tmLeadId = tmLeadIdRef.current.value;
    const tmId = data.tmId;

    // 입력값 검증
    if (!validateInputs(tmName)) return;
    if (!validateInputs2(tmLeadId)) return;

    const json = await modifyTeam(token, tmLeadId, tmId, tmName);
    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsModalOpen(false);
      setModalContent(null);
      setShowModal(true);
    }
  };

  const validateInputs = (tmName) => {
    let isValid = true;

    if (!tmName) {
      alertRef.current.innerText = "※ 팀명은 필수 값입니다.";
      isValid = false;
    } else {
      alertRef.current.innerText = "";
    }

    return isValid;
  };

  const validateInputs2 = (tmLeadId) => {
    let isValid = true;

    if (!tmLeadId) {
      alertRef2.current.innerText = "※ 팀장ID는 필수 값입니다.";
      isValid = false;
    } else {
      alertRef2.current.innerText = "";
    }

    return isValid;
  };

  return (
    <>
      <h4>팀 정보 수정</h4>
      <div>
        <div>
          <label>팀 명</label>
          <input
            type="text"
            id="tmName"
            name="tmName"
            defaultValue={data.tmName}
            ref={tmNameRef}
            onBlur={() => validateInputs(tmNameRef.current.value)}
          />
        </div>
        <span className={s.alertMessage} ref={alertRef}></span>
        <div>
          <label>팀장 ID</label>
          <input
            type="text"
            id="tmLeadId"
            name="tmLeadId"
            defaultValue={data.tmLeadId}
            ref={tmLeadIdRef}
            onBlur={() => validateInputs2(tmLeadIdRef.current.value)}
          />
        </div>
        <span className={s.alertMessage} ref={alertRef2}></span>
        <div>
          <label>팀장 이름</label>
          <input
            type="text"
            id="empName"
            name="empName"
            defaultValue={data.empName}
            ref={empNameRef}
          />
        </div>
      </div>
      <div>
        <button onClick={onUpdateClickHandler}>수정</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </>
  );
}
