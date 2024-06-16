import { useState } from "react";
import { createTeamMember } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function TeamMemberCreate({
  setIsTeamMemberRegistrationMode,
  setNeedReload,
  token,
  setIsModalOpen,
  setModalContent,
  selectTmId,
  setShowModal,
}) {
  const [inputFields, setInputFields] = useState([
    {
      tmId: selectTmId,
      empId: "",
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
        tmId: selectTmId,
        empId: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onCancelClickHandler = () => {
    setIsTeamMemberRegistrationMode(false);
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, empId } = field;
      const json = await createTeamMember(token, name, empId);

      if (json.errors) {
        json.errors.forEach((error) => {
          alert(error);
        });
      } else if (json.body) {
        setIsTeamMemberRegistrationMode(false);
        setNeedReload(Math.random());
        setShowModal(true);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <h4>새로운 팀원 등록</h4>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`tmId-${index}`}>팀명(팀ID)</label>
            <input
              type="text"
              id={`tmId-${index}`}
              name="tmId"
              value={inputField.tmId}
              // placeholder={selectTmId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.tmId === "" && (
            <span className={s.alertMessage}>※ 팀ID은 필수 값입니다.</span>
          )}

          <div>
            <label htmlFor={`empId-${index}`}>팀원ID</label>
            <input
              type="text"
              id={`empId-${index}`}
              name="empId"
              value={inputField.empId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          {inputField.empId === "" && (
            <span className={s.alertMessage}>※ 팀원ID는 필수 값입니다.</span>
          )}
          {inputField.empId > 10 && (
            <span className={s.alertMessage}>
              ※ 팀원ID는 10자를 초과할 수 없습니다.
            </span>
          )}
          <div>
            <label htmlFor={`empName-${index}`}>팀원명</label>
            <input type="text" id={`empName-${index}`} name="empName" />
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
