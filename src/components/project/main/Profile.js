import React, { useState } from "react";
import s from "../project.module.css";
import ProfileModal from "./ProfileModal";
import photo from "../../../layout/sidebar/profile_icon.png";

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
    backgroundImage: `url(${profileFile !== null ? profileFile : photo})`,
    backgroundSize: "contain",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  };

  return (
    <>
      <div style={styles} onClick={onProfileClickHandler}></div>
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
