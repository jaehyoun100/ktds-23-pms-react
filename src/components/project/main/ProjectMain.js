import styles from "../project.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarComponent from "./CalendarComponent";
import {
  getCalendarApi,
  getPrjApi,
  postMemo,
  putMemo,
} from "../../../http/projectHttp";
export default function ProjectMain() {
  const [memo, setMemo] = useState();
  const [project, setProject] = useState();
  const [projectId, setProjectId] = useState();
  const [calData, setCalData] = useState();
  const [events, setEvents] = useState([]);
  const [isNeedRender, setNeedRender] = useState(false);
  const [isHaveData, setIsHaveData] = useState(false);
  const [allData, setAllData] = useState();
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate("/project/modify", { state: { allData } });
  };

  useMemo(() => {
    const item = location.state.key;
    console.log(item);
    setProjectId(item.prjId);
  }, [location.state.key]);

  const memoizedgetPrjApi = useCallback(getPrjApi, []);

  useEffect(() => {
    if (projectId) {
      const getProject = async () => {
        const run = await memoizedgetPrjApi(tokenInfo.token, projectId);
        setProject(run);
        setAllData(run);
        if (run.prjMemo !== null) {
          setMemo(run.prjMemo);
        }
      };
      getProject();
    }
  }, [projectId, tokenInfo.token, memoizedgetPrjApi]);

  const memoizedgetCalendarApi = useCallback(getCalendarApi, []);
  useEffect(() => {
    if (projectId) {
      const getCalendar = async () => {
        const data = await memoizedgetCalendarApi(tokenInfo.token, projectId);
        // console.log(data);
        setCalData(data);
      };
      getCalendar();
    }
  }, [projectId, tokenInfo.token, isNeedRender, memoizedgetCalendarApi]);

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

  const memoizedPutMemo = useCallback(putMemo, []);
  const memoizedPostMemo = useCallback(postMemo, []);

  const saveMemo = async (date, memo) => {
    if (isHaveData) {
      memoizedPutMemo(date, memo, projectId, tokenInfo.token);
    } else {
      memoizedPostMemo(date, memo, projectId, tokenInfo.token);
    }
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
              <ChartContainer
                chartData={project.chartData}
                totalEmpCnt={project.projectTeammateList.length}
              />
              <MainReadMe memo={memo} />

              <CalendarComponent
                events={events}
                saveMemo={saveMemo}
                isNeedRender={isNeedRender}
                setNeedRender={setNeedRender}
                setIsHaveData={setIsHaveData}
              />
            </div>
            <div className={styles.modifyButtonArea}>
              <button onClick={handleModifyClick}>프로젝트 수정</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
