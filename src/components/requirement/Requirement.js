import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRequirement } from "../../http/requirementHttp";

export default function Requirement({ token }) {
  let array = [" A", " B", " C", " D", " E"];

  console.log("token: " + token);

  const [requirement, setRequirement] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [needLoad, setNeedLoad] = useState();

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchGetBoard = useCallback(loadRequirement, [token]);

  // 토큰이 바뀌면 객체 리터럴이 다시 생성되어서 실행해라
  const fetchToken = useMemo(() => {
    return { token, needLoad };
  }, [token, needLoad]);

  useEffect(() => {
    // 게시글 불러오기
    const loadBoards = async () => {
      const json = await fetchGetBoard({ ...fetchToken });
      setRequirement(json);
      setIsLoading(false);
    };

    loadBoards();
  }, [fetchGetBoard, fetchToken]);

  const { count } = requirement || {};

  const { body: data } = requirement || {};

  return (
    <>
      {/** 토큰이 있고, 게시글을 선택하지 않았을 때 */}
      <>
        <div>총 {count}개의 요구사항이 검색되었습니다.</div>
        <table>
          <thead>
            <tr>
              <th>프로젝트</th>
              <th>제목</th>
              <th>일정상태</th>
              <th>진행상태</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.rqmId}>
                  <td>프로젝트{item.rqmId}</td>
                  <td>제목{item.rqmTtl}</td>
                  <td>일정상태{item.scdSts}</td>
                  <td>진행상태{item.rqmSts}</td>
                  <td>작성자{item.crtrId}</td>
                  <td>작성일{item.crtDt}</td>
                </tr>
              ))}
            {/* {array.map((item, index) => (
              <tr key={index}>
                <td>프로젝트{item}</td>
                <td>제목{item}</td>
                <td>일정상태{item}</td>
                <td>진행상태{item}</td>
                <td>작성자{item}</td>
                <td>작성일{item}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </>
      <div className="button-area right-align">
        <button>삭제</button>
        <button>요구사항 생성</button>
      </div>
    </>
  );
}
