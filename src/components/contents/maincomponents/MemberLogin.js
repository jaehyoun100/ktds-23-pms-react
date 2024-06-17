import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import w from "./../ContentMain.module.css";
import { FcBusinessman } from "react-icons/fc";

const MemberLogin = () => {
  const [myDeptmate, setMyDeptmate] = useState([]);
  console.log(myDeptmate);
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  const url =
    "http://" +
    (window.location.host === "43.202.29.221"
      ? "43.202.29.221"
      : "localhost:8080");
  const userData = jwtDecode(tokenInfo.token).user;
  useEffect(() => {
    const getEmpData = async () => {
      const response = await fetch(
        `${url}/api/project/employee/findbydeptid/${userData?.deptId}`,
        {
          headers: {
            Authorization: tokenInfo.token,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const json = await response.json();
      setMyDeptmate(json.body);
    };
    getEmpData();
  }, [tokenInfo.token]);

  return (
    <div className={w.deptFlex}>
      {myDeptmate?.map((item, idx) => (
        <div key={idx}>
          {item?.originFileName ? (
            <div
              style={{
                border: `2px solid ${item.lgnYn === "Y" ? "#71dd37" : "#777"}`,
                backgroundImage: `url(${item.originFileName}`,
                opacity: item.lgnYn === "N" ? "0.5" : "1",
              }}
              className={w.deptMemberPhoto}
            ></div>
          ) : (
            <FcBusinessman
              style={{
                border: `2px solid ${item.lgnYn === "Y" ? "#71dd37" : "#777"}`,
                opacity: item.lgnYn === "N" ? "0.5" : "1",
              }}
              className={w.deptMemberPhoto}
            />
          )}
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
