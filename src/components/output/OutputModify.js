import { useEffect, useRef, useState } from "react";
import styles from "./output.module.css";
import { loadForModifyOutputData, modifyOutput } from "../../http/outputHttp";
import { useParams } from "react-router-dom";

export default function OutputModify({
  setIsModifyMode,
  setSelectedOutputId,
  selectedOutputId,
  setNeedReload,
  prjName,
}) {
  const [modifyOutputData, setModifyOutputData] = useState({
    output: [],
    projectList: [], // 프로젝트 리스트
    outputType: [], // 산출물 타입
    prjSts: [], // 프로젝트 진행상태(산출물 버전)
  });
  const [modifyErrors, setModifyErrors] = useState({
    outTtl: [], // 산출물 제목
    prjId: [], // 프로젝트
    outType: [], // 산출물 타입
    outVer: [], // 프로젝트 진행상태
    outFile: [], // 산출물 파일
  });

  const token = localStorage.getItem("token");

  const { prjIdValue } = useParams();

  // FormData 전송을 위한 Ref
  const outTtlRef = useRef(); // 산출물 제목
  const prjIdRef = useRef(); // 프로젝트 ID
  const outTypeRef = useRef(); // 산출물 종류
  const outVerRef = useRef(); // 프로젝트 진행상태
  const fileRef = useRef(); // 첨부파일

  const onCancelClickHandler = () => {
    setIsModifyMode(false);
  };

  const onModifyClickHandler = async () => {
    const check = window.confirm("수정하시겠습니까?");
    if (check) {
      const outTtl = outTtlRef.current.value; // 산출물 제목
      const prjId = prjIdValue; // 프로젝트 ID
      const outType = outTypeRef.current.value; // 산출물 종류
      const outVer = outVerRef.current.value; // 프로젝트 진행상태(산출물 버전)
      const file =
        fileRef.current.files[0] === undefined
          ? null
          : fileRef.current.files[0]; // 첨부파일

      const formData = new FormData();
      formData.append("outTtl", outTtl);
      formData.append("prjId", prjId);
      formData.append("outType", outType);
      formData.append("outVer", outVer);
      formData.append("file", file);

      const json = await modifyOutput(token, selectedOutputId, formData);
      if (json.body === true) {
        setIsModifyMode(false);
        setNeedReload(Math.random());
      }
      if (json.body !== (true || false)) {
        setModifyErrors(json.body);
      }
    }
  };

  useEffect(() => {
    // 산출물, 프로젝트, 산출물 타입, 프로젝트 진행상태 데이터 불러오기
    const getOutputWritePage = async () => {
      const json = await loadForModifyOutputData({ token, selectedOutputId });
      const { output, projectList, outputType, prjSts } = json.body;
      setModifyOutputData({
        output,
        projectList,
        outputType,
        prjSts,
      });
    };

    getOutputWritePage();
  }, [token, selectedOutputId]);

  // 객체 분해를 사용해서 값 추출
  const { output, projectList, outputType, prjSts } = modifyOutputData || {};

  if (!output || !output.project) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  return (
    <>
      <div className="writeAndModifyGrid">
        {/** 프로젝트명 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
        <label htmlFor="out-ttl">산출물 제목</label>
        <div className="ttlInput">
          <input
            type="text"
            name="outTtl"
            id="out-ttl"
            ref={outTtlRef}
            defaultValue={output.outTtl}
          />
          {modifyErrors.outTtl && modifyErrors.outTtl.length > 0 && (
            <div className={styles.errorMessage}>{modifyErrors.outTtl}</div>
          )}
        </div>

        <label htmlFor="prj-id">프로젝트</label>
        <div>
          {/* <select
            name="prjId"
            id="prj-id"
            ref={prjIdRef}
            defaultValue={output.prjId}
          >
            <option value="">프로젝트를 선택해주세요</option>
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

        <label htmlFor="out-type">산출물 종류</label>
        <div>
          <select
            name="outType"
            id="out-type"
            ref={outTypeRef}
            defaultValue={output.outType}
          >
            <option value="">산출물 종류를 선택해주세요</option>
            {outputType &&
              outputType.map((item) => (
                <option value={item.cmcdId} key={item.cmcdId}>
                  {item.cmcdName}
                </option>
              ))}
          </select>
          {modifyErrors.outType && modifyErrors.outType.length > 0 && (
            <div className={styles.errorMessage}>{modifyErrors.outType}</div>
          )}
        </div>

        <label htmlFor="out-ver">프로젝트 진행상태</label>
        <div>
          <select
            name="outVer"
            id="out-ver"
            ref={outVerRef}
            defaultValue={output.outVer}
          >
            <option value="">진행상태를 선택해주세요</option>
            {prjSts &&
              prjSts.map((item) => (
                <option value={item.cmcdId} key={item.cmcdId}>
                  {item.cmcdName}
                </option>
              ))}
          </select>
          {modifyErrors.outVer && modifyErrors.outVer.length > 0 && (
            <div className={styles.errorMessage}>{modifyErrors.outVer}</div>
          )}
        </div>

        <label htmlFor="file">산출물 첨부파일</label>
        <div>
          <input type="file" id="outFile" name="outFile" ref={fileRef} />
          {modifyErrors.outFile && modifyErrors.outFile.length > 0 && (
            <div className={styles.errorMessage}>{modifyErrors.outFile}</div>
          )}
          {output.outFile && <div>기존 파일명: {output.outFile}</div>}
        </div>

        <div className="button-area right-align">
          <button onClick={onCancelClickHandler}>취소</button>
          <button onClick={onModifyClickHandler}>수정</button>
        </div>
      </div>
    </>
  );
}
