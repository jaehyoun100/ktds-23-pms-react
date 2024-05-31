import { useState } from "react";
import LoginPage from "./components/login/Login";
import RouterAppProvider from "./router/router";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      {!token && <LoginPage setToken={setToken} />}
      {token && (
        <div>
          <RouterAppProvider />
        </div>
      )}
    </>
  );
}

export default App;
