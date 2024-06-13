import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommuteLog } from "../../http/commuteHttp";

export default function CommuteSelectBox() {
  const searchKeyword = useRef(null);
  const commuteType = useRef(null);
  const searchType = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);

  const onClickHandler = () => {
    dispatch(getCommuteLog(token, searchKeyword, commuteType, searchType));
  };

  return (
    <>
      <select ref={commuteType}>
        <option value="today">당일</option>
        <option value="oneMonth">1달</option>
        <option value="twoMonth">2달</option>
        <option value="thrMonth">3달</option>
      </select>
      <select ref={searchType}>
        <option value="empName">사원명</option>
        <option value="empId">사원번호</option>
      </select>
      <label></label>
      <input></input>
      <button onClick={onClickHandler}>검색</button>
    </>
  );
}
