import { useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";
import { IoInformationCircleSharp } from "react-icons/io5";
import InfoModal from "./InfoModal";

export default function MainInfo({ project }) {
  // const prjId = "PRJ_240502_000243";

  const content =
    "KT DS는 1989년 창립하여 어쩌구 저쩌구 만나서 반갑습니다!! 행복한 하루 되세요 ^^ KT DS는 1989년 창립하여 어쩌구 저쩌구 만나서 반갑습니다!! 행복한 하루 되세요 ^^";
  const title = "KT DS";
  const contact = "02-332-1129";

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
          {project.clntInfo}{" "}
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
      <InfoModal
        show={showInfoModal}
        onClose={handleCloseModal}
        content={content}
        title={title}
        cancelContent="확인"
        contact={contact}
      />
    </div>
  );
}
