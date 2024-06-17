import { useRef } from "react";
import { modifyDepartment } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function DepartmentUpdate({
  setIsModalOpen,
  setModalContent,
  data,
  token,
  setShowModal,
}) {
  const deptNameRef = useRef();
  const empIdRef = useRef();
  const empNameRef = useRef();
  const reasonRef = useRef();
  const alertRef = useRef();
  const alertRef2 = useRef();

  const onCancelClickHandler = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onUpdateClickHandler = async () => {
    const empId = empIdRef.current.value;
    const empName = empNameRef.current.value;
    const deptName = deptNameRef.current.value;
    const deptApprReason = reasonRef.current.value;
    const deptId = data.deptId;

    // 입력값 검증
    if (!validateInputs(deptName)) return;
    if (!validateInputs2(empId)) return;

    const json = await modifyDepartment(
      token,
      empId,
      empName,
      deptName,
      deptId,
      deptApprReason
    );
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

  const validateInputs = (deptName) => {
    let isValid = true;

    if (!deptName) {
      alertRef.current.innerText = "※ 부서명은 필수 값입니다.";
      isValid = false;
    } else if (deptName.length > 10) {
      alertRef.current.innerText = "※ 부서명은 10자를 초과할 수 없습니다.";
      isValid = false;
    } else {
      alertRef.current.innerText = "";
    }

    return isValid;
  };

  const validateInputs2 = (empId) => {
    let isValid = true;

    if (!empId) {
      alertRef2.current.innerText = "※ 부서장ID는 필수 값입니다.";
      isValid = false;
    } else {
      alertRef2.current.innerText = "";
    }

    return isValid;
  };

  return (
    <>
      <h4>부서 정보 수정</h4>
      <div>
        <div>
          <label htmlFor="deptName">부서명</label>
          <input
            type="text"
            id="deptName"
            name="deptName"
            defaultValue={data.deptName}
            ref={deptNameRef}
            onBlur={() => validateInputs(deptNameRef.current.value)}
          />
          <span className={s.alertMessage} ref={alertRef}></span>
        </div>
        <div>
          <label htmlFor="empId">부서장 ID</label>
          <input
            type="text"
            id="empId"
            name="empId"
            defaultValue={data.deptLeadId}
            ref={empIdRef}
            onBlur={() => validateInputs2(empIdRef.current.value)}
          />
        </div>
        <span className={s.alertMessage} ref={alertRef2}></span>
        <div>
          <label htmlFor="empName">부서장 이름</label>
          <input type="text" id="empName" name="empName" ref={empNameRef} />
        </div>
        <div>
          <label htmlFor="reason">부서 정보 수정 사유</label>
          <input
            type="text"
            id="reason"
            name="reason"
            defaultValue={data.reason}
            ref={reasonRef}
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
