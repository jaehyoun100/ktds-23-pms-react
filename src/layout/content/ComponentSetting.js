import { useSelector } from "react-redux";
import LoginPage from "../../components/login/Login";
import RouterAppProvider from "../../router/router";

export default function ComponentSetting() {
  const { token } = useSelector((state) => state.tokenInfo);

  return (
    <>
      {!token && <LoginPage />}
      {token && (
        <div>
          <RouterAppProvider />
        </div>
      )}
    </>
  );
}
