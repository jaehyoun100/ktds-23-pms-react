import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentMain from "../layout/content/ContentMain";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import Main from "../components/project/main/Main";
import EmployeeApp from "../components/employee/EmployeeApp";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    /* 라우트 영역 */
    {
      path: "/",
      element: <ContentMain />,
      errorElement: <NotFoundError />,
    },
    {
      path: "survey",
      element: <SurveyApp />,
    },
    {
      path: "project",
      element: <Main />,
    },
    {
      path: "employee",
      element: <EmployeeApp />,
    },
  ]);

  return <RouterProvider router={routers} />;
}
