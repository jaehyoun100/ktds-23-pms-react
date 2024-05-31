import SessionTimer from "./ContentTimer";
import "./ContentTop.css";
import { BsPersonLock, BsBell, BsBoxArrowRight } from "react-icons/bs";
export default function ContentTop() {
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <img
          className="logo-img"
          src="https://item.kakaocdn.net/do/42827d1e8227c8b4251acffb9e899e4ea88f7b2cbb72be0bdfff91ad65b168ab"
          alt="logo"
        />
      </div>
      <div className="content-top-right">
        <SessionTimer />
        <button type="button" className="admin-btn content-top-btn button-icon">
          <BsPersonLock className="top-icon" />
        </button>
        <button className="notification-btn content-top-btn button-icon">
          <BsBell className="top-icon" />
        </button>
        <button className="logout-btn content-top-btn button-icon">
          <BsBoxArrowRight className="top-icon" />
        </button>
      </div>
    </div>
  );
}
