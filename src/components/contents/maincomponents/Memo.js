import { useState } from "react";
import w from "../ContentMain.module.css";
import { TbMessage2Check } from "react-icons/tb";
import { TbMessage2Exclamation } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";

export default function MainMemo() {
  const [memo, setMemo] = useState(2);
  return (
    <>
      <div className={w.cardBodyContent}>
        <div className={w.border}>
          {Array.from({ length: memo }, (index) => (
            <div className={w.memoRead}>
              {/* <TbMessageCircleExclamation
                    style={{ width: "18px", height: "18px"}}
                  /> */}
              <TbMessage2Check className={w.icons18px} />
              <div key={index} className={w.memoSpace}>
                <div className={w.memoSendInfo}>
                  <div className={w.fontBold}>박송화</div>
                  <div className={w.font12px}>06-12 10:12</div>
                </div>
                <div>안녕하세요!</div>
              </div>
            </div>
          ))}
          {/* 위가 쪽지 읽었을 때 아래가 쪽지 않 읽었을 때 */}
          <div className={w.memoNotRead}>
            <TbMessage2Exclamation className={w.icons18px} />
            {/* <TbMessageCircle className="icons-18px" /> */}
            <div className={w.memoSpace}>
              <div className={w.memoSendInfo}>
                <div className={w.fontBold}>홍수림</div>
                <div className={w.font12px}>06-12 10:12</div>
              </div>
              <div>안녕히 계세요!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
