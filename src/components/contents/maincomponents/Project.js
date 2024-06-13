import w from "../ContentMain.module.css";
import { IoCodeOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
export function MainProject() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <IoCodeOutline className={w.icons} /> 프로젝트
        </div>
      </div>
    </>
  );
}

export function MainCalendar() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <FaRegCalendarAlt FaRegCalendarCheck className={w.icons} /> 달력
        </div>
      </div>
    </>
  );
}
export function MainScaduale() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <FaRegCalendarCheck className={w.icons} /> 일정
        </div>
      </div>
    </>
  );
}

export function MenuProject() {
  return (
    <>
      <div className={w.border}>프로젝트</div>
    </>
  );
}
