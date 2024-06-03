import styles from "../project.module.css";
import { useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
import MainHeader from "./MainHeader";
export default function ProjectMain() {
  const [memo, setMemo] = useState();

  return (
    <>
      <MainHeader />
      <div style={{ backgroundColor: "#fff" }}>
        <div className={styles.gridComponent}>
          <MainInfo />
          <ChartContainer />
          <MainReadMe memo={memo} />
          <div>오</div>
        </div>
      </div>
    </>
  );
}
