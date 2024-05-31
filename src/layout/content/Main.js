import "./Main.css";
import Sidebar from "../sidebar/Sidebar";
import Content from "./Content";
import menus from "../sidebar/Menu";

export default function Main() {
  return (
    <div className="main-container">
      <div className="menu-list-container">
        <Sidebar menus={menus} />
      </div>
      <Content />
    </div>
  );
}
