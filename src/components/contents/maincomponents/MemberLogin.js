import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import w from "./../ContentMain.module.css";
import photo from "../../../layout/sidebar/profile_icon.png";

const MemberLogin = () => {
  const [myDeptmate, setMyDeptmate] = useState([]);

  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  const url = "http://43.202.29.221";
  const userData = jwtDecode(tokenInfo.token).user;
  useEffect(() => {
    const getEmpData = async () => {
      const response = await fetch(
        `${url}/api/project/employee/login/findbydeptid/${userData?.deptId}`,
        {
          headers: {
            Authorization: tokenInfo.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json, "DRFGGFDDFG");
      setMyDeptmate(json.body);
    };
    getEmpData();
  }, [tokenInfo.token, userData?.deptId]);

  return (
    <div className={w.deptFlex}>
      {myDeptmate?.map((item, idx) => (
        <div key={idx}>
          <div
            style={{
              border: `2px solid ${item.lgnYn === "Y" ? "#71dd37" : "#777"}`,
              backgroundImage: item.originFileName
                ? `url(${item.originFileName}`
                : `url(${photo})`,
              opacity: item.lgnYn === "N" ? "0.5" : "1",
            }}
            className={w.deptMemberPhoto}
          ></div>
          <div
            className={w.deptMemberName}
            style={{
              color: ` ${item.lgnYn === "N" ? "#777" : "#000"}`,
            }}
          >
            {item.empName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberLogin;
