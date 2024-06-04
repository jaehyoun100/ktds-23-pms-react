import React from "react";
import s from "../project.module.css";

const Profile = ({ profileFile }) => {
  const styles = {
    backgroundImage: `url(${
      profileFile !== null
        ? profileFile
        : "https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171"
    })`,
    backgroundSize: "contain",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  };

  return <div style={styles}></div>;
};

export default Profile;
