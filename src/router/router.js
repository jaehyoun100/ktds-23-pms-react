import { createBrowserRouter } from "react-router-dom";

export default function RouterAppProvider() {
  const router = createBrowserRouter([
    /* 라우트 영역 */
  ]);

  return <RouterAppProvider router={router} />;
}
