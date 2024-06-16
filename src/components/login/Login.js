import { useRef } from "react";
import LoginFooter from "./LoginFooter";
import { useDispatch } from "react-redux";
import { getToken } from "../../http/userDetailHttp";
import s from "./login.module.css";
import { Input } from "antd";

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
      alert("사원번호를 입력하세요");
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
      <div className={s.container}>
        <div className={s.header}></div>
        <div className={s.item}></div>
        <div className={s.item}>
          <div className={s.loginForm}>
            <img className={s.logo2} src="/images/logo2.png" />

            <div className={s.leftForm}>
              <div className={s.formBackground}>
                <div className={s.inputText}>
                  <div className={s.id}>
                    <img className={s.loginLogo} src="/images/login.png" />
                    <Input
                      className={s.idIput}
                      type="text"
                      name="empId"
                      required
                      ref={empIdRef}
                      placeholder="로그인 이미지 구합니다"
                    />
                    <label htmlFor="empId">ID</label>
                    <span></span>
                  </div>
                  <div className={s.pwd}>
                    <img
                      className={s.passwordLogo}
                      src="/images/header-login.png"
                    />
                    <Input
                      className={s.pwdIput}
                      type="password"
                      name="pwd"
                      required
                      ref={passwordRef}
                      placeholder="혹시 다른곳 css이상하면 정세영한테"
                    />
                    <label htmlFor="pwd">PASSWORD</label>
                    <span></span>
                  </div>
                  <div className={s.loginBtn}>
                    <button
                      className={s.button}
                      type="button"
                      onClick={onLoginBtnClickHandler}
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.item}></div>
      </div>

      <LoginFooter />
    </>
  );
}
