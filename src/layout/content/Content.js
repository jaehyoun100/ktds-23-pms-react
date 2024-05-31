import "./Content.css";
import ContentMain from "../../components/contents/ContentMain";
import ContentTop from "../../components/contents/ContentTop";

export default function Content() {
  return (
    <div className="main-content">
      <ContentTop />
      <ContentMain />
    </div>
  );
}
