import DepartmentList from "./components/DepartmentList";

export default function DeptteamApp() {
  // const [token, setToken] = useState();
  const token = localStorage.getItem("token");

  return (
    <>
      <DepartmentList token={token} />
    </>
  );
}
