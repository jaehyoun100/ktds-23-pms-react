import { useNavigate } from "react-router-dom";
import styles from "../project.module.css";
import { BiSolidHome } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
export default function MainHeader({ project }) {
  const navigate = useNavigate();
  const viewReviewResultHandler = (project) => {
    const viewResult = project;
    navigate("/review/result", { state: { viewResult } });
  };
  const token = localStorage.getItem("token");
  const userInfo = jwtDecode(token);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.flex}>
        <h4>
          <span>{project.prjName}</span> / <span style={{ fontSize: "20px" }}>{project.deptVO.deptName}</span>
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

        <span onClick={() => navigate(`/requirement/${project.prjId}?prjName=${project.prjName}`)}>요구사항</span>
        <span>이슈관리</span>
        <span>문답</span>
        <span onClick={() => navigate(`/output/${project.prjId}?prjName=${project.prjName}`)}>산출물</span>
        {userInfo.user.admnCode === "301" ? (
          <>
            <span>설문</span>
            <span onClick={() => viewReviewResultHandler(project)}>후기 관리</span>
          </>
        ) : project.pm.tmId === userInfo.user.empId ? (
          <>
            <span>설문</span>
            <span onClick={() => viewReviewResultHandler(project)}>후기 보기</span>
          </>
        ) : (
          <>
            <span></span>
            <span></span>
          </>
        )}
      </div>
    </div>
  );
}
