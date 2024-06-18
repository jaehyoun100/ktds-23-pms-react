import w from "../ContentMain.module.css";
import { PiUserCircle } from "react-icons/pi";
import jaeDragon from "../jaeDragon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { tokenExpire } from "../../../utils/loginUtil";
import photo from "../../../layout/sidebar/profile_icon.png";

export function MainEmployeeImg() {
  return (
    <>
      <div className={`${w.cardBodyContent} ${w.imgCenter}`}>
        <div className={w.heightFit}>
          <img
            src={photo}
            className={w.myInfoImg}
            alt="로그인한 유저의 프로필 사진"
          />
        </div>
      </div>
    </>
  );
}
export function MainEmployee() {
  const url = "http://43.202.29.221";
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (!token) {
      return;
    }
    const userInfo = async () => {
      const response = await fetch(`${url}/api/`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await response.json();

      dispatch(tokenExpire(json));
      console.log("홍수림 :", json.body);
      setUserInfo(json.body);
    };
    userInfo();
  }, [token, dispatch, url]);

  return (
    <>
      {userInfo && (
        <>
          <div className={w.cardBodyContent} style={{ display: "flex" }}>
            <div>
              <MainEmployeeImg />
            </div>
            <div>
              <div>
                {userInfo.empName} {userInfo.pstnName} ({userInfo.empId})
              </div>
              <div>{userInfo.email}</div>
              <div>
                {userInfo.departmentVO.deptName} | {userInfo?.teamVO?.tmName}
              </div>
            </div>
          </div>
        </>
      )}
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
