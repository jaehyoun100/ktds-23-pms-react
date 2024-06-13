import w from "../ContentMain.module.css";
import { TbBulb } from "react-icons/tb";

export default function MainIssue() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <TbBulb className={w.icons} /> 이슈
        </div>
      </div>
    </>
  );
}
