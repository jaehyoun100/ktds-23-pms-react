import MainChart from "./MainChart";
import styles from "../project.module.css";

export default function ChartContainer({ chartData, totalEmpCnt }) {
  // const [chartData1, setChartData1] = useState({ completed: 30, inProgress: 20 });
  // const [chartData2, setChartData2] = useState({ completed: 40, inProgress: 10 });
  const completed1 = chartData[5];
  const completed2 = chartData[2];
  const completed3 = chartData[3];
  const inProgress1 = chartData[4] - chartData[5];
  const inProgress2 = totalEmpCnt - completed2;
  const inProgress3 = totalEmpCnt - completed3;

  console.log(completed1, inProgress1);

  // useEffect(() => {
  //   // 첫 번째 데이터 셋을 가져오는 API 호출
  //   const fetchData1 = async () => {
  //     try {
  //       const response = await axios.get("https://api.example.com/tasks1");
  //       const data = response.data;

  //       const completed = data.filter(
  //         (task) => task.status === "completed"
  //       ).length;
  //       const inProgress = data.filter(
  //         (task) => task.status === "in-progress"
  //       ).length;

  //       setChartData1({ completed, inProgress });
  //     } catch (error) {
  //       console.error("Error fetching the data for chart 1", error);
  //     }
  //   };

  //   // 두 번째 데이터 셋을 가져오는 API 호출
  //   const fetchData2 = async () => {
  //     try {
  //       const response = await axios.get("https://api.example.com/tasks2");
  //       const data = response.data;

  //       const completed = data.filter(
  //         (task) => task.status === "completed"
  //       ).length;
  //       const inProgress = data.filter(
  //         (task) => task.status === "in-progress"
  //       ).length;

  //       setChartData2({ completed, inProgress });
  //     } catch (error) {
  //       console.error("Error fetching the data for chart 2", error);
  //     }
  //   };

  //   fetchData1();
  //   fetchData2();
  // }, []);
  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        marginTop: "80px",
      }}
    >
      <MainChart completed={completed1} inProgress={inProgress1}>
        이슈관리
      </MainChart>
      <MainChart completed={completed2} inProgress={inProgress2}>
        설문
      </MainChart>
      <MainChart completed={completed3} inProgress={inProgress3}>
        후기
      </MainChart>
    </div>
  );
}
