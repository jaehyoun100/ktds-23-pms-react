import styles from "../project.module.css";
import { useEffect, useMemo, useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
export default function ProjectMain() {
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
    const { item } = location.state.key;
    console.log(item, "item");
    setProjectId(item.prjId);
  }, [location.state.key]);
  useEffect(() => {
    const test = async () => {
      console.log("!!!!!!!!!", projectId, "prjID!!");
      const response = await fetch(
        `http://localhost:8080/api/project/view/${projectId}`,
        { headers: { Authorization: tokenInfo.token }, method: "GET" }
      );

      console.log(response);
      const json = await response.json();
      console.log(json);
      const project = json.body.projectVO;
      const projectTeammateCnt = json.body.projectTeammateCount;
      console.log(project, projectTeammateCnt);
      return json;
    };
    if (projectId) {
      const getProject = async () => {
        const run = await test();
        setProject(run.body);
        setMemo(run.body.prjMemo);
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
              {memo && <MainReadMe memo={memo} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
