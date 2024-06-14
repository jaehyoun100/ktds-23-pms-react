import { Outlet } from "react-router-dom";
import Output from "../../components/output/Output";
import OutputWrite from "../../components/output/OutputWrite";

const outputRouter = {
  path: "output/",
  element: <Outlet />,
  children: [
    // { index: true, element: <Output /> },
    { path: ":prjIdValue", element: <Output /> },
    { path: "write", element: <OutputWrite /> },
  ],
};

export default outputRouter;
