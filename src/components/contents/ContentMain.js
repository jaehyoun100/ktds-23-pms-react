import { useState } from "react";
import { TbMessage2Check } from "react-icons/tb";
import { TbMessage2Exclamation } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { PiUserCircle } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";
import { IoCodeOutline } from "react-icons/io5";
import { BiAlarm } from "react-icons/bi";
import { TbBulb } from "react-icons/tb";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import jaeDragon from "./jaeDragon.jpg";

export default function ContentMain() {
  const [memo, setMemo] = useState(2);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "70px",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "10px",
          width: "45%",
          height: "700px",
          display: "grid",
          gridTemplateRows: "1.5fr 1fr",
          marginRight: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1.5fr",
            gap: "10px",
            padding: "10px 10px 0 10px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "124px 2fr 2fr",
              height: "164px",
              gap: "10px",
            }}
          >
            <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
              <img
                src={jaeDragon}
                style={{
                  width: "122px",
                  height: "162px",
                  borderRadius: "10px",
                }}
                alt="로그인한 유저의 프로필 사진"
              />
            </div>
            <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
              <div
                style={{
                  padding: "3px 0 3px 10px",
                  backgroundColor: "#fff0f0",
                  borderBottom: "1px solid #777",
                  borderTopLeftRadius: "11px",
                  borderTopRightRadius: "11px",
                }}
              >
                <PiUserCircle style={{ width: "16px", height: "16px" }} /> 내
                정보
              </div>
              <div>박재현 상무 | 0011001</div>
              <div>(jaehyoun@pms.com)</div>
              <div>인사부 | 인사 1팀</div>
            </div>
            <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
              <div
                style={{
                  padding: "3px 0 3px 10px",
                  backgroundColor: "#fff0f0",
                  borderBottom: "1px solid #777",
                  borderTopLeftRadius: "11px",
                  borderTopRightRadius: "11px",
                }}
              >
                <FaDoorOpen style={{ width: "16px", height: "16px" }} /> 출퇴근
              </div>
              <div>출근 시간 (06-12 08:25)</div>
              <div>퇴근 시간 (06-12 19:25)</div>
              <button>퇴근</button>
            </div>
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            <div
              style={{
                padding: "3px 0 3px 10px",
                backgroundColor: "#fff0f0",
                borderBottom: "1px solid #777",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
              }}
            >
              <TbMessages style={{ width: "16px", height: "16px" }} /> 쪽지함
            </div>
            {/* <table>
                <thead>
                  
                </thead>
                <tbody>
                  <hr>
                  <td></td>
                  </hr>
                </tbody>
              </table> */}
            {Array.from({ length: memo }, (index) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 9fr",
                  alignItems: "center",
                  color: "grey",
                  borderBottom: "1px solid grey",
                  margin: "0 5px",
                }}
              >
                {/* <TbMessageCircleExclamation
                    style={{ width: "18px", height: "18px"}}
                  /> */}
                <TbMessage2Check style={{ width: "18px", height: "18px" }} />
                <div
                  key={index}
                  style={{
                    padding: "5px 0",
                    marginLeft: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>박송화</div>
                    <div style={{ fontSize: "12px" }}>06-12 10:12</div>
                  </div>

                  <div>안녕하세요!</div>
                </div>
              </div>
            ))}
            {/* 위가 쪽지 읽었을 때 아래가 쪽지 않 읽었을 때 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 9fr",
                alignItems: "center",
                borderBottom: "1px solid grey",
                margin: "0 5px",
              }}
            >
              <TbMessage2Exclamation
                style={{ width: "18px", height: "18px" }}
              />
              {/* <TbMessageCircle style={{ width: "18px", height: "18px" }} /> */}
              <div
                style={{
                  padding: "5px 0",
                  marginLeft: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>홍수림</div>
                  <div style={{ fontSize: "12px" }}>06-12 10:12</div>
                </div>

                <div>안녕히 계세요!</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            <div
              style={{
                padding: "3px 0 3px 10px",
                backgroundColor: "#fff0f0",
                borderBottom: "1px solid #777",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
              }}
            >
              <IoCodeOutline style={{ width: "16px", height: "16px" }} />{" "}
              프로젝트
            </div>
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            <div
              style={{
                padding: "3px 0 3px 10px",
                backgroundColor: "#fff0f0",
                borderBottom: "1px solid #777",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
              }}
            >
              <TbBulb style={{ width: "16px", height: "16px" }} /> 이슈
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid grey",
          borderRadius: "10px",
          width: "45%",
          height: "700px",
          display: "grid",
          gridTemplateRows: "1fr 2fr",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            padding: "10px 10px 0 10px",
          }}
        >
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            <div
              style={{
                padding: "3px 0 3px 10px",
                backgroundColor: "#fff0f0",
                borderBottom: "1px solid #777",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
              }}
            >
              <FaRegCalendarAlt
                FaRegCalendarCheck
                style={{ width: "16px", height: "16px" }}
              />{" "}
              달력
            </div>
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            <div
              style={{
                padding: "3px 0 3px 10px",
                backgroundColor: "#fff0f0",
                borderBottom: "1px solid #777",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
              }}
            >
              <FaRegCalendarCheck style={{ width: "16px", height: "16px" }} />{" "}
              일정
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            인사
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            프로젝트
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            비품
          </div>
          <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
            결제
          </div>
        </div>
      </div>
    </div>
  );
}
