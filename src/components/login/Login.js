import { useRef } from "react";
import LoginFooter from "./LoginFooter";
import { useDispatch } from "react-redux";
import { getToken } from "../../http/userDetailHttp";

export default function LoginPage() {
  const empIdRef = useRef();
  const passwordRef = useRef();

  const tokenDispatch = useDispatch();

  const onLoginBtnClickHandler = async () => {
    const empId = empIdRef.current.value;
    const password = passwordRef.current.value;
    /**
     * 들어온 email과 password의 값이 올바른지 확인한다
     */
    if (!empId) {
      alert("이메일을 입력하세요");
      empIdRef.current.focus();
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요");
      passwordRef.current.focus();
      return;
    }

    /**
     * token 의 값을 가져와서 브라우져의 로컬 스토리지에 저장한다
     */
    tokenDispatch(getToken(empId, password));
  };

  return (
    <>
      <div className="container">
        <div className="item header"></div>
        <div className="item"></div>
        <div className="item">
          <input type="hidden" name="next" id="next" />
          <div className="leftForm"></div>
          <div className="formBackground">
            <div className="inputText">
              <div className="id">
                {/* <img className="loginLogo" src="/images/login.png" /> */}
                <input
                  id="empId"
                  type="text"
                  name="empId"
                  required
                  ref={empIdRef}
                />
                <label htmlFor="empId">ID</label>
                <span></span>
              </div>
              <div className="pwd">
                {/* <img
                    className="passwordLogo"
                    src="/images/header-login.png"
                  /> */}
                <input
                  id="pwd"
                  type="password"
                  name="pwd"
                  required
                  ref={passwordRef}
                />
                <label htmlFor="pwd">PASSWORD</label>
                <span></span>
              </div>
              <div className="login-btn">
                <button type="button" onClick={onLoginBtnClickHandler}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="item"></div>
      </div>

      <LoginFooter />
    </>
  );
}
