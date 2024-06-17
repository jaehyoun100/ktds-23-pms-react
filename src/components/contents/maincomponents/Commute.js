import { useDispatch, useSelector } from "react-redux";
import w from "../ContentMain.module.css";
import { useEffect } from "react";
import { getOneCommute } from "../../../http/commuteHttp";
import Button from "../../common/Button/Button";
import { logout } from "../../../http/userDetailHttp";

export default function MainCommute() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { commute } = useSelector((state) => state.commuteInfo);

  useEffect(() => {
    dispatch(getOneCommute(token));
  }, [token, dispatch]);

  const onLogoutBtnClickHandler = () => {
    dispatch(logout(token, true));
  };
  return (
    <>
      <div className={w.border}>
        <div>출근 시간 ({commute.cmmtTime})</div>
        <div>퇴근 시간 ({commute.fnshTime})</div>
        <Button onClickHandler={onLogoutBtnClickHandler}>퇴근</Button>
      </div>
    </>
  );
}
