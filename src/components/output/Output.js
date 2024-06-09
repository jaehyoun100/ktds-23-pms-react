import { useEffect, useState } from "react";
import { loadOutputs } from "../../http/outputHttp";

export default function Output() {
  const [output, setOutput] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // 게시글 불러오기
    const getOutputs = async () => {
        const json = await loadOutputs(token);
        setOutput(json);
    }

    getOutputs();
  }, [token]);

  const { count, body: data } = output || {};

  if(!data){
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  return (
    <>
      {/** 토큰이 있고, 게시글을 선택하지 않았을 때 */}
      <>
        <div>총 {count}개의 산출물이 검색되었습니다.</div>
        <table>
          <thead>
            <tr>
              <th>프로젝트</th>
              <th>산출물 제목</th>
              <th>산출물 종류</th>
              <th>버전</th>
              <th>파일명</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.outId}>
                  <td>{item.project.prjName}</td>
                  <td>{item.outTtl}</td>
                  <td>{item.outTypeVO.cmcdName}</td>
                  <td>
                    {item.outVerSts.cmcdName} Ver.{item.level}
                  </td>
                  <td>{item.outFile}</td>
                  <td>{item.crtrIdVO.empName}</td>
                  <td>{item.crtDt}</td>
                  <td>
                    <button>수정</button>
                  </td>
                  <td>
                    <button>삭제</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </>
  );
}
