import { useState } from "react";
import { createTeamMember } from "../../../http/deptteamHttp";

export default function TeamMemberCreate({
  setIsTeamMemberRegistrationMode,
  setNeedReload,
  token,
}) {
  const [inputFields, setInputFields] = useState([
    {
      tmId: "",
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
        tmId: "",
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
      }
    }
  };

  return (
    <>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`tmId-${index}`}>팀명(팀ID)</label>
            <input
              type="text"
              id={`tmId-${index}`}
              name="tmId"
              value={inputField.tmId}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div>
            <label htmlFor={`empId-${index}`}>팀원(팀원ID)</label>
            <input
              type="text"
              id={`empId-${index}`}
              name="empId"
              value={inputField.empId}
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
