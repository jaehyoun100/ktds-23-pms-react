import w from "../ContentMain.module.css";
import { IoCodeOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import CalendarComponent from "../../project/main/CalendarComponent";
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
      <div style={{ gridColumn: "1/-1" }}>
        {/* <div className={w.commonDashboardCont}> */}
        {/* <FaRegCalendarAlt FaRegCalendarCheck className={w.icons} /> 달력 */}
        <CalendarComponent main events={[]} />
        {/* </div> */}
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
