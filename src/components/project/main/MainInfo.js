import { useCallback, useEffect, useState } from "react";
import styles from "../project.module.css";
import ProjectSubChart from "./ProjectSubChart";
import { IoInformationCircleSharp } from "react-icons/io5";
import InfoModal from "./InfoModal";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { putClientData } from "../../../http/projectHttp";

export default function MainInfo({ project }) {
  const tokenInfo = useSelector((state) => ({
    token: state.tokenInfo.token,
    credentialsExpired: state.tokenInfo.credentialsExpired,
  }));
  // const prjId = "PRJ_240502_000243";

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientData, setClientData] = useState(project.clientVO);
  console.log(clientData, "client!!!!");

  const memoizedPutClientData = useCallback(putClientData, []);
  const handleSave = async (newTitle, newContact, newContent) => {
    memoizedPutClientData(newTitle, newContact, newContent, tokenInfo.token, project);
  };

  return (
    <div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay} ${styles.infoFirst}`}>
        <div className={styles.infoTitle}>프로젝트 기간</div>
        <div>
          {project.strtDt} ~ {project.endDt}
        </div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div className={styles.infoTitle}>고객사</div>
        <div className={styles.displayInfoFlex}>
          {" "}
          {project.clientVO.clntName}{" "}
          <IoInformationCircleSharp className={styles.info} onClick={() => setModalVisible(true)} />
        </div>
      </div>
      <div className={`${styles.displayFlex} ${styles.infoDisplay}`}>
        <div className={styles.infoTitle}>참여원</div>
        {project.projectTeammateList.map((item, idx) => (
          <div key={item.tmId} style={{ cursor: "pointer" }}>
            <Profile
              profileValue={project.projectTeammateList[idx]}
              profileFile={item.employeeVO.originPrflFileName}
            ></Profile>
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
        <div className={styles.infoTitle}>진행정도</div>
        <ProjectSubChart totalTasks={project.chartData[0]} completedTasks={project.chartData[1]} />
      </div>
      <InfoModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        clientData={clientData}
        cancelContent="닫기"
        onSave={handleSave}
      />
    </div>
  );
}
