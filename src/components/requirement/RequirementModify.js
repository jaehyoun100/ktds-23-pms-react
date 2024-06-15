import { useEffect, useRef, useState } from "react";
import styles from "./requirement.module.css";
import {
  loadForModifyRequirementData,
  modifyRequirement,
} from "../../http/requirementHttp";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function RequirementModify({
  projectId,
  requirementId,
  setIsModifyMode,
  setNeedReloadDetail,
  prjName,
}) {
  const [modifyRequirementData, setModifyRequirementData] = useState({
    requirement: [],
    projectList: [],
    scdSts: [],
    rqmSts: [],
    teammateList: [],
  });
  const [editorModifyData, setEditorModifyData] = useState();
  const [modifyErrors, setModifyErrors] = useState({
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

  const token = localStorage.getItem("token");

  // 오늘 날짜로 기본설정
  const today = new Date().toISOString().substring(0, 10);

  // FormData 전송을 위한 Ref
  const rqmTtlRef = useRef(); // 제목
  const prjIdRef = useRef(); // 프로젝트 ID
  const dvlrpRef = useRef(); // 담당 개발자
  const cfrmrRef = useRef(); // 확인자
  const tstrRef = useRef(); // 테스터
  const strtDtRef = useRef(); // 시작일
  const endDtRef = useRef(); // 종료 예정일
  const fileRef = useRef(); // 첨부파일
  const scdStsRef = useRef(); // 일정상태
  const rqmStsRef = useRef(); // 진행상태

  const onCancelClickHandler = () => {
    setIsModifyMode(false);
  };

  const onModifyClickHandler = async () => {
    const check = window.confirm("수정하시겠습니까?");
    if (check) {
      setModifyErrors({
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
      //   const prjId = prjIdRef.current.value; // 프로젝트 ID
      const prjId = projectId; // 프로젝트 ID
      const dvlrp = dvlrpRef.current.value; // 담당 개발자
      const cfrmr = cfrmrRef.current.value; // 확인자
      const tstr = tstrRef.current.value; // 테스터
      const strtDt = strtDtRef.current.value; // 시작일
      const endDt = endDtRef.current.value; // 종료 예정일
      const file =
        fileRef.current.files[0] === undefined
          ? null
          : fileRef.current.files[0]; // 첨부파일
      const rqmCntnt =
        editorModifyData === undefined
          ? requirement.rqmCntnt
          : editorModifyData; // 요구사항 내용
      const scdSts = scdStsRef.current.value; // 일정상태
      const rqmSts = rqmStsRef.current.value; // 진행상태

      console.log("rqmCntnt: ", rqmCntnt);

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

      const json = await modifyRequirement(token, requirement.rqmId, formData);
      if (json.body === true) {
        setIsModifyMode(false);
        setNeedReloadDetail(Math.random());
      }
      if (json.body !== (true || false)) {
        setModifyErrors(json.body);
      }
    }
  };

  const startDayHandler = (event) => {
    const dayValue = event.target.value;

    if (dayValue < today) {
      alert("오늘 이전의 날짜는 선택할 수 없습니다.");
      event.target.value = today;
    }
  };
  const endDayHandler = (event) => {
    const dayValue = event.target.value;

    if (dayValue < today) {
      alert("오늘 이전의 날짜는 선택할 수 없습니다.");
      event.target.value = today;
    }
  };

  useEffect(() => {
    // 프로젝트, 일정상태, 진행상태 데이터 불러오기
    const getRequirementWritePage = async () => {
      const json = await loadForModifyRequirementData(
        token,
        projectId,
        requirementId
      );
      const { requirement, projectList, scdSts, rqmSts, prjTeammateList } =
        json.body;

      const teammateList = prjTeammateList.map((item) => item.employeeVO);
      console.log("teammateList: ", teammateList);
      setModifyRequirementData({
        requirement,
        projectList,
        scdSts,
        rqmSts,
        teammateList,
      });
    };

    getRequirementWritePage();
  }, [token, projectId, requirementId]);

  // 객체 분해를 사용해서 값 추출
  const { requirement, projectList, scdSts, rqmSts, teammateList } =
    modifyRequirementData || {};

  if (!requirement || !requirement.projectVO) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  return (
    <>
      {modifyRequirementData && (
        <>
          <div className="writeAndModifyGrid">
            <label htmlFor="rqm-ttl">요구사항 제목</label>
            <div>
              <input
                type="text"
                id="rqm-ttl"
                name="rqmTtl"
                ref={rqmTtlRef}
                defaultValue={requirement.rqmTtl}
              />
              {modifyErrors.rqmTtl && modifyErrors.rqmTtl.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.rqmTtl}</div>
              )}
            </div>

            {/** 프로젝트명 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="prj-id">프로젝트</label>
            <div>
              {/* <select
                name="prjId"
                id="prj-id"
                ref={prjIdRef}
                defaultValue={requirement.prjId}
              >
                <option value={requirement.prjId}>
                  {requirement.projectVO.prjName}
                </option>
                {projectList &&
                  projectList.map((item) => (
                    <option value={item.prjId} key={item.prjId}>
                      {item.prjName}
                    </option>
                  ))}
              </select> */}
              <input
                type="text"
                id="prj-id"
                name="prjId"
                ref={prjIdRef}
                defaultValue={prjName}
                readOnly
              />

              {modifyErrors.prjId && modifyErrors.prjId.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.prjId}</div>
              )}
            </div>

            <label htmlFor="dvlrp">담당개발자</label>
            <div>
              <select
                id="dvlrp-check"
                name="dvlrp"
                ref={dvlrpRef}
                defaultValue={requirement.dvlrp}
              >
                <option value="" key={requirement.dvlrp}>
                  {requirement.dvlrpVO.empName}
                </option>
                {teammateList &&
                  teammateList.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {modifyErrors.dvlrp && modifyErrors.dvlrp.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.dvlrp}</div>
              )}
            </div>

            <label htmlFor="cfrmr">확인자</label>
            <div>
              <select
                id="cfrmr-check"
                name="cfrmr"
                ref={cfrmrRef}
                defaultValue={requirement.cfrmr}
              >
                <option value="">{requirement.cfrmrVO.empName}</option>
                {teammateList &&
                  teammateList.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {modifyErrors.cfrmr && modifyErrors.cfrmr.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.cfrmr}</div>
              )}
            </div>

            <label htmlFor="tstr">테스터</label>
            <div>
              <select
                id="tstr-check"
                name="tstr"
                ref={tstrRef}
                defaultValue={requirement.tstr}
              >
                <option value="">{requirement.tstrVO.empName}</option>
                {teammateList &&
                  teammateList.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {modifyErrors.tstr && modifyErrors.tstr.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.tstr}</div>
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
                defaultValue={requirement.strtDt}
                onChange={startDayHandler}
              />
              {modifyErrors.strtDt && modifyErrors.strtDt.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.strtDt}</div>
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
                defaultValue={requirement.endDt}
                onChange={endDayHandler}
              />
              {modifyErrors.endDt && modifyErrors.endDt.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.endDt}</div>
              )}
            </div>
            <label htmlFor="file">첨부파일</label>
            <div>
              <input type="file" id="file" name="file" ref={fileRef} />
              {requirement.rqmFile && (
                <div>기존 파일명: {requirement.rqmFile}</div>
              )}
            </div>

            {/** ckeditor를 이용한 내용넣기 */}
            <label htmlFor="rqm-cntnt">요구사항 내용</label>
            <div className="hereCkEditor5">
              {/* * 여기가 editor 생성부 */}
              <div className="editor" data-name="rqmCntnt" data-init-content="">
                {/* <textarea
                style={{ width: "600px", height: "300px" }}
                defaultValue="CKEditor를 이용해서 내용 넣기"
              ></textarea> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={requirement.rqmCntnt}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorModifyData(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
              {modifyErrors.rqmCntnt && modifyErrors.rqmCntnt.length > 0 && (
                <div className={styles.errorMessage}>
                  {modifyErrors.rqmCntnt}
                </div>
              )}
            </div>

            {/** 체크박스 일정상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="scd-sts">일정상태</label>
            <div>
              <select
                name="scdSts"
                id="scd-sts"
                ref={scdStsRef}
                defaultValue={requirement.scdSts}
              >
                <option value="">{requirement.scdStsVO.cmcdName}</option>
                {scdSts &&
                  scdSts.map((item) => (
                    <option value={item.cmcdId} key={item.cmcdId}>
                      {item.cmcdName}
                    </option>
                  ))}
              </select>
              {modifyErrors.scdSts && modifyErrors.scdSts.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.scdSts}</div>
              )}
            </div>

            {/** 체크박스 진행상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="rqm-sts">진행상태</label>
            <div>
              <select
                name="rqmSts"
                id="rqm-sts"
                ref={rqmStsRef}
                defaultValue={requirement.rqmSts}
              >
                <option value="">{requirement.rqmStsVO.cmcdName}</option>
                {rqmSts &&
                  rqmSts.map((item) => (
                    <option value={item.cmcdId} key={item.cmcdId}>
                      {item.cmcdName}
                    </option>
                  ))}
              </select>
              {modifyErrors.rqmSts && modifyErrors.rqmSts.length > 0 && (
                <div className={styles.errorMessage}>{modifyErrors.rqmSts}</div>
              )}
            </div>

            <div className="button-area right-align">
              <button onClick={onCancelClickHandler}>취소</button>
              <button onClick={onModifyClickHandler}>수정</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
