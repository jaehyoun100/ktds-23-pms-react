import w from "../ContentMain.module.css";
import { PiUserCircle } from "react-icons/pi";
import jaeDragon from "../jaeDragon.jpg";

export function MainEmployeeImg() {
  return (
    <>
      <div className={w.border}>
        <img
          src={jaeDragon}
          className={w.myInfoImg}
          alt="로그인한 유저의 프로필 사진"
        />
      </div>
    </>
  );
}
export function MainEmployee() {
  return (
    <>
      <div className={w.border}>
        <div className={w.commonDashboardCont}>
          <PiUserCircle className={w.icons} /> 내 정보
        </div>
        <div>박재현 상무 | 0011001</div>
        <div>(jaehyoun@pms.com)</div>
        <div>인사부 | 인사 1팀</div>
      </div>
    </>
  );
}

export function MemuEmployee() {
  return (
    <>
      <div className={w.border}>인사</div>
    </>
  );
}
