import { Outlet } from "react-router-dom";
import Requirement from "../../components/requirement/Requirement";
import RequirementView from "../../components/requirement/RequirementView";
import RequirementWrite from "../../components/requirement/RequirementWrite";

const requirementRouter = {
  path: "requirement/",
  element: <Outlet />,
  children: [
    { index: true, element: <Requirement /> },
    { path: "view", element: <RequirementView /> },
    { path: "write", element: <RequirementWrite /> },
  ],
};

export default requirementRouter;
