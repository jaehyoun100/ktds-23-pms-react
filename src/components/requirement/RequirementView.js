import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function RequirementView() {
  const [content, setContent] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const prjId = query.get("prjId");
  const rqmId = query.get("rqmId");

  console.log("@@@@@@@@@@@@" + rqmId);

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/requirement");
  };

  useEffect(() => {
    // 요구사항 정보 불러오기
    const loadOneRequirement = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/requirement/view?prjId=${prjId}&rqmId=${rqmId}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      const json = await response.json();
      setContent(json);
    };

    loadOneRequirement();
  }, [token, prjId, rqmId]);

  const { body: data } = content || {};

  return (
    <>
      <div>요구사항 view 페이지</div>
      {content && (
        <>
          <div>
            <div>
              <div>{data.rqmTtl}</div>
              <div>프로젝트</div>
              <div>{data.projectVO.prjName}</div>
              <div>작성자</div>
              <div>{data.crtrIdVO.empName}</div>
              <div>기간</div>
              <div>
                {data.strtDt} ~ {data.endDt}
              </div>
              <div>작성일</div>
              <div>{data.crtDt}</div>
            </div>
          </div>

          <div>
            <div>
              <div>일정상태</div>
              <div>
                <div>${data.scdStsVO.cmcdName}</div>
                <button>연기</button>
                <button>승인</button>
                <button>거절</button>
              </div>

              <div>담당개발자</div>
              <div>{data.dvlrpVO.empName}</div>

              <div>진행상태</div>
              <div>{data.rqmStsVO.cmcdName}</div>

              <div>확인자</div>
              <div>{data.cfrmrVO.empName}</div>

              <div>파일</div>
              <div>{data.rqmFile}</div>

              <div>테스터</div>
              <div>
                <div>{data.tstrVO.empName}</div>
                <button>결과제출</button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="button-area right-align">
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
    </>
  );
}
