import { useDispatch } from "react-redux";
import SessionTimer from "./ContentTimer";
import "./ContentTop.css";
import { BsPersonLock, BsBell, BsBoxArrowRight } from "react-icons/bs";
import { logout } from "../../http/userDetailHttp";
import logoImg from "./Logo.png";

export default function ContentTop() {
  const tokenDispatch = useDispatch();
  const onLogoutBtnClickHandler = () => {
    tokenDispatch(logout());
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
