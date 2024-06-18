import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { loadIssue, loadTeamListByPrjId } from "../../http/issueHttp";
import Table from "../../utils/Table";

export default function IssueMain() {
  const [issue, setIssue] = useState({
    issueList: [],
    isPmAndPl: [],
  });
  const url = "43.202.29.221";
  const [teamList, setTeamList] = useState();
  const [userData, setUserData] = useState();
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(useLocation().search);
  const rqmNameValue = query.get("rqmName");

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  // const query = new URLSearchParams(useLocation().search);
  // const prjId = query.get("prjId");
  const { rqmIdValue } = useParams();
  const { prjIdValue } = useParams();

  const onIsCreateHandler = () => {
    navigate(`/issue/${rqmIdValue}/write?prjName=${rqmNameValue}`);
  };

  const isTtlClickHandler = (rqmId, isId) => {
    navigate(`/issue/view?rqmId=${rqmId}&isId=${isId}`);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const userInfo = async () => {
      const response = await fetch(`${url}/api/`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await response.json();
      setUserData(json.body);
    };
    userInfo();
  }, [token]);

  useEffect(() => {
    // 이슈 리스트 불러오기
    const getIssueList = async () => {
      const json = await loadIssue(token, rqmIdValue);
      console.log("Issue List:", json.body.issueList); // 상태 업데이트 확인
      const { issueList, isPmAndPl } = json.body;
      setIssue({
        issueList,
        isPmAndPl,
      });
    };

    getIssueList();
  }, [token, rqmIdValue]);

  useEffect(() => {
    const getTeammateList = async () => {
      const json = await loadTeamListByPrjId(token, prjIdValue);
      console.log("Teammate List:", json.body); // 상태 업데이트 확인
      const { body: teammateData } = json;
      const list = teammateData.map((item) => item.employeeVO);
      setTeamList(list);
    };

    getTeammateList();
  }, [token, prjIdValue]);

  const { issueList: data, isPmAndPl } = issue || {};

  const isTeammate =
    userData &&
    teamList &&
    teamList.find((member) => member.empName === userData.empName) !== undefined
      ? true
      : false;

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  const columns = [
    {
      title: "이슈명",
      dataIndex: "isTtl",
      key: "isTtl",
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/issue/view?prjId=${row.prjId}&isId=${row.empId}`)
          }
        >
          {data}
        </span>
      ),
    },
    {
      title: "요구사항",
      dataIndex: "rqmTtl",
      key: "rqmTtl",
    },
    {
      title: "작성자",
      dataIndex: "crtrId",
      key: "crtrId",
    },
    {
      title: "담당자",
      dataIndex: "isMngr",
      key: "isMngr",
    },
    {
      title: "난이도",
      dataIndex: "isLv",
      key: "isLv",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
    },
    {
      title: "진행상태",
      dataIndex: ["isStsVO", "cmcdName"],
      key: "cmcdName",
    },
    {
      title: "내용",
      dataIndex: "isCntnt",
      key: "isCntnt",
    },
  ];

  const filterOptions = [
    {
      label: "내용",
      value: "isCntnt",
    },
    {
      label: "담당자",
      value: "isMngr",
    },
    {
      label: "제목",
      value: "isTtl",
    },
    {
      label: "진행상태",
      value: ["isStsVO", "cmcdName"],
    },
  ];

  return (
    <>
      {data.issueList && userData && (
        <>
          {userData && data.count > 0 ? (
            <>
              {token && (
                <>
                  <div>총 {data.count}개의 요구사항이 검색되었습니다.</div>
                  <Table
                    columns={columns}
                    dataSource={data.issueList}
                    rowKey={(dt) => dt.isId}
                    filter
                    filterOptions={filterOptions}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <div>해당 요구사항에 대한 이슈가 없습니다.</div>
              <Table
                columns={columns}
                dataSource={data.issueList}
                rowkey={(dt) => dt.issueList}
                filter
                filterOptions={filterOptions}
              />
            </>
          )}
        </>
      )}

      {data &&
        userData &&
        (userData.admnCode === "301" || isPmAndPl === true || isTeammate) && (
          <div className="button-area right-allign">
            <button onClick={onIsCreateHandler}>이슈 생성</button>
          </div>
        )}
    </>
  );
}
//     <div>{count}개의 이슈가 발견되었습니다.</div>
//     <table>
//       <thead>
//         <tr>
//           <th>이슈</th>
//           <th>제목</th>
//           <th>작성자</th>
//           <th>난이도</th>
//           <th>작성일</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data &&
//           data.map((item) => (
//             <tr key={item.isId}>
//               <td>{item.projectVO.prjName}</td>
//               <td>
//                 <Link
//                   to={`/issue/view?prjId=${item.projectVO.prjId}&isId=${item.isId}`}
//                 >
//                   {item.isTtl}
//                 </Link>
//               </td>
//               <td>{item.cmcdName}</td>
//               <td>{item.crtrId}</td>
//               <td>{item.crtDt}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   </>
// ) : (
//   <div>요구사항에 대한 이슈가 없습니다.</div>
// )}
//       <div className="button-area right-align">
//         <button>삭제</button>
//         <button onClick={onIsCreateHandler}>이슈 생성</button>
//       </div>
//     </>
//   );
// }

/* 
  return (
    <>
      {token && !isSelect && !isCreateMode && (
        <>
          <Table
            columns={columns}
            dataSource={issueList}
            rowKey={(dt) => dt.isId}
            filter
            filterOptions={filterOptions}
            onRow={(record) => {
              return {
                onClick: () => {
                  onRowClickHandler(record.isId);
                },
                style: { cursor: "pointer" },
              };
            }}
          />
          <button onClick={onCreateModeClickHandler}>신규등록</button>
        </>
      )}

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
}
*/
