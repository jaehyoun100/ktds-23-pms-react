import { Outlet } from "react-router-dom";
import Requirement from "../../components/requirement/Requirement";
import RequirementView from "../../components/requirement/RequirementView";

const requirementRouter = {
  path: "requirement/",
  element: <Outlet />,
  children: [
    { index: true, element: <Requirement /> },
    { path: "view", element: <RequirementView /> },
  ],
};

export default requirementRouter;
