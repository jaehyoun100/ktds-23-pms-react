import { useDispatch, useSelector } from "react-redux";
import SessionTimer from "./ContentTimer";
import "./ContentTop.css";
import { BsPersonLock, BsBell, BsBoxArrowRight } from "react-icons/bs";
import { logout } from "../../http/userDetailHttp";
import logoImg from "./Logo.png";
import { confirmModalActions } from "../../store/toolkit/slice/confirmModalSlice";

export default function ContentTop() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const onLogoutBtnClickHandler = () => {
    // dispatch(
    //   confirmModalActions.set({
    //     content: "종료 방식을 선택해주세요",
    //     confirmContent: "퇴 근",
    //     cancelContent: "로그아웃",
    //   })
    // );
    dispatch(logout(token, false));
  };
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <img className="logo-img" src={logoImg} alt="logo" />
      </div>
      <div className="content-top-right">
        <SessionTimer />
        <button type="button" className="admin-btn content-top-btn button-icon">
          <BsPersonLock className="top-icon" />
        </button>
        <button className="notification-btn content-top-btn button-icon">
          <BsBell className="top-icon" />
        </button>
        <button
          className="logout-btn content-top-btn button-icon"
          onClick={onLogoutBtnClickHandler}
        >
          <BsBoxArrowRight className="top-icon" />
        </button>
      </div>
    </div>
  );
}
