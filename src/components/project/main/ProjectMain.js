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
      if (projectId) {
        const getProject = async () => {
          const run = await test();
          setProject(run);
          setMemo(run.prjMemo);
        };
        getProject();
      }
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
