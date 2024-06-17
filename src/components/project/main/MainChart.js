import styles from "../project.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MainChart({ completed, inProgress, children }) {
  const data = {
    labels: ["진행 완료", "진행중"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, inProgress],
        backgroundColor: ["#F5A49D", "#FFF5BC"],
        hoverBackgroundColor: ["#FF6A53", "#FFE8B5"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <div
        style={{
          textAlign: "center",
          color:
            completed || inProgress
              ? "var(--main-color)"
              : "var(--third-color)",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        {`[ `}
        {children}
        {` ]`}
      </div>
      {completed || inProgress ? (
        <Pie data={data} options={options} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--third-color)",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "var(--third-color)",
            }}
          >
            데이터 없음
          </div>
        </div>
      )}
    </div>
  );
}
