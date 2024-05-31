import { useEffect, useState } from "react";

export default function Requirement() {
  //   let array = [" A", " B", " C", " D", " E"];

  const [requirement, setRequirement] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // 게시글 불러오기
    const loadBoards = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/requirement/search`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      const json = await response.json();
      setRequirement(json);
    };

    loadBoards();
  }, [token]);

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
