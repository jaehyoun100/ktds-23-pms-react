import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentMain from "../layout/content/ContentMain";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";

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
  ]);

  return <RouterProvider router={routers} />;
}
