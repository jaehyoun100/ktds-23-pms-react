import React from "react";
import styles from "../project.module.css";

const ProjectSubChart = ({ totalTasks, completedTasks }) => {
  const completionRatio = (completedTasks / totalTasks) * 100;

  return (
    <div className={styles.barContainer}>
      <div className={styles.bar} style={{ width: `${completionRatio}%` }}>
        {completedTasks} / {totalTasks} ({Math.round(completionRatio)}%)
      </div>
    </div>
  );
};

export default ProjectSubChart;
