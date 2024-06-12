import "../ContentMain.css";
import { IoCodeOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
export function MainProject() {
  return (
    <>
      <div className="border">
        <div className="common-dashboard-cont">
          <IoCodeOutline className="icons" /> 프로젝트
        </div>
      </div>
    </>
  );
}

export function MainCalendar() {
  return (
    <>
      <div className="cont2-content1">
        <div className="border">
          <div className="common-dashboard-cont">
            <FaRegCalendarAlt FaRegCalendarCheck className="icons" /> 달력
          </div>
        </div>
        <div className="border">
          <div className="common-dashboard-cont">
            <FaRegCalendarCheck className="icons" /> 일정
          </div>
        </div>
      </div>
    </>
  );
}

export function MenuProject() {
  return (
    <>
      <div className="border">프로젝트</div>
    </>
  );
}
