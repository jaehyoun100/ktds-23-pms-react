import React, { Children, useCallback, useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Table from "../../../utils/Table";
import {
  getEmpPrjList,
  getReviewYN,
  viewWriteReviewPage,
  writeReview,
} from "../../../http/reviewHttp";
import SurveyAnswer from "../../survey/components/SurveyAnswer";
import SurveyWrite from "../../survey/components/SurveyWriteApp";
import { format, set } from "date-fns";
import SurveyResult from "../../survey/components/SurveyResult";
import { getPrjApi, getPrjList } from "../../../http/projectHttp";
import { jwtDecode } from "jwt-decode";
import MainHeader from "../main/MainHeader";

const ProjectListApp = () => {
  const token = localStorage.getItem("token");
  const userInfo = jwtDecode(token).user;
  const [data, setData] = useState([]);
  const [searchDataCommonCode, setSearchDataCommonCode] = useState();
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectCommonCode, setSelectCommonCode] =
    useState("옵션 선택해주세요.");
  const [currencyList, setCurrencyList] = useState([]);
  // 후기
  const [prjIdList, setPrjIdList] = useState([]);
  const [reviewResult, setReviewResult] = useState([]);
  const [info, setInfo] = useState({});
  const [answerMode, setAnswerMode] = useState(false);
  const [writeMode, setWriteMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [reload, setReload] = useState();
  const [surveyResultMode, setSurveyResultMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

  const memoizeGetPrjList = useCallback(getPrjList, []);
  useEffect(() => {
    const getProject = async () => {
      const run = await memoizeGetPrjList(token);
      setData(run[1]);

      let optionList = [];
      let filterOptionArray = [];
      for (let i = 0; i < run[0].length; i++) {
        optionList[i] = { value: run[0][i].cmcdId, name: run[0][i].cmcdName };

        filterOptionArray[i] = {
          value: run[0][i].cmcdId,
          label: run[0][i].cmcdName,
        };
      }

      const newFilterOption = [{ label: "프로젝트명", value: "prjName" }];

      setSearchDataCommonCode(newFilterOption);
      setFilterOptions(newFilterOption);
      setInfo(run);
    };
    getProject();
  }, [token]);
  console.log(info);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const result = async () => {
      const empPrjList = await getEmpPrjList(token);
      let projectIdArr = [];
      for (let i = 0; i < empPrjList.body.length; i++) {
        projectIdArr[i] = empPrjList.body[i].prjId;
      }

      // setPrjIdList(projectIdArr);
      const body = await getReviewYN(token, projectIdArr);
      setReviewResult(body.body);
    };
    result();
  }, []);
  const memoizedgetPrjApi = useCallback(getPrjApi, []);

  const surveyWriteAnswerClickHandler = async (projectId) => {
    const run = await memoizedgetPrjApi(token, projectId);
    setSelectedProjectId(projectId);
    setAnswerMode(true);
    setSelectedProject(run);
  };

  const surveyWriteQuestionClickHandler = async (projectId) => {
    const run = await memoizedgetPrjApi(token, projectId);
    setSelectedProjectId(projectId);
    setWriteMode(true);
    setSelectedProject(run);
  };

  const surveyResultClickHandler = async (projectId) => {
    const run = await memoizedgetPrjApi(token, projectId);
    setSelectedProjectId(projectId);
    setSurveyResultMode(true);
    setSelectedProject(run);
  };

  const reviewWritePageClickHandler = (record) => {
    const writeReview = record;
    navigate("/review/write", { state: { writeReview } });
  };

  const viewReviewResultHandler = (record) => {
    const viewResult = record;
    navigate("/review/result", { state: { viewResult } });
  };

  /*   useEffect(() => {
    if (data.projectList !== undefined) {
      Object.assign(data.projectList, reviewResult);
      // console.log(data);
    }
  }); */

  const columns = [
    {
      title: "프로젝트명",
      dataIndex: "prjName",
      key: "prjName",
      width: "25%",
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/project/view", { state: { key: row } });
          }}
        >
          {data}
        </span>
      ),
    },
    {
      title: "담당부서",
      dataIndex: ["deptVO", "deptName"],
      key: "deptName",
      width: "15%",
    },
    {
      title: "PM",
      dataIndex: ["pm", "employeeVO", "empName"],
      key: "pm",
      width: "10%",
    },
    {
      title: "고객사",
      dataIndex: ["clientVO", "clntName"],
      key: "clntName",
      width: "10%",
    },
    {
      title: "프로젝트 기한",
      dataIndex: "endDt",
      key: "endDt",
      width: "auto",

      render: (date) => {
        return (
          <>
            {new Date(date) > new Date() ? (
              "D - " + format(new Date(date) - new Date(), "d")
            ) : (
              <>{new Date(date) === new Date() ? "D - DAY" : "마감"}</>
            )}
          </>
        );
      },
    },
    {
      title: "진행상황",
      dataIndex: ["prjStsCode", "cmcdName"],
      key: "cmcdName",
      width: "auto",
    },
    {
      title: "후기작성",
      width: "auto",
      render: (rvYn, record, index) => {
        if (record.prjSts === "409") {
          if (info[2].admnCode !== "301" && info[4][index].role !== "PM") {
            if (info[4][index].rvYn === "Y") {
              return (
                <>
                  <span>작성 완료</span>
                </>
              );
            } else {
              return (
                <>
                  <button onClick={() => reviewWritePageClickHandler(record)}>
                    후기 작성
                  </button>
                </>
              );
            }
          } else {
            return (
              <>
                <button onClick={() => viewReviewResultHandler(record)}>
                  후기 결과
                </button>
              </>
            );
          }
        } else {
          return (
            <>
              <span style={{ marginLeft: "30px" }}>-</span>
            </>
          );
        }
      },
    },
    {
      title: "설문작성",
      dataIndex: "srvSts",
      key: "srvSts",
      width: "10%",
      render: (srvsts, record, index, prjId) => {
        if (record.prjSts !== "409") {
          return <div style={{ marginLeft: "30px" }}>-</div>;
          /* return (<>
            {record.prjSts}
            </>
          ); */
        }

        if (srvsts === "N") {
          return info[2].admnCode === "301" && !info[3] ? (
            "미생성"
          ) : (
            <>
              {!info[3] ? (
                "미생성"
              ) : (
                <button
                  onClick={() => surveyWriteQuestionClickHandler(record.prjId)}
                >
                  설문 작성
                </button>
              )}
            </>
          );
        } else {
          return info[2].admnCode === "301" && !info[3] ? (
            <button onClick={() => surveyResultClickHandler(record.prjId)}>
              설문 결과
            </button>
          ) : (
            <>
              {!info[3] ? (
                <>
                  {info[4] && info[4][index] && (
                    <>
                      {info[4][index].srvYn === "N" ? (
                        <button
                          onClick={() =>
                            surveyWriteAnswerClickHandler(record.prjId)
                          }
                        >
                          설문 답변
                        </button>
                      ) : (
                        "설문 완료"
                      )}
                    </>
                  )}
                </>
              ) : (
                <button onClick={() => surveyResultClickHandler(record.prjId)}>
                  설문 결과
                </button>
              )}
            </>
          );
        }
      },
    },
  ];

  const onClickHandler = () => {
    navigate("/project/create");
  };

  const navigate = useNavigate();
  return (
    <div>
      {/* {searchDataCommonCode && (
        <Search
          optionList={searchDataCommonCode}
          setSelectedData={setSelectCommonCode}
          onClickHandler={searchOnClickHandler}
          selectedData={selectCommonCode}
        />
      )} */}
      {!answerMode && !writeMode && !surveyResultMode && data && (
        <>
          <div
            style={{
              marginLeft: "10px",
              marginBottom: "20px",
              color: "var(--second-color)",
            }}
          >
            총 {data.projectCount} 개의 프로젝트가 조회되었습니다.
          </div>
          <Table
            tableStyleClass="prj-table-style"
            columns={columns}
            dataSource={data.projectList}
            rowKey={(data) => data.id}
            filter
            filterOptions={filterOptions}
            btnOnClickHandler={onClickHandler}
            buttonName={userInfo.admnCode === "301" ? "프로젝트 생성" : false}
            buttonClassName="prj-button-position"
            info={info}
          />

          {/* {data.projectList?.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate("/project/view", { state: { key: { item } } });
              }}
            >
              {item.prjName}
            </div>
          ))} */}
        </>
      )}
      {answerMode && (
        <>
          <MainHeader project={selectedProject} />
          <SurveyAnswer
            token={token}
            selectedProjectId={selectedProjectId}
            setAnswerMode={setAnswerMode}
            info={info}
            setReload={setReload}
          />
        </>
      )}
      {writeMode && (
        <>
          <MainHeader project={selectedProject} />
          <SurveyWrite
            token={token}
            setWriteMode={setWriteMode}
            surveys={data} // 설문 데이터를 SurveyWrite 컴포넌트로 전달
            selectedProjectId={selectedProjectId} // 선택된 프로젝트 ID 전달
            info={info}
            setReload={setReload}
          />
        </>
      )}
      {surveyResultMode && (
        <>
          <MainHeader project={selectedProject} />
          <SurveyResult
            token={token}
            setSurveyResultMode={setSurveyResultMode}
            selectedProjectId={selectedProjectId}
            info={info}
          />
        </>
      )}
    </div>
  );
};

export default ProjectListApp;
