import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function IssueListPage({
  issueList,
  searchIssueVO,
  deleteMassiveIssue,
  search,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [user, setUser] = useState(null); // 사용자 정보를 담는 상태

  useEffect(() => {
    // 사용자 정보를 가져오는 함수 호출
    fetchUserInfo();
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      // 서버에서 사용자 정보를 가져오는 API를 호출하고, JWT 토큰을 전달합니다.
      const response = await fetch("/api/userinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // localStorage에서 토큰을 가져옴
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // 삭제 버튼 클릭 시 처리 함수
  const handleDeleteMassiveIssue = () => {
    // 삭제 처리 로직
  };

  // 검색어 입력 시 처리 함수
  const handleSearch = () => {
    // 검색 처리 로직
  };

  // 검색어 초기화 시 처리 함수
  const handleCancelSearch = () => {
    // 검색어 초기화 로직
  };

  return (
    <div>
      <div>총 {issueList.issueCnt}건의 게시글이 검색되었습니다.</div>
      {/* 테이블 및 페이징 관련 코드 */}
      <div className="create-btn">
        <button>
          <Link to="/issue/write">신규등록</Link>
        </button>
        {user &&
          user.mngrYn === "Y" && ( // 사용자가 관리자인 경우에만 버튼 표시
            <React.Fragment>
              <button onClick={handleDeleteMassiveIssue}>일괄삭제</button>
              <button>
                <Link to="/issue/excel/download">엑셀다운</Link>
              </button>
            </React.Fragment>
          )}
      </div>
    </div>
  );
}

export default IssueListPage;
