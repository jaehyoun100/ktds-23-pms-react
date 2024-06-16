import { useNavigate } from "react-router-dom";
import cs from "./Card.module.css";
import { BsChevronRight } from "react-icons/bs";

export default function Card({ icon, header, body, path, notNavigate }) {
  const navigate = useNavigate();
  // > 클릭하면 해당 메인페이지로 이동
  const pageMoveHandler = () => {
    navigate(path);
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title" onClick={pageMoveHandler} style={notNavigate && { cursor: "default" }}>
        <div className="grid-c-title-info">
          <div className="grid-c-title-icon">{icon}</div>
          <h3 className="grid-c-title-text no-margin" style={notNavigate && { cursor: "default" }}>
            {header}
          </h3>
        </div>
        {!notNavigate && (
          <div className="grid-c-title-icon">
            <BsChevronRight />
          </div>
        )}
      </div>
      <div className={cs.gridC1Content}>{body}</div>
    </div>
  );
}
