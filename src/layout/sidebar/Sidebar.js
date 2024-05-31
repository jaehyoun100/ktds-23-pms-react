import "./Sidebar.css";
import MenuList from "./MenuList";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

export default function Sidebar({ menus = [] }) {
  const [closeSideBar, setCloseSideBar] = useState(false);
  // console.log(closeSideBar);

  const onSidebarToggleHandler = () => {
    setCloseSideBar(!closeSideBar);
  };

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
            <span className="info-name name-tag">김춘식</span>
            <span className="info-dept dept-tag">SW개발 / 개발1팀</span>
          </div>
        )}
      </div>
      <div className="navigation">
        {!closeSideBar && <MenuList list={menus} />}
      </div>
    </div>
  );
}
