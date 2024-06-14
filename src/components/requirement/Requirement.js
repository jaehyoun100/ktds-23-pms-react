import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { loadRequirements } from "../../http/requirementHttp";
import Table from "../../utils/Table";

export default function Requirement() {
  const [requirement, setRequirement] = useState();
  const token = localStorage.getItem("token");

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  // const query = new URLSearchParams(useLocation().search);
  // const prjId = query.get("prjId");
  const { prjIdValue } = useParams();

  const onRqmCreateHandler = () => {
    navigate("/requirement/write");
  };

  useEffect(() => {
    // 요구사항 리스트 불러오기
    const getRequirementList = async () => {
      const json = await loadRequirements(token, prjIdValue);
      setRequirement(json);
    };

    getRequirementList();
  }, [token, prjIdValue]);

  const { count, body: data } = requirement || {};
  console.log("count: ", count);

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  // 테이블 컬럼
  const columns = [
    {
      title: "프로젝트",
      dataIndex: ["projectVO", "prjName"],
      key: "prjName",
      width: "30%",
    },
    {
      title: "제목",
      dataIndex: "rqmTtl",
      key: "rqmTtl",
      width: "20%",
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/employee/view/${row.empId}`)}
        >
          {data}
        </span>
      ),
    },
    {
      title: "일정상태",
      dataIndex: ["scdStsVO", "cmcdName"],
      key: "cmcdName",
      width: "10%",
    },
    {
      title: "진행상태",
      dataIndex: ["rqmStsVO", "cmcdName"],
      key: "cmcdName",
      width: "10%",
    },
    {
      title: "작성자",
      dataIndex: ["crtrIdVO", "empName"],
      key: "empName",
      width: "10%",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
      width: "20%",
    },
  ];

  // 검색 필터
  const filterOptions = [
    {
      label: "프로젝트",
      value: "prjName",
    },
    {
      label: "제목",
      value: "rqmTtl",
    },
    {
      label: "작성자",
      value: "empName",
    },
  ];

  return (
    <>
      {/** 데이터가 로딩되고, 필터링된 요구사항 데이터가 있을때 */}
      {data && count > 0 ? (
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
                    <td>{item.projectVO.prjName}</td>
                    <td>
                      <Link
                        to={`/requirement/view?prjId=${item.projectVO.prjId}&rqmId=${item.rqmId}`}
                      >
                        {item.rqmTtl}
                      </Link>
                    </td>
                    <td>{item.scdStsVO.cmcdName}</td>
                    <td>{item.rqmStsVO.cmcdName}</td>
                    <td>{item.crtrIdVO.empName}</td>
                    <td>{item.crtDt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>해당 프로젝트에 대한 요구사항이 없습니다.</div>
      )}
      {/* {token && (
        <>
          <div>총 {count}개의 요구사항이 검색되었습니다.</div>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(dt) => dt.rqmId}
            filter
            filterOptions={filterOptions}
          />
        </>
      )} */}

      <div className="button-area right-align">
        <button>삭제</button>
        <button onClick={onRqmCreateHandler}>요구사항 생성</button>
      </div>
    </>
  );
}
