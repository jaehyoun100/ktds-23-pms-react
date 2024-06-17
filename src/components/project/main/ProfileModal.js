import React from "react";
import s from "../project.module.css";
import { FcBusinessman } from "react-icons/fc";

const ProfileModal = React.memo(
  ({ content, profileValue, onClose, show, closeContent, selectedEmpData }) => {
    if (!show) {
      return null;
    }

    return (
      <dialog
        style={{ zIndex: "2" }}
        open
        className={s.modalInfoWindow}
        role="alertdialog"
        aria-modal="true"
      >
        <div>
          <div
            className={s.modalClose}
            onClick={onClose}
            role="button"
            aria-label="Close modal"
            style={{ cursor: "pointer" }}
          >
            X
          </div>
          <div className={s.infoEmpArea}>
            <div className={s.infoEmpPhoto}>
              {selectedEmpData &&
              selectedEmpData.employeeVO.originPrflFileName !== null ? (
                <div
                  style={{
                    backgroundImage: `url(${selectedEmpData.employeeVO.originPrflFileName})`,
                    backgroundSize: "contain",
                  }}
                  className={s.modalPhoto}
                ></div>
              ) : (
                <FcBusinessman className={s.modalPhoto} />
              )}
            </div>
            <div className={s.modalInfoContent}>
              <div className={s.infoEmpInfo} style={{ width: "270px" }}>
                <div className={s.infoEmpInfoFlex}>
                  <div>이름 :</div>
                  <div>
                    {selectedEmpData && selectedEmpData.employeeVO.empName}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>소속 :</div>
                  <div>
                    {selectedEmpData &&
                      selectedEmpData.employeeVO.departmentVO.deptName}
                    {selectedEmpData && "/"}
                    {selectedEmpData &&
                      selectedEmpData.employeeVO.teamVO?.tmName}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>직급 :</div>
                  <div>
                    {selectedEmpData && selectedEmpData.employeeVO.pstnName}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>직무 :</div>
                  <div>
                    {selectedEmpData &&
                      selectedEmpData.employeeVO.jobVO.jobName}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>생년월일 :</div>
                  <div>
                    {selectedEmpData && selectedEmpData.employeeVO.brth}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>이메일 :</div>
                  <div>
                    {selectedEmpData && selectedEmpData.employeeVO.email}
                  </div>
                </div>
                <div className={s.infoEmpInfoFlex}>
                  <div>주소 :</div>
                  <div>
                    {selectedEmpData && selectedEmpData.employeeVO.addr}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.infoInputSpace}>
            <button
              className={`${s.confirmButton} ${s.button}`}
              onClick={onClose}
            >
              {closeContent}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default ProfileModal;
