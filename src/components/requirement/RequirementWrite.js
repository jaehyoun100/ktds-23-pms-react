import { useNavigate } from "react-router";
import styles from "./requirement.module.css";
import { useEffect, useState } from "react";

export default function RequirementWrite() {
  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [writeData, setWriteData] = useState({
    projectList: [],
    scdSts: [],
    rqmSts: [],
  });

  const onClickHandler = () => {
    navigate("/requirement");
  };

  useEffect(() => {
    // 프로젝트, 일정상태, 진행상태 데이터 불러오기
    const loadForWriteData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/requirement/write`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      const json = await response.json();
      const { projectList, scdSts, rqmSts } = json.body;
      setWriteData({
        projectList,
        scdSts,
        rqmSts,
      });
    };

    loadForWriteData();
  }, [token]);

  // 객체 분해를 사용해서 값 추출
  const { projectList, scdSts, rqmSts } = writeData || {};

  console.log("projectList: ", projectList);
  console.log("scdSts: ", scdSts);
  console.log("rqmSts: ", rqmSts);

  return (
    <>
      <div>요구사항 작성 페이지입니다.</div>

      <div className="writeGrid">
        <label htmlFor="rqm-ttl">요구사항 제목</label>
        <div>
          <input
            type="text"
            id="rqm-ttl"
            name="rqmTtl"
            // value="${requirement.rqmTtl}"
          />
        </div>

        {/** 프로젝트명 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
        <label htmlFor="prj-id">프로젝트</label>
        <div>
          <select name="prjId" id="prj-id">
            <option value="">프로젝트를 선택해주세요</option>
            {projectList &&
              projectList.map((item) => (
                <option value="{item.prjId}">{item.prjName}</option>
              ))}
          </select>
        </div>

        <label htmlFor="dvlrp">담당개발자</label>
        <div>
          <select id="dvlrp-check" name="dvlrp">
            <option value="">프로젝트를 선택해주세요</option>
          </select>
        </div>

        <label htmlFor="cfrmr">확인자</label>
        <div>
          <select id="cfrmr-check" name="cfrmr">
            <option value="">프로젝트를 선택해주세요</option>
          </select>
        </div>

        <label htmlFor="tstr">테스터</label>
        <div>
          <select id="tstr-check" name="tstr">
            <option value="">프로젝트를 선택해주세요</option>
          </select>
        </div>

        {/** 날짜선택창 */}
        <label htmlFor="start-date">시작일</label>
        <div>
          <input
            type="date"
            id="start-date"
            name="strtDt"
            // value="${requirement.strtDt}"
          />
        </div>
        {/** 날짜선택창 */}
        <label htmlFor="end-date">종료예정일</label>
        <div>
          <input
            type="date"
            id="end-date"
            name="endDt"
            // value="${requirement.endDt}"
          />
        </div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" name="file" />

        {/** ckeditor를 이용한 내용넣기 */}
        <label htmlFor="rqm-cntnt">요구사항 내용</label>
        <div className="hereCkEditor5">
          {/* * 여기가 editor 생성부 */}
          <div className="editor" data-name="rqmCntnt" data-init-content="">
            <textarea style={{ width: "600px", height: "300px" }}>
              CKEditor를 이용해서 내용 넣기
            </textarea>
          </div>
        </div>

        {/** 체크박스 일정상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
        <label htmlFor="scd-sts">일정상태</label>
        <div>
          <select
            name="scdSts"
            id="scd-sts"
            //   value="${requirement.rqmSts}"
          >
            {scdSts &&
              scdSts.map((item) => (
                <option value="{item.cmcdId}">{item.cmcdName}</option>
              ))}
          </select>
        </div>

        {/** 체크박스 진행상태 선택창 todo 서버에서 정보 가져와서 for문 돌리기 */}
        <label htmlFor="rqm-sts">진행상태</label>
        <div>
          <select
            name="rqmSts"
            id="rqm-sts"
            //   value="${requirement.rqmSts}"
          >
            {rqmSts &&
              rqmSts.map((item) => (
                <option value="{item.cmcdId}">{item.cmcdName}</option>
              ))}
          </select>
        </div>

        <button type="button" data-type="write">
          등록
        </button>
      </div>

      <div className="button-area right-align">
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
    </>
  );
}
