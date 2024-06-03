import { useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function MainInfo({ project }) {
  // const prjId = "PRJ_240502_000243";

  const onInfoClickHandler = () => {
    return;
  };

  return (
    <div>
      <div
        className={`${styles.displayFlex} ${styles.infoDisplay} ${styles.infoFirst}`}
      >
        <div>프로젝트 기간</div>
        <div>
          {project.strtDt} ~ {project.endDt}
        </div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>고객사</div>
        <div className={styles.displayInfoFlex}>
          {" "}
          {project.clntInfo}{" "}
          <IoInformationCircleSharp
            className={styles.info}
            onClick={onInfoClickHandler}
          />
        </div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>참여원</div>
        {project.projectTeammateList.map((item) => (
          <div key={item.tmId}>
            <div>{item.employeeVO.originPrflFileName}</div>
            <div>{item.employeeVO.empName}</div>
          </div>
        ))}
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>진행정도</div>
        <ProjectSubChart
          totalTasks={project.totalRequireCnt}
          completedTasks={project.requireCnt}
        />
      </div>
    </div>
  );
}
