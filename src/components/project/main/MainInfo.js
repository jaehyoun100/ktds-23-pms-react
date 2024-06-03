import { useEffect } from "react";
import styles from "../project.module.css";
export default function MainInfo() {
  const prjId = "PRJ_240502_000243";
  useEffect(() => {
    const test = async () => {
      const response = await fetch(
        `http://loaclhost:8080/api/project/view/${prjId}`,
        {
          method: "GET",
        }
      );

      console.log(response);
      const json = await response.json();
      console.log(json);
      const project = json.body.projectVO;
      const projectTeammateCnt = json.body.projectTeammateCount;
      console.log(project, projectTeammateCnt);
      return json;
    };

    test();
  }, []);

  return (
    <>
      <div>오</div>
    </>
  );
}
