import { useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";
export default function MainInfo() {
  const date = "2024-04-30 ~ 2025.01.19";
  const customer = "KT DS";

  const prjId = "PRJ_240502_000243";

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

  useEffect(() => {
    const test = async () => {
      const response = await fetch(
        `http://loaclhost:8080/api/project/view/${prjId}`,
        {
          method: "GET",
        }
      );

      console.log(response);
      const json = await response.json();
      console.log(json);
      const project = json.body.projectVO;
      const projectTeammateCnt = json.body.projectTeammateCount;
      console.log(project, projectTeammateCnt);
      return json;
    };

    test();
  }, []);

  return (
    <div>
      <div
        className={`${styles.displayFlex} ${styles.infoDisplay} ${styles.infoFirst}`}
      >
        <div>프로젝트 기간</div>
        <div>{date}</div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>고객사</div>
        <div>{customer}</div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>참여원</div>
        <div>{date}</div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>진행정도</div>
        <ProjectSubChart
          totalTasks={totalTasks}
          completedTasks={completedTasks}
        />
      </div>
    </div>
  );
}
