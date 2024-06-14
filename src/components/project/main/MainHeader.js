import { useNavigate } from "react-router-dom";
import styles from "../project.module.css";
import { BiSolidHome } from "react-icons/bi";
export default function MainHeader({ project }) {
  const navigate = useNavigate();
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
        <BiSolidHome
          onClick={() =>
            navigate("/project/view", {
              state: { key: project },
            })
          }
          style={{ cursor: "pointer" }}
          className={styles.homeIcon}
        />
        <span
          onClick={() =>
            navigate("/project/manage-teammate", {
              state: { key: { project } },
            })
          }
        >
          참여원관리
        </span>
        <span onClick={() => navigate("/requirement")}>요구사항</span>
        <span onClick={() => navigate("/issue")}>이슈관리</span>
        <span>문답</span>
        <span onClick={() => navigate("/output")}>산출물</span>
        <span>설문</span>
        <span>후기</span>
      </div>
    </div>
  );
}
