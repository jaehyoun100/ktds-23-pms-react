import { useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";
import { IoInformationCircleSharp } from "react-icons/io5";
import InfoModal from "./InfoModal";
import { useSelector } from "react-redux";
import Profile from "./Profile";

export default function MainInfo({ project }) {
  // const prjId = "PRJ_240502_000243";

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleOpenModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowInfoModal(false);
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
          {project.clientVO.clntName}{" "}
          <IoInformationCircleSharp
            className={styles.info}
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div>참여원</div>
        {project.projectTeammateList.map((item) => (
          <div key={item.tmId}>
            <Profile profileFile={item.employeeVO.originPrflFileName}></Profile>
            <div
              style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "3px",
              }}
            >
              {item.employeeVO.empName}
            </div>
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
      <InfoModal
        show={showInfoModal}
        onClose={handleCloseModal}
        content={project.clientVO.info}
        title={project.clientVO.clntName}
        cancelContent="확인"
        contact={project.clientVO.cntct}
      />
    </div>
  );
}
