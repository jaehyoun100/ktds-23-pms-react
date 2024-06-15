import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewIssue from "./ViewIssue";
import WriteIssue from "./WriteIssue";

const IssueListPage = () => {
  const [selectedSplId, setSelectedSplId] = useState();
  const [needReload, setNeedReload] = useState();
  const [issue, setIssue] = useState();
  const [issueList, setIssueList] = useState([]);
  const token = localStorage.getItem("token");
  const [isCreateMode, setIsCreateMode] = useState(false);
  const isSelect = selectedSplId !== undefined;
  const navigate = useNavigate();
  const { rqmIdValue } = useParams();

  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  const fetchIssues = useCallback(async () => {
    try {
      const response = await fetch(`/api/issues`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setIssue(data);
      setIssueList(data.issueList);
    } catch (error) {
      console.error("Failed to fetch issues", error);
    }
  }, [token]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues, token, rqmIdValue]);

  const handleFormKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };

  const handleDeleteMassiveIssue = async () => {
    const checkedItems = document.querySelectorAll(".target-issue-id:checked");
    const itemsArray = Array.from(checkedItems).map((item) => item.value);

    if (itemsArray.length === 0) {
      loadModal({
        content: "삭제할 이슈를 선택하세요.",
        showNegativeBtn: false,
      });
    } else {
      loadModal({
        content: "이슈를 일괄 삭제 하시겠습니까?",
        fnPositiveBtnHandler: async () => {
          try {
            const response = await fetch("/ajax/issue/delete/massive", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({ deleteItems: itemsArray }),
            });
            const result = await response.json();
            if (result.data.result) {
              fetchIssues();
            }
          } catch (error) {
            console.error("Failed to delete issues", error);
          }
        },
      });
    }
  };

  const handleCheckedAllChange = (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll(".target-issue-id").forEach((item) => {
      item.checked = isChecked;
    });
  };

  const handleListSizeChange = (e) => {
    setNeedReload(e.target.value);
  };

  const handleSearchClick = () => {
    fetchIssues();
  };

  const handleCancelSearchClick = () => {
    setNeedReload(true);
  };

  if (!issueList) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: "요구사항",
      dataIndex: ["requirementVO", "rqmTtl"],
      key: "rqmTtl",
    },
    {
      title: "제목",
      dataIndex: "isTtl",
      key: "isTtl",
      width: "20%",
      render: (data, row) => (
        <span style={{ cursor: "pointer" }} onClick={() => navigate(``)} />
      ),
    },
    {
      title: "작성자",
      dataIndex: "crtrId",
      key: "crtrId",
    },
    {
      title: "난이도",
      dataIndex: "isLv",
      key: "isLv",
    },
    {
      title: "조회수",
      dataIndex: "isCnt",
      key: "isCnt",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
    },
  ];

  const filterOptions = [
    {
      label: "제목",
      value: "isTtl",
    },
    {
      label: "작성자",
      value: "crtId",
    },
    {
      label: "내용",
      value: "isCntnt",
    },
  ];

  const onRowClickHandler = (rowId) => {
    setSelectedSplId(rowId);
  };

  const onCreateModeClickHandler = () => {
    setIsCreateMode(true);
  };

  return (
    <>
      <div onKeyPress={handleFormKeyPress}>
        <div>총 {issueList.length}건의 게시글이 검색되었습니다.</div>
        <table className="table">
          <colgroup>
            <col width="40px" />
            <col width="120px" />
            <col width="180px" />
            <col width="*" />
            <col width="120px" />
            <col width="100px" />
            <col width="80px" />
            <col width="80px" />
            <col width="110px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="checked-all"
                  data-target-class="target-issue-id"
                  onChange={handleCheckedAllChange}
                />
                <label htmlFor="checked-all"></label>
              </th>
              <th>프로젝트</th>
              <th>요구사항</th>
              <th>제목</th>
              <th>작성자</th>
              <th>이슈상태</th>
              <th>조회수</th>
              <th>난이도</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {issueList.length > 0 ? (
              issueList.map((issue, index) => (
                <tr
                  key={issue.isId}
                  onClick={() => onRowClickHandler(issue.isId)}
                >
                  <td>
                    <input
                      type="checkbox"
                      className="target-issue-id"
                      id={`target-issue-id-${index}`}
                      value={issue.isId}
                    />
                    <label htmlFor={`target-issue-id-${index}`}></label>
                  </td>
                  <td>{issue.projectVO.prjName}</td>
                  <td>{issue.requirementVO.rqmTtl}</td>
                  <td>
                    <a href={`/issue/view?isId=${issue.isId}`}>{issue.isTtl}</a>
                  </td>
                  <td>{issue.employeeVO.empName}</td>
                  <td>{issue.isSts}</td>
                  <td>{issue.isCnt}</td>
                  <td>{issue.isLv}</td>
                  <td>{issue.crtDt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  <a href="/issue/write">등록된 이슈가 없습니다.</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <nav aria-label="Page navigation">
          <form id="search-form">
            <div className="search-keyword">
              <input type="hidden" id="page-no" name="pageNo" value="0" />
              <select
                id="list-size"
                name="listSize"
                value={needReload}
                onChange={handleListSizeChange}
              >
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={20}>20개</option>
                <option value={30}>30개</option>
              </select>

              <select
                id="search-type"
                name="searchType"
                value={memoizedToken.searchType}
                onChange={(e) => setNeedReload(e.target.value)}
              >
                <option value="" disabled hidden>
                  검색 옵션
                </option>
                <option value="project">프로젝트</option>
                <option value="requirement">요구사항</option>
                <option value="title">이슈제목</option>
                <option value="content">내용</option>
                <option value="creator">작성자</option>
                <option value="originFileName">첨부파일명</option>
                <option value="status">이슈상태</option>
              </select>

              <div>
                <input
                  type="text"
                  name="searchKeyword"
                  value={memoizedToken.searchKeyword}
                  onChange={(e) => setNeedReload(e.target.value)}
                />
                <button
                  type="button"
                  id="search-btn"
                  onClick={handleSearchClick}
                >
                  검색
                </button>
                <button
                  type="button"
                  id="cancel-search-btn"
                  onClick={handleCancelSearchClick}
                >
                  초기화
                </button>
              </div>
            </div>
            <div className="create-btn">
              <button onClick={onCreateModeClickHandler}>신규등록</button>
              <button>
                <a href="/issue/excel/download">엑셀다운</a>
              </button>
              <button
                type="button"
                id="deleteMassiveIssue"
                onClick={handleDeleteMassiveIssue}
              >
                일괄삭제
              </button>
            </div>
          </form>
        </nav>
      </div>

      {token && isSelect && !isCreateMode && (
        <ViewIssue
          selectedSplId={selectedSplId}
          setSelectedSplId={setSelectedSplId}
          setNeedReload={setNeedReload}
          needReload={needReload}
          token={token}
        />
      )}
      {isCreateMode && (
        <WriteIssue
          setIsCreateMode={setIsCreateMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
    </>
  );
};

export default IssueListPage;

function loadModal({ content, showNegativeBtn, fnPositiveBtnHandler }) {
  // 모달을 보여주는 로직 구현
}
