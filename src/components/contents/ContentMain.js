import "./ContentMain.css";
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
    <div className="dashboard">
      <div className="cont1">
        <div className="cont1-content1">
          <MainEmployeeImg />
          <MainEmployee />
          <MainCommute />
        </div>
        <MainMemo />
        <div className="cont1-content3">
          <MainProject />
          <MainIssue />
        </div>
      </div>

      <div className="cont2">
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
