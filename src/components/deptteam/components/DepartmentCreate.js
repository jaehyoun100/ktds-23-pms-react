import { useState } from "react";
import { createDepartment } from "../../../http/deptteamHttp";

export default function DepartmentCreate({
  setIsDeptRegistrationMode,
  setNeedReload,
  token,
}) {
  const [inputFields, setInputFields] = useState([
    {
      name: "",
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
        name: "",
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
    setIsDeptRegistrationMode(false);
  };

  const onRegisterClickHandler = async () => {
    for (const field of inputFields) {
      const { name, empId } = field;
      const json = await createDepartment(token, name, empId);

      if (json.errors) {
        json.errors.forEach((error) => {
          alert(error);
        });
      } else if (json.body) {
        setIsDeptRegistrationMode(false);
        setNeedReload(Math.random());
      }
    }
  };

  return (
    <>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`name-${index}`}>부서 명</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={inputField.name}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
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