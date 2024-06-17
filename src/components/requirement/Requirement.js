import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  loadRequirements,
  loadTeamListByPrjId,
} from "../../http/requirementHttp";
import Table from "../../utils/Table";
import MainHeader from "../project/main/MainHeader";

export default function Requirement() {
  const [requirement, setRequirement] = useState({
    requirementList: [],
    isPmAndPl: [],
  });
  const [teamList, setTeamList] = useState();
  const [userData, setUserData] = useState();
  const [project, setProject] = useState();

  const token = localStorage.getItem("token");

  // const query = new URLSearchParams(useLocation().search);
  // const prjNameValue = query.get("prjName");

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const location = useLocation();
  useMemo(() => {
    const projectState = location.state || {};
    setProject(projectState.project);
  }, [location.state]);

  // const query = new URLSearchParams(useLocation().search);
  // const prjId = query.get("prjId");
  const { prjIdValue } = useParams();

  const onRqmCreateHandler = () => {
    navigate(`/requirement/${prjIdValue}/write`, { state: { project } });
  };

  const rqmTtlClickHandler = (prjId, rqmId) => {
    navigate(`/requirement/view?prjId=${prjId}&rqmId=${rqmId}`);
  };

  // 로그인 유저의 정보를 받아오는 API
  useEffect(() => {
    if (!token) {
      return;
    }
    const userInfo = async () => {
      const response = await fetch("http://localhost:8080/api/", {
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
    // 요구사항 리스트 불러오기
    const getRequirementList = async () => {
      const json = await loadRequirements(token, prjIdValue);

      const { requirementList, isPmAndPl } = json.body;
      setRequirement({
        requirementList,
        isPmAndPl,
      });
    };

    getRequirementList();
  }, [token, prjIdValue]);

  useEffect(() => {
    // 프로젝트 ID로 팀원들의 정보 가져와서 배열에 SET
    const getTeammateList = async () => {
      const json = await loadTeamListByPrjId(token, prjIdValue);

      const { body: teammateData } = json;

      const list = teammateData.map((item) => item.employeeVO);
      setTeamList(list);
    };

    getTeammateList();
  }, [token, prjIdValue]);

  const { requirementList: data, isPmAndPl } = requirement || {};

  // 로그인한 사원이 프로젝트의 팀원에 속해 있으면 true, 아니면 false 반환.
  const isUserInTeam =
    userData &&
    teamList &&
    teamList.find((member) => member.empName === userData.empName) !== undefined
      ? true
      : false;

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  // 테이블 컬럼
  const columns = [
    {
      title: "프로젝트",
      dataIndex: ["projectVO", "prjName"],
      key: "prjName",
      width: "auto",
    },
    {
      title: "요구사항명",
      dataIndex: "rqmTtl",
      key: "rqmTtl",
      width: "auto",
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          // onClick={() => navigate(`/employee/view/${row.empId}`)}
          onClick={() =>
            navigate(
              `/requirement/view?prjId=${row.prjId}&rqmId=${row.rqmId}`,
              { state: { project } }
            )
          }
        >
          {data}
        </span>
      ),
    },
    {
      title: "일정상태",
      dataIndex: ["scdStsVO", "cmcdName"],
      key: "cmcdName",
      width: "auto",
    },
    {
      title: "진행상태",
      dataIndex: ["rqmStsVO", "cmcdName"],
      key: "cmcdName",
      width: "auto",
    },
    {
      title: "작성자",
      dataIndex: ["crtrIdVO", "empName"],
      key: "empName",
      width: "auto",
    },
    {
      title: "작성일",
      dataIndex: "crtDt",
      key: "crtDt",
      width: "auto",
    },
  ];

  // 검색 필터
  const filterOptions = [
    {
      label: "제목",
      value: "rqmTtl",
    },
  ];

  return (
    <>
      {/** 데이터가 로딩되고, 필터링된 요구사항 데이터가 있을때 */}
      {data.requirementList && userData && (
        <>
          {userData && data.count > 0 ? (
            <>
              {token && project && (
                <>
                  <MainHeader project={project} />
                  <div style={{ marginBottom: "20px" }}>
                    총 {data.count}개의 요구사항이 검색되었습니다.
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data.requirementList}
                    rowKey={(dt) => dt.rqmId}
                    filter
                    filterOptions={filterOptions}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {token && (
                <>
                  <MainHeader project={project} />
                  <div style={{ marginBottom: "20px" }}>
                    해당 프로젝트에 대한 요구사항이 없습니다.
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data.requirementList}
                    rowKey={(dt) => dt.rqmId}
                    filter
                    filterOptions={filterOptions}
                  />
                </>
              )}
            </>
          )}

          {/** 산출물 정보가 로그되고, 로그인 사용자정보가 로드되고,
           * 로그인한 사원이 관리자이거나 PM or PL 이거나 팀원일때 버튼 보여주기 */}
          {data &&
            userData &&
            (userData.admnCode === "301" ||
              isPmAndPl === true ||
              isUserInTeam) && (
              <div className="button-area right-align">
                {/* <button>삭제</button> */}
                <button onClick={onRqmCreateHandler}>요구사항 생성</button>
              </div>
            )}
        </>
      )}
    </>
  );
}
