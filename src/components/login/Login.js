import { useRef } from "react";

export default function LoginPage({ setToken }) {
  const empIdRef = useRef();
  const passwordRef = useRef();

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
     * token 의 값을 브라우져의 로컬 스토리지에 저장한다
     */
    const json = await login(empId, password);

    if (json.message) {
      alert(json.message);
      return;
    } else {
      setToken(json.token);
      localStorage.setItem("token", json.token);
    }
  };

  const login = async (empId, pwd) => {
    const response = await fetch("http://localhost:8080/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        empId,
        pwd,
      }),
    });
    const json = await response.json();
    console.log(json);

    return json;
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
                <label for="empId">ID</label>
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
                <label for="pwd">PASSWORD</label>
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

      <div className="footer">
        <div>
          PMS 는 회사 임직원 관리, 비품 관리 및 예정 프로젝트를 관리하는
          프로그램입니다.
        </div>
        <div>
          로그인 후 이용하실 수 있으며 임/직원 신규 등록은
          경영지원부(tel:123-1234)로 문의 부탁드립니다.
        </div>
        <div>회사 정보(KtdsUniversity 이메일 : kwon@kt.ds)</div>
        <div>회사 주소 : 효령로 176</div>
        <div></div>
        <br />
        <br />
        <div>@COPYRIGHT KTDS UNIVERSITY 2008 ALL RIGHTS RESERVED.</div>
      </div>
    </>
  );
}
