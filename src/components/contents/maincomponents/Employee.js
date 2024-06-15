import w from "../ContentMain.module.css";
import { PiUserCircle } from "react-icons/pi";
import jaeDragon from "../jaeDragon.jpg";

export function MainEmployeeImg() {
  return (
    <>
      <div className={`${w.cardBodyContent} ${w.imgCenter}`}>
        <div className={w.heightFit}>
          <img
            src={jaeDragon}
            className={w.myInfoImg}
            alt="로그인한 유저의 프로필 사진"
          />
        </div>
      </div>
    </>
  );
}
export function MainEmployee() {
  return (
    <>
      <div className={w.cardBodyContent}>
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
      <div className={w.cardBodyContent}></div>
    </>
  );
}
