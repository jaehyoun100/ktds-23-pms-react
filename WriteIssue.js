import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  loadForWriteIssueData,
  loadTeamListByPrjId,
  writeIssue,
} from "../../http/issueHttp";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "./issue.module.css";

export default function Writeissue() {
  const [writeIssueData, setWriteIssueData] = useState({
    rqmList: [], // 요구사항 리스트
    rqmSts: [], // 진행상태
  });
  const [empData, setEmpData] = useState();
  const [editorWriteData, setEditorWriteData] = useState();
  const [writeErrors, setWriteErrors] = useState({
    isTtl: [], // 제목
    rqmId: [], // 요구사항
    isMngr: [], // 담당개발자
    tstr: [], // 테스터
    isCntnt: [], // 이슈 내용
    isSts: [], // 진행상태
  });

  // const query = new URLSearchParams(useLocation().search);
  // const prjNameValue = query.get("prjName");

  const location = useLocation();
  const rqmValue = location.state || {};
  console.log(">>>>>>>>>>", rqmValue.requirement);
  console.log(">>>>>>>>>>", rqmValue.requirement.rqmName);

  const token = localStorage.getItem("token");

  // FormData 전송을 위한 Ref
  const isTtlRef = useRef(); // 제목
  const rqmIdRef = useRef(); // 요구사항 ID
  const isMngrRef = useRef(); // 담당자
  const fileRef = useRef(); // 첨부파일
  const isStsRef = useRef(); // 진행상태

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const { rqmIdValue } = useParams();
  const { prjIdValue } = useParams();

  const onClickHandler = () => {
    navigate(`/issue/${rqmIdValue}`, {
      state: { requirement: rqmValue.requirement },
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

  const onWriteClickHandler = async () => {
    const check = window.confirm("등록하시겠습니까?");
    if (check) {
      setWriteErrors({
        isTtl: [],
        rqmId: [],
        isMngr: [],
        isCntnt: [],
        isSts: [],
      });

      const isTtl = isTtlRef.current.value; // 제목
      const rqmId = rqmIdValue; // 프로젝트 ID
      const isMngr = isMngrRef.current.value; // 담당 개발자
      const file =
        fileRef.current.files[0] === undefined
          ? null
          : fileRef.current.files[0]; // 첨부파일
      const isCntnt = editorWriteData; // 요구사항 내용
      const isSts = isStsRef.current.value; // 진행상태

      const formData = new FormData();
      formData.append("isTtl", isTtl);
      formData.append("rqmId", rqmId);
      formData.append("isMngr", isMngr);
      formData.append("file", file);
      formData.append("isCntnt", isCntnt);
      formData.append("isSts", isSts);

      const json = await writeIssue(token, formData);
      if (json.body === true) {
        navigate(`/issue/${rqmIdValue}`, {
          state: { requirement: rqmValue.requirement },
        });
      }
      if (json.body !== (true || false)) {
        setWriteErrors(json.body);
      }
    }
  };

  useEffect(() => {
    // 프로젝트, 일정상태, 진행상태 데이터 불러오기
    const getIssueWritePage = async () => {
      const json = await loadForWriteIssueData(token);
      const { projectList, scdSts, rqmSts } = json.body;
      setWriteIssueData({
        projectList,
        scdSts,
        rqmSts,
      });
    };

    getIssueWritePage();
  }, [token]);

  // 객체 분해를 사용해서 값 추출
  const { requirementList, rqmSts } = writeIssueData || {};

  return (
    <>
      {writeIssueData && (
        <>
          <div className={styles.writeAndModifyGrid}>
            <label htmlFor="rqm-id">요구사항</label>
            <div>
              <input
                type="text"
                id="rqm-id"
                name="rqmid"
                ref={rqmIdRef}
                defaultValue={rqmValue.requirement.rqmName}
                readOnly
              />
              {writeErrors.rqmId && writeErrors.rqmId.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.rqmId}</div>
              )}
            </div>

            <label htmlFor="is-ttl">이슈 제목</label>
            <div>
              <input type="text" id="is-ttl" name="isTtl" ref={isTtlRef} />
              {writeErrors.isTtl && writeErrors.isTtl.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.isTtl}</div>
              )}
            </div>

            <label htmlFor="isMngr">담당자</label>
            <div>
              <select id="isMngr-check" name="isMngr" ref={isMngrRef}>
                <option value="">선택해주세요</option>
                {empData &&
                  empData.map((item) => (
                    <option value={item.empId} key={item.empId}>
                      {item.empName}
                    </option>
                  ))}
              </select>
              {writeErrors.isMngr && writeErrors.isMngr.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.isMngr}</div>
              )}
            </div>

            <label htmlFor="file">요구사항 첨부파일</label>
            <input type="file" id="file" name="file" ref={fileRef} />

            {/** ckeditor를 이용한 내용넣기 */}
            <label htmlFor="is-cntnt">요구사항 내용</label>
            <div className="hereCkEditor5">
              {/* * 여기가 editor 생성부 */}
              <div className="editor" data-name="isCntnt" data-init-content="">
                {/* <textarea
              style={{ width: "600px", height: "300px" }}
              defaultValue="CKEditor를 이용해서 내용 넣기"
            ></textarea> */}
                <CKEditor
                  className="editor"
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorWriteData(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
              {writeErrors.isCntnt && writeErrors.isCntnt.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.isCntnt}</div>
              )}
            </div>

            {/** 체크박스 진행상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
            <label htmlFor="is-sts">진행상태</label>
            <div>
              <select name="isSts" id="is-sts" ref={isStsRef}>
                <option value="">진행상태 선택</option>
                {rqmSts &&
                  rqmSts.map((item) => (
                    <option value={item.cmcdId} key={item.cmcdId}>
                      {item.cmcdName}
                    </option>
                  ))}
              </select>
              {writeErrors.isSts && writeErrors.isSts.length > 0 && (
                <div className={styles.errorMessage}>{writeErrors.isSts}</div>
              )}
            </div>
          </div>

          <div className={styles.buttonArea}>
            <button type="button" onClick={onWriteClickHandler}>
              등록
            </button>
            <button onClick={onClickHandler}>목록으로 이동</button>
          </div>
        </>
      )}
    </>
  );
}
