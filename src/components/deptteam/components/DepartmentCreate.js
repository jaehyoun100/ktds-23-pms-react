import { useRef, useState } from "react";
import { createDepartment } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function DepartmentCreate({
  setIsDeptRegistrationMode,
  setNeedReload,
  token,
  setIsModalOpen,
  setModalContent,
  setShowModal,
}) {
  const nameRef = useRef();
  const [inputFields, setInputFields] = useState([
    {
      name: "",
      empId: "",
      reason: "",
    },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];

    values[index][event.target.name] = event.target.value;

    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        name: "",
        empId: "",
        reason: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onCancelClickHandler = () => {
    setIsDeptRegistrationMode(false);
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, empId, reason } = field;
      const json = await createDepartment(token, name, empId, reason);

      if (json.errors) {
        json.errors.forEach((error) => {
          alert(error);
        });
      } else if (json.body) {
        setIsDeptRegistrationMode(false);
        setShowModal(true);
        setNeedReload(Math.random());
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <h4>새로운 부서 등록</h4>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`name-${index}`}>부서 명</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={inputField.name}
              defaultValue=""
              onChange={(event) => handleInputChange(index, event)}
              ref={nameRef}
            />
          </div>
          {inputField.name === "" && (
            <span className={s.alertMessage}>※ 부서명은 필수 값입니다.</span>
          )}
          {inputField.name.length > 10 && (
            <span className={s.alertMessage}>
              ※ 부서명은 10자를 초과할 수 없습니다.
            </span>
          )}
          <div>
            <label htmlFor={`empId-${index}`}>부서장 ID</label>
            <input
              type="text"
              id={`empId-${index}`}
              name="empId"
              value={inputField.empId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.empId === "" && (
            <span className={s.alertMessage}>※ 부서장 ID는 필수 값입니다.</span>
          )}
          <div>
            <label htmlFor={`empName-${index}`}>부서장 명</label>
            <input
              // 일단 표시만.. ㅎㅎ..
              type="text"
              id={`empName-${index}`}
              name="empName"
              // value={inputField.empName}
              // onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`reason-${index}`}>부서 신청 사유</label>
            <input
              type="text"
              id={`reason-${index}`}
              name="reason"
              value={inputField.reason}
              defaultValue=""
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>

          <div>
            <button type="button" onClick={handleAddFields}>
              +
            </button>
            {inputFields.length > 1 && (
              <button type="button" onClick={() => handleRemoveFields(index)}>
                -
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        <button onClick={onRegisterClickHandler}>등록</button>
        <button onClick={onCancelClickHandler}>취소</button>
      </div>
    </>
  );
}
