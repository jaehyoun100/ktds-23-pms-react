import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import ProjectMain from "../components/project/main/ProjectMain";
import ProjectListApp from "../components/project/projectlist/ProjectListApp";
import EmployeeApp from "../components/employee/EmployeeApp";
import Requirement from "../components/requirement/Requirement";
import Output from "../components/output/Output";
import requirementRouter from "./routercomponent/requirementRouter";
import outputRouter from "./routercomponent/outputRouter";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    /* 라우트 영역 */
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFoundError />,
      children: [
        {
          path: "survey",
          element: <SurveyApp />,
        },
        {
          path: "project/",
          children: [
            { index: true, element: <ProjectListApp /> },
            { path: "view", element: <ProjectMain /> },
          ],
        },
        {
          path: "employee",
          element: <EmployeeApp />,
        },
        requirementRouter,
        outputRouter,
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
