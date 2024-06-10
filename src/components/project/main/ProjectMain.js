import styles from "../project.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import CalendarComponent from "./CalendarComponent";
export default function ProjectMain() {
  const [events, setEvents] = useState([
    { id: 1, date: "2024-06-10", memo: "프로젝트 회의 1차" },
    { id: 2, date: "2024-06-15", memo: "프로젝트 회의 2차" },
    { id: 3, date: "2024-06-22", memo: "프로젝트 회의 3차" },
    { id: 4, date: "2024-06-27", memo: "고객사 방문후 검토" },
    { id: 5, date: "2024-07-04", memo: "프로젝트 중간 점검" },
    { id: 6, date: "2024-07-11", memo: "프로젝트 회의 4차" },
    { id: 7, date: "2024-07-20", memo: "프로젝트 최종 점검" },
  ]);

  const saveMemo = (date, memo) => {
    // 여기에 메모를 저장하는 로직 추가
    console.log("Saving memo:", date, memo);
  };

  const [memo, setMemo] = useState();
  const [project, setProject] = useState();
  const [projectId, setProjectId] = useState();
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  const location = useLocation();
  useMemo(() => {
    const item = location.state.key;
    setProjectId(item.prjId);
  }, [location.state.key]);
  useEffect(() => {
    if (projectId) {
      const test = async () => {
        const response = await fetch(
          `http://localhost:8080/api/project/view/${projectId}`,
          { headers: { Authorization: tokenInfo.token }, method: "GET" }
        );

        const json = await response.json();
        console.log(json);

        return json.body;
      };

      const getProject = async () => {
        const run = await test();
        setProject(run);
        console.log(run, "!!!!!!!!!!");
        if (run.prjMemo !== null) {
          setMemo(run.prjMemo);
        }
      };
      getProject();
    }
  }, [projectId, tokenInfo.token]);

  return (
    <>
      {project && (
        <>
          <MainHeader project={project} />
          <div style={{ backgroundColor: "#fff" }}>
            <div className={styles.gridComponent}>
              <MainInfo project={project} />
              <ChartContainer />
              <MainReadMe memo={memo} />
              <CalendarComponent events={events} saveMemo={saveMemo} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
