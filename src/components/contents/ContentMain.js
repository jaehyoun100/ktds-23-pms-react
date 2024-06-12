import "./ContentMain.css";
import { MainEmployee, MemuEmployee } from "./maincomponents/Employee";
import MainCommute from "./maincomponents/Commute";
import {
  MainCalendar,
  MainProject,
  MenuProject,
} from "./maincomponents/Project";
import MainMemo from "./maincomponents/Memo";
import MainIssue from "./maincomponents/Issue";
import { MemuProduct } from "./maincomponents/Product";
import { MemuApproval } from "./maincomponents/Approval";

export default function ContentMain() {
  return (
    <div className="dashboard">
      <div className="cont1">
        <div className="cont1-content1">
          <div className="cont1-content1-line1">
            <MainEmployee />
            <MainCommute />
          </div>
          <MainMemo />
        </div>

        <div className="cont1-content2">
          <MainProject />
          <MainIssue />
        </div>
      </div>

      <div className="cont2">
        <MainCalendar />
        <div className="cont2-content2">
          <MemuEmployee />
          <MenuProject />
          <MemuProduct />
          <MemuApproval />
        </div>
      </div>
    </div>
  );
}
