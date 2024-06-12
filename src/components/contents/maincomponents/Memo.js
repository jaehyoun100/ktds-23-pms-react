import { useState } from "react";
import "../ContentMain.css";
import { TbMessage2Check } from "react-icons/tb";
import { TbMessage2Exclamation } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";

export default function MainMemo() {
  const [memo, setMemo] = useState(2);
  return (
    <>
      <div className="border">
        <div className="common-dashboard-cont">
          <TbMessages className="icons" /> 쪽지함
        </div>

        {Array.from({ length: memo }, (index) => (
          <div className="memo-read">
            {/* <TbMessageCircleExclamation
                    style={{ width: "18px", height: "18px"}}
                  /> */}
            <TbMessage2Check className="icons-18px" />
            <div key={index} className="memo-space">
              <div className="memo-send-info">
                <div className="font-bold">박송화</div>
                <div className="font-12px">06-12 10:12</div>
              </div>

              <div>안녕하세요!</div>
            </div>
          </div>
        ))}
        {/* 위가 쪽지 읽었을 때 아래가 쪽지 않 읽었을 때 */}
        <div className="memo-not-read">
          <TbMessage2Exclamation className="icons-18px" />
          {/* <TbMessageCircle className="icons-18px" /> */}
          <div className="memo-space">
            <div className="memo-send-info">
              <div className="font-bold">홍수림</div>
              <div className="font-12px">06-12 10:12</div>
            </div>

            <div>안녕히 계세요!</div>
          </div>
        </div>
      </div>
    </>
  );
}
