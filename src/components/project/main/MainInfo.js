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
  const [modalVisible, setModalVisible] = useState(false);
  const [clientData, setClientData] = useState({
    title: project.clientVO.clntName,
    contact: project.clientVO.cntct,
    content: project.clientVO.info,
  });
  const handleSave = (newTitle, newContact, newContent) => {
    setClientData({
      title: newTitle,
      contact: newContact,
      content: newContent,
    });
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
            onClick={() => setModalVisible(true)}
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
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        // content={project.clientVO.info}
        // title={project.clientVO.clntName}
        // cancelContent="확인"
        // contact={project.clientVO.cntct}
        title={clientData.title}
        contact={clientData.contact}
        content={clientData.content}
        cancelContent="닫기"
        onSave={handleSave}
      />
    </div>
  );
}
