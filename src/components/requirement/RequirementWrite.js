import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  loadForWriteRequirementData,
  loadTeamListByPrjId,
  writeRequirement,
} from "../../http/requirementHttp";
import styles from "./requirement.module.css";
import ConfirmModal from "../common/modal/ConfirmModal";
import AlertModal from "../common/modal/AlertModal";

export default function RequirementWrite() {
  const [writeRequirementData, setWriteRequirementData] = useState({
    projectList: [], // 프로젝트 리스트
    scdSts: [], // 일정상태
    rqmSts: [], // 진행상태
  });
  const [empData, setEmpData] = useState();
  const [writeErrors, setWriteErrors] = useState({
    rqmTtl: [], // 제목
    prjId: [], // 프로젝트
    dvlrp: [], // 담당개발자
    cfrmr: [], // 확인자
    tstr: [], // 테스터
    strtDt: [], // 시작일
    endDt: [], // 종료예정일
    rqmCntnt: [], // 요구사항 내용
    scdSts: [], // 일정상태
    rqmSts: [], // 진행상태
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const query = new URLSearchParams(useLocation().search);
  // const prjNameValue = query.get("prjName");

  const location = useLocation();
  const projectValue = location.state || {};
  console.log(">>>>>>>>>>", projectValue.project);
  console.log(">>>>>>>>>>", projectValue.project.prjName);

  const token = localStorage.getItem("token");

  // 오늘 날짜로 기본설정
  const today = new Date().toISOString().substring(0, 10);

  // FormData 전송을 위한 Ref
  const rqmTtlRef = useRef(); // 요구사항 제목
  const prjIdRef = useRef(); // 프로젝트 ID
  const dvlrpRef = useRef(); // 담당 개발자
  const cfrmrRef = useRef(); // 확인자
  const tstrRef = useRef(); // 테스터
  const strtDtRef = useRef(); // 시작일
  const endDtRef = useRef(); // 종료 예정일
  const fileRef = useRef(); // 첨부파일
  const rqmCntntRef = useRef(); // 내용
  const scdStsRef = useRef(); // 일정상태
  const rqmStsRef = useRef(); // 진행상태

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const { prjIdValue } = useParams();

  const onClickHandler = () => {
    navigate(`/requirement/${prjIdValue}`, {
      state: { project: projectValue.project },
    });
  };

  useEffect(() => {
    const getProjectTeammate = async () => {
      // 프로젝트 ID를 통해서 팀원들의 정보 가져오기
      const json = await loadTeamListByPrjId(token, prjIdValue);
      // 받아온 값 처리

      const { body: data } = json;

      // for (let i = 0; i < data.length; i++) {
      //   arr.push(data[i].employeeVO.empName);
      // }
      const arr = data.map((item) => item.employeeVO);
      // console.log(arr);
      setEmpData(arr);
    };
    getProjectTeammate();
  }, [token, prjIdValue]);

  const startDayHandler = (event) => {
    const dayValue = event.target.value;

    if (dayValue < today) {
      // Alert창 띄우기
      handleOpenModal();
      event.target.value = today;
      console.log(">>>>>", showModal);
    }
  };
  const endDayHandler = (event) => {
    const dayValue = event.target.value;

    if (dayValue < today) {
      // Alert창 띄우기
      handleOpenModal();
      event.target.value = today;
    }
  };

  const onWriteClickHandler = async () => {
    const check = window.confirm("등록하시겠습니까?");
    if (check) {
      setWriteErrors({
        rqmTtl: [],
        prjId: [],
        dvlrp: [],
        cfrmr: [],
        tstr: [],
        strtDt: [],
        endDt: [],
        rqmCntnt: [],
        scdSts: [],
        rqmSts: [],
      });

      const rqmTtl = rqmTtlRef.current.value; // 제목
      const prjId = prjIdValue; // 프로젝트 ID
      const dvlrp = dvlrpRef.current.value; // 담당 개발자
      const cfrmr = cfrmrRef.current.value; // 확인자
      const tstr = tstrRef.current.value; // 테스터
      const strtDt = strtDtRef.current.value; // 시작일
      const endDt = endDtRef.current.value; // 종료 예정일
      const file =
        fileRef.current.files[0] === undefined
          ? null
          : fileRef.current.files[0]; // 첨부파일
      const rqmCntnt = rqmCntntRef.current.value; // 요구사항 내용
      const scdSts = scdStsRef.current.value; // 일정상태
      const rqmSts = rqmStsRef.current.value; // 진행상태

      const formData = new FormData();
      formData.append("rqmTtl", rqmTtl);
      formData.append("prjId", prjId);
      formData.append("dvlrp", dvlrp);
      formData.append("cfrmr", cfrmr);
      formData.append("tstr", tstr);
      formData.append("strtDt", strtDt);
      formData.append("endDt", endDt);
      formData.append("file", file);
      formData.append("rqmCntnt", rqmCntnt);
      formData.append("scdSts", scdSts);
      formData.append("rqmSts", rqmSts);

      const json = await writeRequirement(token, formData);
      if (json.body === true) {
        navigate(`/requirement/${prjIdValue}`, {
          state: { project: projectValue.project },
        });
      }
      if (json.body !== (true || false)) {
        setWriteErrors(json.body);
      }
    }
  };

  // 등록 버튼 누를 시 Confirm Modal창 열기
  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // Confirm Modal 창에서 "아니오" 클릭 시 Modal 창 닫힘
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // Confirm Modal 창에서 "예" 클릭 시 목록으로 이동
  const handleConfirm = async () => {
    setWriteErrors({
      rqmTtl: [],
      prjId: [],
      dvlrp: [],
      cfrmr: [],
      tstr: [],
      strtDt: [],
      endDt: [],
      rqmCntnt: [],
      scdSts: [],
      rqmSts: [],
    });

    const rqmTtl = rqmTtlRef.current.value; // 제목
    const prjId = prjIdValue; // 프로젝트 ID
    const dvlrp = dvlrpRef.current.value; // 담당 개발자
    const cfrmr = cfrmrRef.current.value; // 확인자
    const tstr = tstrRef.current.value; // 테스터
    const strtDt = strtDtRef.current.value; // 시작일
    const endDt = endDtRef.current.value; // 종료 예정일
    const file =
      fileRef.current.files[0] === undefined ? null : fileRef.current.files[0]; // 첨부파일
    const rqmCntnt = rqmCntntRef.current.value; // 요구사항 내용
    const scdSts = scdStsRef.current.value; // 일정상태
    const rqmSts = rqmStsRef.current.value; // 진행상태

    const formData = new FormData();
    formData.append("rqmTtl", rqmTtl);
    formData.append("prjId", prjId);
    formData.append("dvlrp", dvlrp);
    formData.append("cfrmr", cfrmr);
    formData.append("tstr", tstr);
    formData.append("strtDt", strtDt);
    formData.append("endDt", endDt);
    formData.append("file", file);
    formData.append("rqmCntnt", rqmCntnt);
    formData.append("scdSts", scdSts);
    formData.append("rqmSts", rqmSts);

    const json = await writeRequirement(token, formData);
    if (json.body === true) {
      navigate(`/requirement/${prjIdValue}`, {
        state: { project: projectValue.project },
      });
    }
    if (json.body !== (true || false)) {
      setWriteErrors(json.body);
    }

    setShowConfirmModal(false);
  };

  // Alert Modal 창에서 "아니오" 클릭 시 Modal 창 닫힘
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Alert 나올 경우가 발생하면
  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    // 프로젝트, 일정상태, 진행상태 데이터 불러오기
    const getRequirementWritePage = async () => {
      const json = await loadForWriteRequirementData(token);
      const { projectList, scdSts, rqmSts } = json.body;
      setWriteRequirementData({
        projectList,
        scdSts,
        rqmSts,
      });
    };

    getRequirementWritePage();
  }, [token]);

  // 객체 분해를 사용해서 값 추출
  const { projectList, scdSts, rqmSts } = writeRequirementData || {};

  return (
    <>
      {writeRequirementData && (
        <>
          <div className={styles.writeAndModifyGrid}>
            <label htmlFor="prj-id">프로젝트</label>
            <div>
              <input
                type="text"
                id="prj-id"
                name="prjId"
                ref={prjIdRef}
                defaultValue={projectValue.project.prjName}
                readOnly
              />
              {writeErrors.prjId && writeErrors.prjId.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.prjId}</div>
              )}
            </div>

            <label htmlFor="rqm-ttl">요구사항 제목</label>
            <div>
              <input type="text" id="rqm-ttl" name="rqmTtl" ref={rqmTtlRef} />
              {writeErrors.rqmTtl && writeErrors.rqmTtl.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.rqmTtl}</div>
              )}
            </div>

            <label htmlFor="dvlrp">담당개발자</label>
            <div>
              <select id="dvlrp-check" name="dvlrp" ref={dvlrpRef}>
                <option value="">선택해주세요</option>
                {empData &&
                  empData.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {writeErrors.dvlrp && writeErrors.dvlrp.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.dvlrp}</div>
              )}
            </div>

            <label htmlFor="cfrmr">확인자</label>
            <div>
              <select id="cfrmr-check" name="cfrmr" ref={cfrmrRef}>
                <option value="">선택해주세요</option>
                {empData &&
                  empData.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {writeErrors.cfrmr && writeErrors.cfrmr.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.cfrmr}</div>
              )}
            </div>

            <label htmlFor="tstr">테스터</label>
            <div>
              <select id="tstr-check" name="tstr" ref={tstrRef}>
                <option value="">선택해주세요</option>
                {empData &&
                  empData.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {writeErrors.tstr && writeErrors.tstr.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.tstr}</div>
              )}
            </div>

            {/** 날짜선택창 */}
            <label htmlFor="start-date">시작일</label>
            <div>
              <input
                type="date"
                id="start-date"
                name="strtDt"
                ref={strtDtRef}
                defaultValue={today}
                onChange={startDayHandler}
              />
              {writeErrors.strtDt && writeErrors.strtDt.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.strtDt}</div>
              )}
            </div>
            {/** 날짜선택창 */}
            <label htmlFor="end-date">종료예정일</label>
            <div>
              <input
                type="date"
                id="end-date"
                name="endDt"
                ref={endDtRef}
                defaultValue={today}
                onChange={endDayHandler}
              />
              {writeErrors.endDt && writeErrors.endDt.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.endDt}</div>
              )}
            </div>
            <label htmlFor="file">요구사항 첨부파일</label>
            <input type="file" id="file" name="file" ref={fileRef} />

            {/** ckeditor를 이용한 내용넣기 */}
            <label htmlFor="rqm-cntnt">요구사항 내용</label>
            <div className={styles.contentBoxContainer}>
              <textarea
                className={styles.contentBox}
                id="rqm-cntnt"
                ref={rqmCntntRef}
              ></textarea>
            </div>

            {/** 체크박스 일정상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="scd-sts">일정상태</label>
            <div>
              <select name="scdSts" id="scd-sts" ref={scdStsRef}>
                <option value="">일정상태 선택</option>
                {scdSts &&
                  scdSts.map((item) => (
                    <option value={item.cmcdId} key={item.cmcdId}>
                      {item.cmcdName}
                    </option>
                  ))}
              </select>
              {writeErrors.scdSts && writeErrors.scdSts.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.scdSts}</div>
              )}
            </div>

            {/** 체크박스 진행상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="rqm-sts">진행상태</label>
            <div>
              <select name="rqmSts" id="rqm-sts" ref={rqmStsRef}>
                <option value="">진행상태 선택</option>
                {rqmSts &&
                  rqmSts.map((item) => (
                    <option value={item.cmcdId} key={item.cmcdId}>
                      {item.cmcdName}
                    </option>
                  ))}
              </select>
              {writeErrors.rqmSts && writeErrors.rqmSts.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.rqmSts}</div>
              )}
            </div>
          </div>

          <div className={styles.buttonArea}>
            <button type="button" onClick={handleOpenConfirmModal}>
              등록
            </button>
            {showModal && (
              <AlertModal
                show={showModal}
                onClose={handleCloseModal}
                content="오늘 이전의 날짜는 선택할 수 없습니다."
                closeContent="확인"
              />
            )}
            {showConfirmModal && (
              <ConfirmModal
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                content="등록하시겠습니까?"
                cancelContent="아니오"
                confirmContent="예"
                confirmOnClick={handleConfirm}
                cancelOnclick={handleCloseConfirmModal}
              />
            )}
            <button onClick={onClickHandler}>목록으로 이동</button>
          </div>
        </>
      )}
    </>
  );
}
