import { useState } from "react";
import LoginPage from "./components/login/Login";
import RouterAppProvider from "./router/router";
import SupplyApp from "./components/supply/SupplyApp";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      {!token && <LoginPage setToken={setToken} />}
      {token && <SupplyApp token={token} />}
    </>
  );
}

export default App;
