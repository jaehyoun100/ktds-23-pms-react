import { useRef } from "react";
import { modifyDepartment } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function DepartmentUpdate({
  setIsModalOpen,
  setModalContent,
  data,
  token,
}) {
  const deptNameRef = useRef();
  const empIdRef = useRef();
  const empNameRef = useRef();

  const onCancelClickHandler = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onUpdateClickHandler = async () => {
    const empId = empIdRef.current.value;
    const empName = empNameRef.current.value;
    const deptName = deptNameRef.current.value;
    const deptId = data.deptId;
    const json = await modifyDepartment(
      token,
      empId,
      empName,
      deptName,
      deptId
    );
    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsModalOpen(false);
      setModalContent(null);
    }
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
          />
        </div>
        {/* {deptNameRef.current &&
        deptNameRef.current.value &&
        deptNameRef.current.value.length > 10 ? (
          <span className={s.alertMessage}>
            ※ 부서명은 10자를 초과할 수 없습니다.
          </span>
        ) : (
          <></>
        )}
        {deptNameRef.current &&
        (deptNameRef.current.value === null ||
          deptNameRef.current.value === "") ? (
          <span className={s.alertMessage}>※ 부서명은 필수 값입니다.</span>
        ) : (
          <></>
        )} */}
        <div>
          <label htmlFor="empId">부서장 ID</label>
          <input
            type="text"
            id="empId"
            name="empId"
            defaultValue={data.deptLeadId}
            ref={empIdRef}
          />
        </div>
        <div>
          <label htmlFor="empName">부서장 이름</label>
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
