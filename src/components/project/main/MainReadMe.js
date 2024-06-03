import React from "react";
import { FaBookBookmark } from "react-icons/fa6";
import s from "../project.module.css";

export default function MainReadMe({ memo }) {
  return (
    <>
      <div className={s.displayFlex}>
        <FaBookBookmark />
        <div className={s.readme}>Read Me</div>
      </div>

      <div className={s.readmeContainer}>{memo}</div>
    </>
  );
}
