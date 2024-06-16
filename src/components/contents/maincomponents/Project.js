import w from "../ContentMain.module.css";
import p from "./project.module.css";
import CalendarComponent from "../../project/main/CalendarComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectSubChart from "../../project/main/ProjectSubChart";
import { format } from "date-fns";

export function MainProject() {
  const [myProject, setMyProject] = useState();
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://localhost:8080/api/project/search", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      const dataOfMyProject = json.body[1].projectList;

      setMyProject(dataOfMyProject);
      return dataOfMyProject;
    };

    getList();
  }, [tokenInfo.token]);
  return (
    <>
      <div className={w.cardBodyContent}></div>
      <div style={{ gridColumn: "1/-1" }}>
        <div className={p.overflowProTable}>
          <table className={p.proTable}>
            <thead className={p.proTableThead}>
              <tr>
                <th style={{ width: "15%" }}>프로젝트명</th>
                <th style={{ width: "15%" }}>고객사</th>
                <th style={{ width: "20%" }}>진행상황</th>
                <th style={{ width: "15%" }}>프로젝트 기한</th>
                <th style={{ width: "35%" }}> 진행정도</th>
              </tr>
            </thead>
            <tbody>
              {myProject &&
                myProject.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.prjName}</td>
                    <td>{item.clientVO.clntName}</td>
                    <td>{item.prjStsCode.cmcdName}</td>
                    <td>
                      {new Date(item.endDt) >= new Date()
                        ? "D-" + format(new Date(item.endDt) - new Date(), "d")
                        : "마감"}
                    </td>
                    <td>
                      <ProjectSubChart
                        totalTasks={item.chartData[0]}
                        completedTasks={item.chartData[1]}
                        plusStyles={{ width: "300px" }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function MainCalendar() {
  const [prjList, setPrjList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    setSortedList([]);
    setSortedList(prjList.sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, [prjList]);

  useEffect(() => {
    const getList = async () => {
      const res = await fetch(
        "http://localhost:8080/api/project/upcoming/event",
        {
          headers: { Authorization: tokenInfo.token },
          method: "GET",
        }
      );
      const json = await res.json();
      setPrjList([]);
      for (let item of json.body) {
        new Date(item.strtDt) >= new Date() &&
          setPrjList((prev) => [
            ...prev,
            {
              date: item.strtDt,
              memo: item.prjName + " 시작일",
            },
          ]);
        new Date(item.endDt) >= new Date() &&
          setPrjList((prev) => [
            ...prev,
            {
              date: item.endDt,
              memo: item.prjName + " 마감일",
            },
          ]);
      }
    };
    getList();
  }, [tokenInfo.token]);
  return (
    <>
      <div className={w.cardBodyContent}></div>

      <div style={{ gridColumn: "1/-1" }}>
        {/* <div className={w.commonDashboardCont}> */}
        {/* <FaRegCalendarAlt FaRegCalendarCheck className={w.icons} /> 달력 */}
        <CalendarComponent main events={sortedList} />
        {/* </div> */}
      </div>
    </>
  );
}
export function MainScaduale() {
  return (
    <>
      <div className={w.cardBodyContent}></div>
    </>
  );
}

export function MenuProject() {
  return (
    <>
      <div className={w.cardBodyContent}></div>
    </>
  );
}
