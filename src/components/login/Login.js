import { useRef } from "react";
import LoginFooter from "./LoginFooter";
import { useDispatch } from "react-redux";
import { getToken } from "../../http/userDetailHttp";
import s from "./login.module.css";
import { Input } from "antd";
import logo from "../contents/Logo.png";

export default function LoginPage() {
  const empIdRef = useRef();
  const passwordRef = useRef();

  const tokenDispatch = useDispatch();

  const onLoginBtnClickHandler = async () => {
    const empId = empIdRef.current.input.value;
    const password = passwordRef.current.input.value;

    console.log(empId + "........." + password);
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
        <div className={s.header}>
          <img className={s.logo} src={logo} alt="로고 이미지" />
        </div>
        <div className={s.item}></div>
        <div className={s.item}>
          <div className={s.loginForm}>
            <div className={s.id}>
              <label htmlFor="empId">ID</label>
              <Input
                className={s.idIput}
                type="text"
                name="empId"
                required
                ref={empIdRef}
              />
              <span></span>
            </div>
            <div className={s.pwd}>
              <label htmlFor="pwd">PASSWORD</label>
              <Input
                className={s.pwdIput}
                type="password"
                name="pwd"
                required
                ref={passwordRef}
              />
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
        <div className={s.item}></div>
      </div>

      <LoginFooter />
    </>
  );
}
