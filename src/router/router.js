import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentMain from "../layout/content/ContentMain";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import Main from "../components/project/main/Main";

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
  ]);

  return <RouterProvider router={routers} />;
}
