import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";
import Selectbox from "../../common/selectbox/Selectbox";
import SelectDate from "../../common/selectbox/SelectDate";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  getClient,
  getDept,
  getPmCandidates,
  getPrjInfo,
  modifyPrj,
} from "../../../http/projectHttp";

const ModifyProject = () => {
  const [isAddClient, setIsAddClient] = useState(false);
  const prjMemoRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [project, setProject] = useState();
  const [projectName, setProjectName] = useState();
  const prjNameRef = useRef();
  const [originClientName, setOriginClientName] = useState();
  const [originPrjMemoName, setOriginPrjMemoName] = useState();
  const [OriginDeptName, setOriginDeptName] = useState();
  const [originStrtDt, setOriginStrtDt] = useState();
  const [originEndDt, setOriginEndDt] = useState();
  const [originPm, setOriginPm] = useState();
  const [originStatus, setOriginStatus] = useState();
  const [projectId, setProjectId] = useState();
  const [canSave, setCanSave] = useState(true);
  const [editTitle, setEditTitle] = useState("");
  const [customerInfo, setCustomerInfo] = useState("");
  const location = useLocation();
  const allData = location.state || {};
  const [clientData, setClientData] = useState([]);
  const [clientSelectedData, setClientSelectedData] =
    useState(originClientName);

  const [deptData, setDeptData] = useState([]);
  const [deptSelectedData, setDeptSelectedData] = useState(OriginDeptName);
  const [dateInfo, setDateInfo] = useState("");

  const [pmCandidate, setPmCandidate] = useState([]);
  const [pmSelectedData, setPmSelectedData] = useState(originPm);
  const statusList = [
    { label: "분석중", value: 401 },
    { label: "설계중", value: 402 },
    { label: "개발중", value: 403 },
    { label: "단위테스트진행중", value: 404 },
    { label: "통합테스트진행중", value: 405 },
    { label: "오픈대기중", value: 406 },
    { label: "오픈", value: 407 },
    { label: "하자보수진행중", value: 408 },
    { label: "완료", value: 409 },
  ];
  const [status, setStatus] = useState();
  const [statusSelectedData, setStatusSelectedData] = useState(originStatus);

  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });
  useEffect(() => {
    prjNameRef.current.value = projectName || "";
    console.log(
      originClientName,
      originPm,
      originPrjMemoName,
      OriginDeptName,
      originStatus
    );
  }, [
    projectName,
    originClientName,
    originPm,
    originPrjMemoName,
    OriginDeptName,
    originStatus,
  ]);

  useMemo(() => {
    const { prjName } = allData?.allData;
    const { clientVO } = allData?.allData;
    const { deptVO } = allData?.allData;
    const { pm } = allData?.allData;
    const { prjId } = allData?.allData;
    const { strtDt } = allData?.allData;
    const { endDt } = allData?.allData;
    const { prjMemo } = allData?.allData;
    const { prjSts } = allData?.allData;
    const setPrjStatus = async () => {
      if (prjSts) {
        // const item = ;
        await setStatus(statusList.filter((item) => item.value == prjSts));
      }
    };
    console.log(status, "???");
    setPrjStatus();
    if (status) {
      setOriginStatus(status[0].label);
      setStatusSelectedData(status[0].value);
    }
    if (prjName) {
      setProjectName(prjName);
    }
    if (clientVO) {
      setOriginClientName(clientVO.clntName);
      setClientSelectedData(clientVO.clntId);
    }
    if (deptVO) {
      setOriginDeptName(deptVO.deptName);
      setDeptSelectedData(deptVO.deptId);
    }
    if (pm) {
      setOriginPm(pm.employeeVO.empName);
      setPmSelectedData(pm.employeeVO.empId);
    }
    if (prjId) {
      setProjectId(prjId);
    }
    if (strtDt) {
      setOriginStrtDt(strtDt);
      startDateRef.current = strtDt;
    }
    if (endDt) {
      setOriginEndDt(endDt);
      endDateRef.current = endDt;
    }
    if (prjMemo) {
      setOriginPrjMemoName(prjMemo);
      // endDateRef.current = setOriginEndDt;
    }
  }, [allData]);

  useEffect(() => {
    console.log(
      clientSelectedData,
      deptSelectedData,
      pmSelectedData,
      statusSelectedData
    );
  }, [
    clientSelectedData,
    deptSelectedData,
    pmSelectedData,
    statusSelectedData,
  ]);

  const memoizeGetPrjInfo = useCallback(getPrjInfo, []);
  useEffect(() => {
    if (projectId) {
      const getProject = async () => {
        const data = await memoizeGetPrjInfo(tokenInfo.token, projectId);
        setProject(data);
      };
      getProject();
    }
  }, [projectId, tokenInfo.token]);

  // 고객사 정보 가져오기
  const memoizeGetClient = useCallback(getClient, []);
  useEffect(() => {
    const getClient = async () => {
      await memoizeGetClient(tokenInfo.token, setClientData);
      await console.log(clientData);
      setIsAddClient(false);
    };
    getClient();
  }, [tokenInfo.token, isAddClient]);

  // 부서 정보 가져오기
  const memoizeGetDept = useCallback(getDept, []);
  useEffect(() => {
    const getDept = async () => {
      await memoizeGetDept(tokenInfo.token, setDeptData);
    };
    getDept();
  }, [tokenInfo.token]);

  // 부서에 따른 PM 후보자 가져오기
  const memoizeGetPmCandidates = useCallback(getPmCandidates, []);
  useEffect(() => {
    const getPm = async () => {
      memoizeGetPmCandidates(deptSelectedData, tokenInfo.token, setPmCandidate);
    };
    getPm();
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
    if (
      startDateRef.current === undefined ||
      endDateRef.current === undefined
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
  }, [
    clientSelectedData,
    deptSelectedData,
    pmSelectedData,
    dateInfo,
    originClientName,
    OriginDeptName,
    originPm,
    originPrjMemoName,
  ]);

  // 프로젝트 수정 버튼 클릭 핸들러
  const memoizeModifyPrj = useCallback(modifyPrj, []);
  const onClickModifyButtonHandler = async () => {
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

    const dataArray = {
      prjId: projectId,
      prjName: prjNameRef.current.value,
      clntInfo: clientSelectedData,
      deptId: deptSelectedData,
      pmId: pmSelectedData,
      prjSts: String(statusSelectedData),
      strtDt: startDateRef.current,
      endDt: endDateRef.current,
      prjMemo: prjMemoRef.current.value,
    };

    if (dataArray) {
      const json = await memoizeModifyPrj(
        tokenInfo.token,
        projectId,
        dataArray
      );
      if (json.status === 200) {
        alert("프로젝트 수정에 성공했습니다.");
        navigate("/project");
      }
    }
  };

  // 새로운 고객사 추가 핸들러

  return (
    <div className={styles.createContainer}>
      <h3 className={styles.createAndModify}>프로젝트 수정</h3>
      <div className={styles.modifyGrid}>
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
          </div>
        </div>
        <div>부서</div>
        <div>
          <Selectbox
            optionList={deptData}
            initial={OriginDeptName}
            setSelectedData={setDeptSelectedData}
            selectedData={deptSelectedData}
          />
        </div>
        <div>Project Manage</div>
        <div>
          <Selectbox
            initial={originPm}
            optionList={pmCandidate}
            setSelectedData={setPmSelectedData}
            selectedData={pmSelectedData}
          />
        </div>
        <div>프로젝트 상태</div>
        <div>
          {status && (
            <Selectbox
              initial={status[0].label}
              optionList={statusList}
              setSelectedData={setStatusSelectedData}
              selectedData={statusSelectedData}
            />
          )}
        </div>
        <div>프로젝트 기간</div>
        <div>
          <SelectDate
            onChangeSelect={onChangeSelect}
            onChangeHandler={(e) => setDateInfo(e.target.value)}
            startDateRef={startDateRef}
            endDateRef={endDateRef}
            defaultStart={originStrtDt}
            defaultEnd={originEndDt}
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
          {originStrtDt === undefined || originEndDt === undefined ? (
            <span className={styles.alertMessage}>
              ※ 시작날짜와 끝날짜는 필수 입력 값입니다.
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
            defaultValue={originPrjMemoName}
          ></textarea>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button onClickHandler={onClickModifyButtonHandler}>수정</Button>
      </div>
    </div>
  );
};

export default ModifyProject;
