import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import ProjectMain from "../components/project/main/ProjectMain";

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
          path: "project",
          element: <ProjectMain />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
