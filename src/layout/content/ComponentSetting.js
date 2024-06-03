import { useSelector } from "react-redux";
import LoginPage from "../../components/login/Login";
import RouterAppProvider from "../../router/router";

export default function ComponentSetting() {
  const loginState = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  return (
    <>
      {!loginState.token && <LoginPage />}
      {loginState.token && (
        <div>
          <RouterAppProvider />
        </div>
      )}
    </>
  );
}
