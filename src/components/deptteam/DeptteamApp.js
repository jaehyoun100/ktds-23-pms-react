import { useSelector } from "react-redux";
import DepartmentList from "./components/DepartmentList";

export default function DeptteamApp() {
  // const [token, setToken] = useState();
  const { token } = useSelector((state) => state.tokenInfo);

  return (
    <>
      <DepartmentList token={token} />
    </>
  );
}
