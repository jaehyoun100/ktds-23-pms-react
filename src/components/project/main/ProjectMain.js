import styles from "../project.module.css";
import { useEffect, useMemo, useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import CalendarComponent from "./CalendarComponent";
export default function ProjectMain() {
  const [memo, setMemo] = useState();
  const [project, setProject] = useState();
  const [projectId, setProjectId] = useState();
  const [calData, setCalData] = useState();
  const [events, setEvents] = useState([]);
  const [isNeedRender, setNeedRender] = useState(false);
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
      const getPrjApi = async () => {
        const response = await fetch(
          `http://localhost:8080/api/project/view/${projectId}`,
          { headers: { Authorization: tokenInfo.token }, method: "GET" }
        );

        const json = await response.json();
        console.log(json);

        return json.body;
      };

      const getProject = async () => {
        const run = await getPrjApi();
        setProject(run);
        console.log(run, "!!!!!!!!!!");
        if (run.prjMemo !== null) {
          setMemo(run.prjMemo);
        }
      };
      getProject();
    }
  }, [projectId, tokenInfo.token]);
  useEffect(() => {
    if (projectId) {
      const getCalendarApi = async () => {
        const response = await fetch(
          `http://localhost:8080/api/project/calendar/${projectId}`,
          { headers: { Authorization: tokenInfo.token }, method: "GET" }
        );
        const json = await response.json();
        return json.body;
      };
      const getCalendar = async () => {
        const data = await getCalendarApi();
        // console.log(data);
        setCalData(data);
      };
      getCalendar();
    }
  }, [projectId, tokenInfo.token, isNeedRender]);

  useEffect(() => {
    setEvents([]);
    if (calData) {
      const sortedData = calData.sort(
        (a, b) => new Date(a.clndDate) - new Date(b.clndDate)
      );
      console.log(calData);
      for (let i of sortedData) {
        setEvents((prev) => [
          ...prev,
          { date: i.clndDate.split(" ")[0], memo: i.clndContent },
        ]);
      }
      setNeedRender(false);
    }
  }, [calData]);

  const saveMemo = async (date, memo) => {
    // 여기에 메모를 저장하는 로직 추가
    console.log("Saving memo:", date, memo);
    await fetch("http://localhost:8080/api/project/calendar", {
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenInfo.token,
      },
      method: "POST",
      body: JSON.stringify({
        clndDate: date,
        clndContent: memo,
        prjId: projectId,
      }),
    });
    setNeedRender(true);
  };

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
              <CalendarComponent
                events={events}
                saveMemo={saveMemo}
                isNeedRender={isNeedRender}
                setNeedRender={setNeedRender}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
