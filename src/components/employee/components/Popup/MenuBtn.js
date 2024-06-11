import { Button } from "antd";
import { Link } from "react-router-dom";

export default function MenuBtn({ btnText }) {
  return (
    <Link to={"/employee"} style={{ float: "right" }}>
      <Button style={{ borderColor: "#fff" }}>{btnText || "목록"}</Button>
    </Link>
  );
}
