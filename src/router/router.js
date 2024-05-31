import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    /* 라우트 영역 */
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFoundError />,
    },
    {
      path: "survey",
      element: <SurveyApp />,
    },
  ]);

  return <RouterProvider router={routers} />;
}
