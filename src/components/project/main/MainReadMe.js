import "../project.css";
import { FaBookBookmark } from "react-icons/fa6";

export default function MainReadMe({ memo }) {
  return (
    <>
      <div className="display-flex">
        <FaBookBookmark />
        <div className="readme">Read Me</div>
      </div>

      <div className="readme-container">{memo}</div>
    </>
  );
}
