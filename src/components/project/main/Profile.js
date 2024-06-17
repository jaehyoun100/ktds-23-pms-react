import React, { useState } from "react";
import s from "../project.module.css";
import ProfileModal from "./ProfileModal";
import { FcBusinessman } from "react-icons/fc";

const Profile = ({ profileFile, profileValue }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const onProfileClickHandler = () => {
    setShowModal(true);
    console.log(profileValue);
  };
  const styles = {
    backgroundImage: `url(${profileFile})`,
    backgroundSize: "contain",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  };
  const styles2 = {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  };

  return (
    <>
      {profileFile !== null ? (
        <div style={styles} onClick={onProfileClickHandler}></div>
      ) : (
        <FcBusinessman style={styles2} onClick={onProfileClickHandler} />
      )}
      <ProfileModal
        show={showModal}
        onClose={handleCloseModal}
        closeContent="확인"
        selectedEmpData={profileValue}
      />
    </>
  );
};

export default Profile;
