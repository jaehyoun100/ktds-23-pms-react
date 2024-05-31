import "./Content.css";
import ContentMain from "../../components/contents/ContentMain";
import ContentTop from "../../components/contents/ContentTop";
import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="main-content">
      <ContentTop />
      <Outlet />
    </div>
  );
}
