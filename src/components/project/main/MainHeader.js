import styles from "../project.module.css";
export default function MainHeader({ project }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.flex}>
        <h4>
          <span>{project.deptVO.deptName} </span> /{" "}
          <span>{project.prjName}</span>
        </h4>
        <h6>PM : {project.pm.employeeVO.empName}</h6>
      </div>
      <div className={styles.headerMenu}>
        <span>참여원관리</span>
        <span>요구사항</span>
        <span>이슈관리</span>
        <span>문답</span>
        <span>산출물</span>
        <span>설문</span>
        <span>후기</span>
      </div>
    </div>
  );
}
