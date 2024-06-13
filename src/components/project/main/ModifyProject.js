import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";
import Selectbox from "../../common/selectbox/Selectbox";
import SelectDate from "../../common/selectbox/SelectDate";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const ModifyProject = () => {
  const [isAddClient, setIsAddClient] = useState(false);
  const prjMemoRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [project, setProject] = useState();
  const [projectName, setProjectName] = useState();
  const prjNameRef = useRef();
  const [originClientName, setOriginClientName] = useState();
  const [OriginDeptName, setOriginDeptName] = useState();
  const [originPm, setOriginPm] = useState();
  const [projectId, setProjectId] = useState();
  const [canSave, setCanSave] = useState(true);
  const [editTitle, setEditTitle] = useState("");
  const [customerInfo, setCustomerInfo] = useState("");
  const location = useLocation();
  const allData = location.state || {};
  useEffect(() => {
    prjNameRef.current.value = projectName || "";
  }, [projectName]);
  useMemo(() => {
    const { prjName } = allData?.allData;
    const { clientVO } = allData?.allData;
    const { deptVO } = allData?.allData;
    const { pm } = allData?.allData;
    const { prjId } = allData?.allData;
    if (prjName) {
      setProjectName(prjName);
    }
    if (clientVO) {
      setOriginClientName(clientVO.clntName);
    }
    if (deptVO) {
      setOriginDeptName(deptVO.deptName);
    }
    if (pm) {
      setOriginPm(pm.employeeVO.empName);
    }
    if (prjId) {
      setProjectId(prjId);
    }
  }, [allData]);

  // 고객사 추가 정보
  const titleRef = useRef();
  const cntctRef = useRef();
  const memoRef = useRef();

  const [clientData, setClientData] = useState([]);
  const [clientSelectedData, setClientSelectedData] =
    useState("고객사를 선택해주세요.");

  const [deptData, setDeptData] = useState([]);
  const [deptSelectedData, setDeptSelectedData] =
    useState("부서를 선택해주세요.");
  const [dateInfo, setDateInfo] = useState("");

  const [pmCandidate, setPmCandidate] = useState([]);
  const [pmSelectedData, setPmSelectedData] = useState("PM을 선택해주세요");

  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    if (projectId) {
      const getPrjApi = async () => {
        const response = await fetch(
          `http://localhost:8080/api/project/view/${projectId}`,
          { headers: { Authorization: tokenInfo.token }, method: "GET" }
        );

        const json = await response.json();
        console.log(json);

        return json.body;
      };

      const getProject = async () => {
        const run = await getPrjApi();
        setProject(run);

        console.log(run, "!!!!!!!!!!");
      };
      getProject();
    }
  }, [projectId, tokenInfo.token]);

  // 고객사 정보 가져오기
  useEffect(() => {
    const getClient = async () => {
      const response = await fetch("http://localhost:8080/api/project/client", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      const list = json.body.map((client) => ({
        label: client.clntName,
        value: client.clntId,
      }));
      setClientData(list);
    };
    getClient();
    setIsAddClient(false);
  }, [tokenInfo.token, isAddClient]);

  // 부서 정보 가져오기
  useEffect(() => {
    const getDept = async () => {
      const response = await fetch("http://localhost:8080/api/v1/department", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      const list = json.body.map((dept) => ({
        label: dept.deptName,
        value: dept.deptId,
      }));
      setDeptData(list);
    };
    getDept();
  }, [tokenInfo.token]);

  // 부서에 따른 PM 후보자 가져오기
  useEffect(() => {
    const getPmCandidates = async () => {
      if (deptSelectedData === "부서를 선택해주세요.") return;

      const response = await fetch(
        `http://localhost:8080/api/project/employee/findbydeptid/${deptSelectedData}`,
        { headers: { Authorization: tokenInfo.token }, method: "GET" }
      );
      const json = await response.json();
      const list = json.body.map((employee) => ({
        label: employee.empName,
        value: employee.empId,
      }));
      setPmCandidate(list);
    };

    getPmCandidates();
  }, [deptSelectedData, tokenInfo.token]);

  // 날짜 선택 변경 시 처리
  const onChangeSelect = () => {
    if (
      startDateRef.current &&
      endDateRef.current &&
      startDateRef.current > endDateRef.current
    ) {
      setCanSave(false);
      return;
    }
    setCanSave(true);
  };

  const navigate = useNavigate();

  // 프로젝트명 유효성 검사
  useEffect(() => {
    if (
      prjNameRef.current &&
      (prjNameRef.current.value === "" || prjNameRef.current.value.length > 30)
    ) {
      setCanSave(false);
      return;
    }
    if (
      startDateRef.current &&
      endDateRef.current &&
      startDateRef.current > endDateRef.current
    ) {
      setCanSave(false);
      return;
    }

    setCanSave(true);
  }, [prjNameRef.current?.value]);

  // 유효성 검사: 고객사, 부서, PM 선택 확인
  useEffect(() => {
    if (
      clientSelectedData === "고객사를 선택해주세요." ||
      deptSelectedData === "부서를 선택해주세요." ||
      pmSelectedData === "PM을 선택해주세요"
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [clientSelectedData, deptSelectedData, pmSelectedData]);

  // 프로젝트 생성 버튼 클릭 핸들러
  const onClickCreateButtonHandler = async () => {
    if (!canSave) {
      alert("형식에 맞춰 재입력 후 저장해주세요.");
      return;
    }
    if (clientSelectedData === "고객사를 선택해주세요.") {
      return;
    }
    if (deptSelectedData === "부서를 선택해주세요.") {
      return;
    }
    if (pmSelectedData === "PM을 선택해주세요") {
      return;
    }
    const response = await fetch(
      `http://localhost:8080/api/project/write/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenInfo.token,
        },
        body: JSON.stringify({
          prjId: projectId,
          prjName: prjNameRef.current.value,
          clntInfo: clientSelectedData,
          deptId: deptSelectedData,
          pmId: pmSelectedData,
          strtDt: startDateRef.current,
          endDt: endDateRef.current,
          prjMemo: prjMemoRef.current.value,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.status === 200) {
      alert("프로젝트 생성에 성공했습니다.");
      navigate("/project");
    }
  };

  // 고객사 추가 모달 관련 상태
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleOpenModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowInfoModal(false);
  };

  // 새로운 고객사 추가 핸들러
  const onClickCreateNewClientHandler = async () => {
    handleOpenModal();
  };

  // 모달 내에서 고객사 추가 확인 버튼 핸들러
  const handleConfirm = async () => {
    console.log(canSave);
    if (!canSave) {
      alert("형식에 맞춰 재입력 후 저장해주세요.");
      return;
    }
    const response = await fetch("http://localhost:8080/api/project/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenInfo.token,
      },
      body: JSON.stringify({
        clntName: titleRef.current.value,
        cntct: cntctRef.current.value,
        info: memoRef.current.value,
      }),
    });
    const json = await response.json();
    if (json.status === 200) {
      alert("고객사를 추가했습니다.");
      setShowInfoModal(false);
      titleRef.current.value = "";
      cntctRef.current.value = "";
      memoRef.current.value = "";
    }

    setIsAddClient(true);
  };

  return (
    <div className={styles.createContainer}>
      <h3 className={styles.createAndModify}>프로젝트 수정</h3>
      <div className={styles.createGrid}>
        <div>프로젝트명</div>
        <div>
          <TextInput
            id="prjName"
            onChangeHandler={(e) => setEditTitle(e.target.value)}
            ref={prjNameRef}
          />
          {prjNameRef.current &&
          prjNameRef.current.value &&
          prjNameRef.current.value.length > 30 ? (
            <span className={styles.alertMessage}>
              ※ 프로젝트명은 30자를 초과할 수 없습니다.
            </span>
          ) : (
            <></>
          )}
          {prjNameRef.current &&
          (prjNameRef.current.value === null ||
            prjNameRef.current.value === "") ? (
            <span className={styles.alertMessage}>
              ※ 프로젝트명은 필수 값입니다.
            </span>
          ) : (
            <></>
          )}
        </div>
        <div>고객사</div>
        <div>
          <div className={styles.displayInfoFlex}>
            <Selectbox
              initial={originClientName}
              optionList={clientData}
              setSelectedData={setClientSelectedData}
              selectedData={clientSelectedData}
              onChangeHandler={(e) => setCustomerInfo(e.target.value)}
            />
            <Button onClickHandler={onClickCreateNewClientHandler}>
              고객사 관리
            </Button>
          </div>
          {clientSelectedData === "고객사를 선택해주세요." ? (
            <span className={styles.alertMessage}>
              ※ 고객사는 필수 항목입니다.
            </span>
          ) : (
            <></>
          )}
        </div>
        <div>부서</div>
        <div>
          <Selectbox
            optionList={deptData}
            initial={OriginDeptName}
            setSelectedData={setDeptSelectedData}
            selectedData={deptSelectedData}
          />
          {deptSelectedData === "부서를 선택해주세요." ? (
            <span className={styles.alertMessage}>
              ※ 부서는 필수 항목입니다.
            </span>
          ) : (
            <></>
          )}
        </div>
        <div>Project Manage</div>
        <div>
          <Selectbox
            initial={originPm}
            optionList={pmCandidate}
            setSelectedData={setPmSelectedData}
            selectedData={pmSelectedData}
          />
          {pmSelectedData === "PM을 선택해주세요" ? (
            <span className={styles.alertMessage}>※ PM은 필수 항목입니다.</span>
          ) : (
            <></>
          )}
        </div>
        <div>프로젝트 기간</div>
        <div>
          <SelectDate
            onChangeSelect={onChangeSelect}
            onChangeHandler={(e) => setDateInfo(e.target.value)}
            startDateRef={startDateRef}
            endDateRef={endDateRef}
          />
          {startDateRef.current &&
          endDateRef.current &&
          startDateRef.current > endDateRef.current ? (
            <span className={styles.alertMessage}>
              ※ 끝 날짜는 시작날짜보다 이전일 수 없습니다.
            </span>
          ) : (
            <></>
          )}
        </div>
        <div>Project Readme</div>
        <div className={styles.contentBoxContainer}>
          <textarea
            className={styles.contentBox}
            id="prjMemo"
            ref={prjMemoRef}
          ></textarea>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button onClickHandler={onClickCreateButtonHandler}>수정</Button>
      </div>
    </div>
  );
};

export default ModifyProject;
