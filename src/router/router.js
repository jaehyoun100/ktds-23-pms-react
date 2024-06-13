import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import projectRouter from "./routercomponent/projectRouter";
import outputRouter from "./routercomponent/outputRouter";
import requirementRouter from "./routercomponent/requirementRouter";
import supplyRouter from "./routercomponent/supplyRouter";
import deptteamRouter from "./routercomponent/deptteamRouter";
import reviewRouter from "./routercomponent/reviewRouter";
import surveyRouter from "./routercomponent/surveyRouter";
import memoRouter from "./routercomponent/memoRouter";
import employeeRouter from "./routercomponent/employeeRouter";
import rentalSupplyRouter from "./routercomponent/rentalSupplyRouter";
import knowledgeRounter from "./routercomponent/knowledgeRouter";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    /* 라우트 영역 */
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFoundError />,
      children: [
        projectRouter,
        employeeRouter,
        requirementRouter,
        outputRouter,
        rentalSupplyRouter,
        supplyRouter,
        deptteamRouter,
        reviewRouter,
        memoRouter,
        surveyRouter,
        knowledgeRounter,
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
