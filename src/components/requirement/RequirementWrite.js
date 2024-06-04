import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  loadForWriteData,
  loadNameByPrjName,
} from "../../http/requirementHttp";

export default function RequirementWrite() {
  const [writeData, setWriteData] = useState({
    projectList: [],
    scdSts: [],
    rqmSts: [],
  });
  const [empData, setEmpData] = useState();

  const token = localStorage.getItem("token");

  const prjRef = useRef();
  const startDayRef = useRef();
  const endDayRef = useRef();
  // 오늘 날짜로 기본설정
  const today = new Date().toISOString().substring(0, 10);

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/requirement");
  };

  const prjSelectHandler = () => {
    const selectedPrjId = prjRef.current.value;
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

  // useEffect(() => {
  // }, [empData]);

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
          <select
            name="prjId"
            id="prj-id"
            onChange={prjSelectHandler}
            ref={prjRef}
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
          <select id="dvlrp-check" name="dvlrp">
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
          <select id="cfrmr-check" name="cfrmr">
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
          <select id="tstr-check" name="tstr">
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
            ref={startDayRef}
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
            ref={endDayRef}
            defaultValue={today}
            onChange={endDayHandler}
          />
        </div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" name="file" />

        {/** ckeditor를 이용한 내용넣기 */}
        <label htmlFor="rqm-cntnt">요구사항 내용</label>
        <div className="hereCkEditor5">
          {/* * 여기가 editor 생성부 */}
          <div className="editor" data-name="rqmCntnt" data-init-content="">
            <textarea
              style={{ width: "600px", height: "300px" }}
              defaultValue="CKEditor를 이용해서 내용 넣기"
            ></textarea>
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
                <option value="{item.cmcdId}" key={item.cmcdId}>
                  {item.cmcdName}
                </option>
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
                <option value="{item.cmcdId}" key={item.cmcdId}>
                  {item.cmcdName}
                </option>
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
