import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteOutput,
  loadOutputs,
  loadTeamListByPrjId,
  outputFileDownload,
} from "../../http/outputHttp";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OutputModify from "./OutputModify";
import Table from "../../utils/Table";
import MainHeader from "../project/main/MainHeader";

export default function Output() {
  const [output, setOutput] = useState({
    outputList: [],
    isPmAndPl: [],
  });
  // 선택한 산출물의 ID
  const [selectedOutputId, setSelectedOutputId] = useState();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReload, setNeedReload] = useState();
  const token = localStorage.getItem("token");

  const [teamList, setTeamList] = useState();
  const [userData, setUserData] = useState();
  const [project, setProject] = useState();

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

  const location = useLocation();
  useMemo(() => {
    const projectState = location.state || {};
    setProject(projectState.project);
  }, [location.state]);

  // const query = new URLSearchParams(useLocation().search);
  // const prjNameValue = query.get("prjName");

  const { prjIdValue } = useParams();

  const onOutputModifyHandler = (outputId) => {
    setSelectedOutputId(outputId);
    setIsModifyMode(true);
  };

  const onOutputDeleteHandler = async (outputId) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (check) {
      const json = await deleteOutput(token, outputId);
      if (json) {
        setNeedReload(Math.random());
      } else {
        alert("삭제할 권한이 없습니다.");
      }
    }
  };

  const onOutputCreateHandler = () => {
    navigate(`/output/${prjIdValue}/write`, { state: { project } });
  };

  const onFileClickHandler = async (outputId, fileName) => {
    // 클릭 시 파일 다운로드
    const response = await outputFileDownload(token, outputId);

    if (!response.ok) {
      console.error(
        `File download failed with status code: ${response.status}`
      );
      throw new Error("File download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const fetchParams = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchLoadOutputs = useCallback(async (params) => {
    const { token, prjIdValue } = params;
    return await loadOutputs(token, prjIdValue);
  }, []);

  useEffect(() => {
    // 산출물 리스트 불러오기
    const getOutputs = async () => {
      const json = await fetchLoadOutputs({ ...fetchParams, prjIdValue });
      console.log("Outputs loaded:", json);
      const { outputList, isPmAndPl } = json.body;
      setOutput({
        outputList,
        isPmAndPl,
      });
    };

    getOutputs();
  }, [fetchLoadOutputs, fetchParams, prjIdValue]);

  useEffect(() => {
    // 프로젝트 ID로 팀원들의 정보 가져와서 배열에 SET
    const getTeammateList = async () => {
      const json = await loadTeamListByPrjId(token, prjIdValue);
      console.log("Teammate list loaded:", json);

      const { body: teammateData } = json;

      const list = teammateData.map((item) => item.employeeVO);
      setTeamList(list);
    };

    getTeammateList();
  }, [token, prjIdValue]);

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
      console.log("User data loaded:", json);
      setUserData(json.body);
    };
    userInfo();
  }, [token]);

  const { outputList: data, isPmAndPl } = output || {};

  // 로그인한 사원이 프로젝트의 팀원에 속해 있으면 true, 아니면 false 반환.
  const isUserInTeam =
    userData &&
    teamList &&
    teamList.find((member) => member.empName === userData.empName) !== undefined
      ? true
      : false;

  console.log("isUserInTeam: ", isUserInTeam);

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  // 테이블 컬럼
  const columns = [
    {
      title: "프로젝트",
      dataIndex: ["project", "prjName"],
      key: "prjName",
      width: "auto",
    },
    {
      title: "산출물 제목",
      dataIndex: "outTtl",
      key: "outTtl",
      width: "auto",
    },
    {
      title: "산출물 종류",
      dataIndex: ["outTypeVO", "cmcdName"],
      key: "cmcdName",
      width: "auto",
    },
    {
      title: "버전",
      // {item.outVerSts.cmcdName} Ver.{item.level}
      dataIndex: ["outVerSts", "cmcdName"],
      key: "cmcdName",
      width: "auto",
      render: (data, row) => (
        <span>
          {data} Ver.{row.level}
        </span>
      ),
    },
    {
      title: "파일명",
      dataIndex: "outFile",
      key: "outFile",
      width: "auto",
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => onFileClickHandler(row.outId, row.outFile)}
        >
          {data}
        </span>
      ),
    },
    {
      title: "작성자",
      dataIndex: ["crtrIdVO", "empName"],
      key: "empName",
      width: "auto",
    },
    {
      title: "등록일",
      dataIndex: "crtDt",
      key: "crtDt",
      width: "auto",
    },
    {
      title: "수정",
      width: "7%",

      render: (data, row) => {
        if (
          userData.empName === row.crtrIdVO.empName ||
          userData.admnCode === "301"
        ) {
          return (
            <button onClick={() => onOutputModifyHandler(row.outId)}>
              수정
            </button>
          );
        } else {
          return (
            <button onClick={() => onOutputModifyHandler(row.outId)} disabled>
              수정
            </button>
          );
        }
      },
    },
    {
      title: "삭제",
      width: "7%",
      render: (data, row) => {
        if (
          userData.empName === row.crtrIdVO.empName ||
          userData.admnCode === "301"
        ) {
          return (
            <button onClick={() => onOutputDeleteHandler(row.outId)}>
              삭제
            </button>
          );
        } else {
          return (
            <button onClick={() => onOutputDeleteHandler(row.outId)} disabled>
              삭제
            </button>
          );
        }
      },
    },
  ];

  // 검색 필터
  const filterOptions = [
    {
      label: "산출물명",
      value: "outTtl",
    },
  ];

  return (
    <>
      {/** 데이터가 불러와졌고, 수정모드가 아니면  */}
      {data.outputList && userData && (
        <>
          {!isModifyMode && data.listCnt > 0 && (
            <>
              {token && project && (
                <>
                  <MainHeader project={project} />
                  <div style={{ marginBottom: "20px" }}>
                    총 {data.listCnt}개의 산출물이 검색되었습니다.
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data.outputList}
                    rowKey={(dt) => dt.rqmId}
                    filter
                    filterOptions={filterOptions}
                  />
                </>
              )}
            </>
          )}

          {!isModifyMode && data.listCnt < 1 && (
            <>
              {token && (
                <>
                  <MainHeader project={project} />
                  <div style={{ marginBottom: "20px" }}>
                    해당 프로젝트에 대한 산출물이 없습니다.
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

          {isModifyMode && (
            <OutputModify
              setIsModifyMode={setIsModifyMode}
              selectedOutputId={selectedOutputId}
              setSelectedOutputId={setSelectedOutputId}
              setNeedReload={setNeedReload}
              prjName={data.outputList[0].project.prjName}
            />
          )}

          {/** 수정 모드가 아니고, 로그인 사용자 정보가 로드되고,
           * 로그인한 사원이 관리자이거나 PM or PL 이거나 팀원일때 버튼 보여주기
           */}
          {!isModifyMode &&
            data &&
            userData &&
            (userData.admnCode === "301" ||
              isPmAndPl === true ||
              isUserInTeam) && (
              <div className="button-area right-align">
                <button onClick={onOutputCreateHandler}>산출물 생성</button>
              </div>
            )}
        </>
      )}
    </>
  );
}
