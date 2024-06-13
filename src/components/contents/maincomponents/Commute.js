import w from "../ContentMain.module.css";
import { FaDoorOpen } from "react-icons/fa";

export default function MainCommute() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <FaDoorOpen className={w.icons} /> 출퇴근
        </div>
        <div>출근 시간 (06-12 08:25)</div>
        <div>퇴근 시간 (06-12 19:25)</div>
        <button>퇴근</button>
      </div>
    </>
  );
}
