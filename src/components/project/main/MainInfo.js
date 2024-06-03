import { useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";

export default function MainInfo({ project }) {
  // const prjId = "PRJ_240502_000243";

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const total = 3;
      const completed = 2;

      setTotalTasks(total);
      setCompletedTasks(completed);
    };

    fetchData();
  }, []);

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
        <div>{project.clntInfo}</div>
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
