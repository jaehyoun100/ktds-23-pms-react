import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  loadForWriteData,
  loadNameByPrjName,
  writeRequirement,
} from "../../http/requirementHttp";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "./requirement.module.css";

export default function RequirementWrite() {
  const [writeData, setWriteData] = useState({
    projectList: [],
    scdSts: [],
    rqmSts: [],
  });
  const [empData, setEmpData] = useState();
  const [editorData, setEditorData] = useState();
  const [writeErrors, setWriteErrors] = useState({
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

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/requirement");
  };

  const prjSelectHandler = () => {
    const selectedPrjId = prjIdRef.current.value;
    console.log("selectedPrjName: " + selectedPrjId);

    const getProjectTeammate = async () => {
      // 프로젝트 이름을 통해서 담당개발자, 확인자, 테스터 값 받아오기
      const json = await loadNameByPrjName({ token, selectedPrjId });
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

  const onWriteClickHandler = async () => {
    const rqmTtl = rqmTtlRef.current.value; // 제목
    const prjId = prjIdRef.current.value; // 프로젝트 ID
    const dvlrp = dvlrpRef.current.value; // 담당 개발자
    const cfrmr = cfrmrRef.current.value; // 확인자
    const tstr = tstrRef.current.value; // 테스터
    const strtDt = strtDtRef.current.value; // 시작일
    const endDt = endDtRef.current.value; // 종료 예정일
    const file = fileRef.current.value; // 첨부파일
    const rqmCntnt = editorData; // 요구사항 내용
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
    if (json) {
      navigate("/requirement");
    }
    if (json.body !== (true || false)) {
      setWriteErrors(json.body);
    }
  };

  useEffect(() => {
    // 프로젝트, 일정상태, 진행상태 데이터 불러오기
    const getRequirementWritePage = async () => {
      const json = await loadForWriteData(token);
      const { projectList, scdSts, rqmSts } = json.body;
      setWriteData({
        projectList,
        scdSts,
        rqmSts,
      });
    };

    getRequirementWritePage();
  }, [token]);

  // 객체 분해를 사용해서 값 추출
  const { projectList, scdSts, rqmSts } = writeData || {};

  return (
    <>
      <div className="writeAndModifyGrid">
        <label htmlFor="rqm-ttl">요구사항 제목</label>
        <div>
          <input type="text" id="rqm-ttl" name="rqmTtl" ref={rqmTtlRef} />
        </div>

        {/** 프로젝트명 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
        <label htmlFor="prj-id">프로젝트</label>
        <div>
          <select
            name="prjId"
            id="prj-id"
            onChange={prjSelectHandler}
            ref={prjIdRef}
          >
            <option value="">프로젝트를 선택해주세요</option>
            {projectList &&
              projectList.map((item) => (
                <option value={item.prjId} key={item.prjId}>
                  {item.prjName}
                </option>
              ))}
          </select>
        </div>

        <label htmlFor="dvlrp">담당개발자</label>
        <div>
          <select id="dvlrp-check" name="dvlrp" ref={dvlrpRef}>
            <option value="">프로젝트를 선택해주세요</option>
            {empData &&
              empData.map((item) => (
                <option value={item.empId} key={item.empId}>
                  {item.empName}
                </option>
              ))}
          </select>
        </div>

        <label htmlFor="cfrmr">확인자</label>
        <div>
          <select id="cfrmr-check" name="cfrmr" ref={cfrmrRef}>
            <option value="">프로젝트를 선택해주세요</option>
            {empData &&
              empData.map((item) => (
                <option value={item.empId} key={item.empId}>
                  {item.empName}
                </option>
              ))}
          </select>
        </div>

        <label htmlFor="tstr">테스터</label>
        <div>
          <select id="tstr-check" name="tstr" ref={tstrRef}>
            <option value="">프로젝트를 선택해주세요</option>
            {empData &&
              empData.map((item) => (
                <option value={item.empId} key={item.empId}>
                  {item.empName}
                </option>
              ))}
          </select>
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
        </div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" name="file" ref={fileRef} />

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
              data="<p>내용을 입력하세요.</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
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
          {writeErrors.scdSts.length > 0 && (
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
          {writeErrors.rqmSts.length > 0 && (
            <div className={styles.errorMessage}>{writeErrors.rqmSts}</div>
          )}
        </div>

        <button type="button" data-type="write" onClick={onWriteClickHandler}>
          등록
        </button>
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
    </>
  );
}
