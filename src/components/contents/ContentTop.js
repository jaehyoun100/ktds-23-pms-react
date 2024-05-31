import SessionTimer from "./ContentTimer";
import "./ContentTop.css";
import { BsPersonLock, BsBell, BsBoxArrowRight } from "react-icons/bs";
export default function ContentTop() {
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <SessionTimer />
      </div>
      <div className="content-top-btns">
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
