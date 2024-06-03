import "../project.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MainChart({ completed, inProgress }) {
  const data = {
    labels: ["Completed", "In Progress"],
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
      <Pie data={data} options={options} />
    </div>
  );
}
