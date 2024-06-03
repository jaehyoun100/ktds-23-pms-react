import React from "react";
import { FaBookBookmark } from "react-icons/fa6";
import s from "../project.module.css";

export default function MainReadMe({ memo }) {
  return (
    <div>
      <div className={`${s.displayFlex} ${s.readmeMargin}`}>
        <FaBookBookmark />
        <div className={s.readme}>Read Me</div>
      </div>

      <div className={s.readmeContainer}>{memo}</div>
    </div>
  );
}
