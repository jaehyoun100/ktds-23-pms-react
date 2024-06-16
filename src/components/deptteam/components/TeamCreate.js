import { useState } from "react";
import { createTeam } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function TeamCreate({
  setIsTeamRegistrationMode,
  setNeedReload,
  token,
  setIsModalOpen,
  setModalContent,
  selectedDeptId,
  setShowModal,
}) {
  const [inputFields, setInputFields] = useState([
    {
      name: "",
      empId: "",
      deptId: selectedDeptId,
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
        deptId: selectedDeptId,
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onCancelClickHandler = () => {
    setIsTeamRegistrationMode(false);
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, empId, deptId } = field;
      const json = await createTeam(token, name, empId, deptId);

      if (json.errors) {
        json.errors.forEach((error) => {
          alert(error);
        });
      } else if (json.body) {
        setIsTeamRegistrationMode(false);
        setNeedReload(Math.random());
        setShowModal(true);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <h4>새로운 팀 등록</h4>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`deptId-${index}`}>소속 부서 ID</label>
            <input
              type="text"
              id={`deptId-${index}`}
              name="deptId"
              value={inputField.deptId}
              // placeholder={selectedDeptId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.deptId === "" && (
            <span className={s.alertMessage}>※ 부서ID는 필수 값입니다.</span>
          )}
          <div>
            <label htmlFor={`name-${index}`}>팀명</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={inputField.name}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.name === "" && (
            <span className={s.alertMessage}>※ 팀명은 필수 값입니다.</span>
          )}
          {inputField.name.length > 10 && (
            <span className={s.alertMessage}>
              ※ 팀명은 10자를 초과할 수 없습니다.
            </span>
          )}
          <div>
            <label htmlFor={`empId-${index}`}>팀장 ID</label>
            <input
              type="text"
              id={`empId-${index}`}
              name="empId"
              value={inputField.empId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.empId === "" && (
            <span className={s.alertMessage}>※ 팀장ID는 필수 값입니다.</span>
          )}
          <div>
            <label htmlFor={`empName-${index}`}>팀장 명</label>
            <input
              // 일단 보이는거만.. 처리.. ㅎㅎ..
              type="text"
              id={`empName-${index}`}
              name="empName"
              // value={inputField.empName}
              // onChange={(event) => handleInputChange(index, event)}
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
