import "../ContentMain.css";
import { PiUserCircle } from "react-icons/pi";
import jaeDragon from "../jaeDragon.jpg";

export function MainEmployeeImg() {
  return (
    <>
       <div className="border">
        <img
          src={jaeDragon}
          className="myInfoImg"
          alt="로그인한 유저의 프로필 사진"
        />
      </div>
    </>
  );
}
export function MainEmployee() {
  return (
    <>
      <div className="border">
        <div className="common-dashboard-cont">
          <PiUserCircle className="icons" /> 내 정보
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
      <div className="border">인사</div>
    </>
  );
}
