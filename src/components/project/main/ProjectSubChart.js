import React from "react";
import styles from "../project.module.css";

const ProjectSubChart = ({ totalTasks, completedTasks }) => {
  let completionRatio = 100;
  if (totalTasks !== 0) {
    completionRatio = (completedTasks / totalTasks) * 100;
  }

  return (
    <div className={styles.barContainer}>
      <div
        className={styles.bar}
        style={{
          width: `${completionRatio ? completionRatio : 100}%`,
          backgroundColor: `${completionRatio === 0 ? "#e0e0e0" : ""}`,
        }}
      >
        {completedTasks} / {totalTasks} ({Math.round(completionRatio)}%)
      </div>
    </div>
  );
};

export default ProjectSubChart;
