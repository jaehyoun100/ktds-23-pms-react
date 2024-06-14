import "./Sidebar.css";
import MenuList from "./MenuList";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../http/userDetailHttp";
import { tokenExpire } from "../../utils/loginUtil";

export default function Sidebar({ menus = [] }) {
  const url =
    "http://" +
    (window.location.host === "43.202.29.221"
      ? "43.202.29.221"
      : "localhost:8080");
  const dispatch = useDispatch();
  const [closeSideBar, setCloseSideBar] = useState(false);
  // console.log(closeSideBar);

  const onSidebarToggleHandler = () => {
    setCloseSideBar(!closeSideBar);
  };

  // 미디어 쿼리 감지: 브라우저의 너비가 변경될 때 이를 감지하고 상태를 변경하는 함수
  const handleResize = () => {
    if (window.innerWidth <= 1280) {
      setCloseSideBar(true);
    } else {
      setCloseSideBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // 초기 렌더링 시 미디어 쿼리 상태를 확인
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      console.log(json.body);
      setUserInfo(json.body);
    };
    userInfo();
  }, [token]);

  return (
    <div className={`sidebar ${closeSideBar === false ? null : "active"}`}>
      {/* <div className="sidebar"> */}
      <div>
        <button
          type="button"
          className="sidebar-toggler button-icon"
          onClick={onSidebarToggleHandler}
        >
          <LuMenu className="top-icon" />
        </button>
        {/* <h4 className="content-top-title">Home</h4> */}
      </div>
      <div className="user-info">
        <div
          className={`info-img img-fit-cover ${
            closeSideBar === false ? null : "active"
          }`}
        >
          <img
            src="https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171"
            alt="profile"
          />
        </div>
        {!closeSideBar && (
          <div className="info-emp">
            {userInfo && (
              <>
                <span className="info-name name-tag">{userInfo.empName}</span>
                <span className="info-dept dept-tag">
                  {userInfo.departmentVO.deptName}
                </span>
                <span className="dept-tag">{userInfo.teamVO.tmName}</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className={`navigation ${!closeSideBar ? "open" : "closed"}`}>
        {!closeSideBar && <MenuList list={menus} />}
      </div>
    </div>
  );
}
