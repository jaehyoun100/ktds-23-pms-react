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
import Card from "../common/card/Card";
import { BsFillPeopleFill, BsFilePersonFill } from "react-icons/bs";
import { FaCalendarCheck } from "react-icons/fa";
import { AiOutlineFundProjectionScreen, AiFillMessage } from "react-icons/ai";
import { MdOutlineWorkHistory, MdEditDocument } from "react-icons/md";
import { HiMiniArchiveBox } from "react-icons/hi2";
import MemberLogin from "./maincomponents/MemberLogin";
import MainRentalSupplyLog from "./maincomponents/RentalSupplyLog";

export default function ContentMain() {
  // <div className={w.}></div>
  return (
    <>
      <div className={w.bodyContainer}>
        <div className={w.bodyContentContainer}>
          <div className={`${w.contentGridTwo}`}>
            <div className={w.subgridTwo}>
              {/* 사원구역 */}
              <div className={w.mainContentHolderRight}>
                {/* row-1 */}
                <div className={w.contentGridOne}>
                  <Card
                    icon={<BsFilePersonFill />}
                    header={"내정보"}
                    body={<MainEmployee />}
                    path={""}
                  />
                  <Card
                    icon={<MdOutlineWorkHistory />}
                    header={"출퇴근"}
                    body={<MainCommute />}
                    path={""}
                  />
                </div>
                {/* 쪽지 */}
                <div className={w.gridTwoItem}>
                  <Card
                    icon={<AiFillMessage />}
                    header={"쪽지"}
                    body={<MainMemo />}
                    path={""}
                  />
                </div>
                <div className={w.contentGridTwo}>
                  <Card
                    icon={<BsFillPeopleFill />}
                    header={"비품"}
                    body={<MainRentalSupplyLog />}
                    path={"/rentalsupply/log"}
                  />
                  <Card
                    icon={<AiOutlineFundProjectionScreen />}
                    header={"결재"}
                    body={<MenuProject />}
                  />
                </div>
              </div>
            </div>
            {/* 메뉴구역 */}
            <div className={w.subgridTwo}>
              <div className={w.mainContentHolderRight}>
                <div className={w.gridItem}>
                  <div className={`${w.gridTwoItem}`}>
                    <Card
                      icon={<BsFilePersonFill />}
                      header={"부서 접속 현황"}
                      body={""}
                      path={""}
                    />
                  </div>
                </div>
                {/* 쪽지 */}
                <div className={w.gridItem}>
                  <div className={`${w.gridTwoItem}`}>
                    <Card
                      icon={<FaCalendarCheck />}
                      header={"달력"}
                      body={<MainCalendar />}
                      path={""}
                      notNavigate
                    />
                  </div>
                </div>
                <div className={w.gridItem}>
                  <div className={`${w.gridTwoItem}`}>
                    <Card
                      icon={<AiOutlineFundProjectionScreen />}
                      header={"프로젝트"}
                      body={<MainProject />}
                      path={"/project"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={w.dashboard}>
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
        </div> */}
        </div>
      </div>
    </>
  );
}
