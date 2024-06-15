import w from "../ContentMain.module.css";
import { IoCodeOutline } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import CalendarComponent from "../../project/main/CalendarComponent";
export function MainProject() {
  return (
    <>
      <div className={w.cardBodyContent}></div>
    </>
  );
}

export function MainCalendar() {
  return (
    <>
      <div className={w.cardBodyContent}></div>

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
      <div className={w.cardBodyContent}></div>
    </>
  );
}

export function MenuProject() {
  return (
    <>
      <div className={w.cardBodyContent}></div>
    </>
  );
}
