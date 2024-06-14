import w from "./ContentMain.module.css";
import {
  MainEmployee,
  MainEmployeeImg,
  MemuEmployee,
} from "./maincomponents/Employee";
import MainCommute from "./maincomponents/Commute";
import {
  MainCalendar,
  MainProject,
  MainScaduale,
  MenuProject,
} from "./maincomponents/Project";
import MainMemo from "./maincomponents/Memo";
import MainIssue from "./maincomponents/Issue";
import { MemuProduct } from "./maincomponents/Product";
import { MemuApproval } from "./maincomponents/Approval";

export default function ContentMain() {
  return (
    <div className={w.dashboard}>
      <div className={w.cont1}>
        <div className={w.cont1Content1}>
          <MainEmployeeImg />
          <MainEmployee />
          <MainCommute />
        </div>
        <MainMemo />
        <div className={w.cont1Content3}>
          <MainProject />
          <MainIssue />
        </div>
      </div>

      <div className={w.cont2}>
        <MainCalendar />
        <MainScaduale />

        <MemuEmployee />
        <MenuProject />
        <MemuProduct />
        <MemuApproval />
      </div>
    </div>
  );
}
