import "../project.module.css";
import { useState } from "react";
import ChartContainer from "./ChartContainer";
import MainInfo from "./MainInfo";
import MainReadMe from "./MainReadMe";
export default function ProjectMain() {
  const [memo, setMemo] = useState();

  return (
    <>
      <div>
        <MainInfo />
        <ChartContainer />
        <MainReadMe memo={memo} />
      </div>
    </>
  );
}
