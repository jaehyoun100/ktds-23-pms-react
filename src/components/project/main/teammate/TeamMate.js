import { useRef, useState } from "react";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
export default function TeamMate() {
  const buttonGroupHiddenRef = useRef(null);
  const buttonHiddenRef = useRef(null);

  buttonGroupHiddenRef.current.style.display = "none";

  const [memberList, setMemberList] = useState();

  const onPlusClickHandler = () => {
    const item = { name: {}, role: {} };
    setMemberList((prev) => [...prev, { item }]);
  };
  const onSaveClickHandler = () => {
    buttonGroupHiddenRef.current.style.display = "none";
    buttonHiddenRef.current.style.display = "block";
  };
  const onModifyClickHandler = () => {
    buttonGroupHiddenRef.current.style.display = "block";
    buttonHiddenRef.current.style.display = "none";
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>아무개</td>
            <td>PM</td>
          </tr>
          {memberList?.map((item, idx) => (
            <td key={idx}>
              <Selectbox />
            </td>
          ))}
        </tbody>
      </table>
      <div>
        <div ref={buttonHiddenRef}>
          <Button onClickHandler={onModifyClickHandler} children="수정" />
        </div>
        <div ref={buttonGroupHiddenRef}>
          <Button onClickHandler={onPlusClickHandler} children="추가" />
          <Button onClickHandler={onSaveClickHandler} children="저장" />
        </div>
      </div>
    </div>
  );
}
