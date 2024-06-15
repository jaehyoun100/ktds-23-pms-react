import w from "./ContentMain.module.css";
import { MainEmployee, MainEmployeeImg, MemuEmployee } from "./maincomponents/Employee";
import MainCommute from "./maincomponents/Commute";
import { MainCalendar, MainProject, MainScaduale, MenuProject } from "./maincomponents/Project";
import MainMemo from "./maincomponents/Memo";
import MainIssue from "./maincomponents/Issue";
import { MemuProduct } from "./maincomponents/Product";
import { MemuApproval } from "./maincomponents/Approval";
import Card from "../common/card/Card";
import { BsFillPeopleFill } from "react-icons/bs";

export default function ContentMain() {
  // <div className={w.}></div>
  return (
    <>
      <div className={w.bodyContainer}>
        <div className={w.bodyContentContainer}>
          <div className={`${w.contentGridTwo} ${w.heightFull}`}>
            <div className={w.subgridTwo}>
              {/* 사원구역 */}
              <div className={w.mainContentHolderRight}>
                {/* row-1 */}
                <div className={w.contentGridOne}>
                  <MainEmployeeImg />
                  <Card icon={<BsFillPeopleFill />} header={"내정보"} body={<MainEmployee />} path={""} />
                  <Card icon={<BsFillPeopleFill />} header={"출퇴근"} body={<MainCommute />} path={""} />
                </div>
                {/* 쪽지 */}
                <div className={w.gridTwoItem}>
                  <Card icon={<BsFillPeopleFill />} header={"쪽지"} body={<MainMemo />} path={""} />
                </div>
                {/* 프로젝트 */}
                <div className={w.contentGridTwo}>
                  <Card icon={<BsFillPeopleFill />} header={"프로젝트"} body={<MainProject />} path={""} />
                  <Card icon={<BsFillPeopleFill />} header={"이슈"} body={<MainIssue />} path={""} />
                </div>
              </div>
            </div>
            {/* 메뉴구역 */}
            <div className={w.subgridTwo}>
              <div className={w.mainContentHolderLeft}>
                <div>
                  <Card icon={<BsFillPeopleFill />} header={"달력"} body={<MainCalendar />} path={""} />
                  {/* <Card icon={<BsFillPeopleFill />} header={"일정"} body={<MainScaduale />} path={""} /> */}
                </div>
                {/* 메뉴 navigation >>> component 구성 끝나면 card의 header 없애줄것 */}
                <div className={w.contentGridTwo}>
                  <Card icon={<BsFillPeopleFill />} header={"인사"} body={<MemuEmployee />} />
                  <Card icon={<BsFillPeopleFill />} header={"프로젝트"} body={<MenuProject />} />
                </div>
                <div className={w.contentGridTwo}>
                  <Card icon={<BsFillPeopleFill />} header={"비품"} body={<MemuProduct />} />
                  <Card icon={<BsFillPeopleFill />} header={"결제"} body={<MemuApproval />} />
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
