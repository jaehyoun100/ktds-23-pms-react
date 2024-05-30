import { useState } from "react";
import LoginPage from "./components/login/Login";

function App() {
  const [token, setToken] = useState();

  return (
    <>
      {!token && <LoginPage setToken={setToken} />}
      {token && <div>ktds-23-pms-react</div>}
    </>
  );
}

export default App;
