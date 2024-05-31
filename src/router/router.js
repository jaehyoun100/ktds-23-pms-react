import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContentMain from "../layout/content/ContentMain";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import Main from "../components/project/main/Main";
import Requirement from "../components/requirement/Requirement";

export default function RouterAppProvider({ token }) {
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
      path: "requirement",
      element: <Requirement token={token} />,
    },
  ]);

  return <RouterProvider router={routers} />;
}
