import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import EmployeeApp from "../components/employee/EmployeeApp";
import projectRouter from "./routercomponent/projectRouter";
import outputRouter from "./routercomponent/outputRouter";
import requirementRouter from "./routercomponent/requirementRouter";
import supplyRouter from "./routercomponent/supplyRouter";
import deptteamRouter from "./routercomponent/deptteamRouter";
import ReviewApp from "../components/review/ReviewApp";
import reviewRouter from "./routercomponent/reviewRouter";

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
        projectRouter,
        {
          path: "employee",
          element: <EmployeeApp />,
        },
        requirementRouter,
        outputRouter,
        supplyRouter,
        deptteamRouter,
        reviewRouter,
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
