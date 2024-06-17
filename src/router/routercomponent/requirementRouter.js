import { Outlet } from "react-router-dom";
import Requirement from "../../components/requirement/Requirement";
import RequirementView from "../../components/requirement/RequirementView";
import RequirementWrite from "../../components/requirement/RequirementWrite";

const requirementRouter = {
  path: "requirement/",
  element: <Outlet />,
  children: [
    {
      path: ":prjIdValue/",
      element: <Outlet />,
      children: [
        { index: true, element: <Requirement /> },
        { path: "write", element: <RequirementWrite /> },
      ],
    },
    { path: "view", element: <RequirementView /> },
  ],
};

export default requirementRouter;
