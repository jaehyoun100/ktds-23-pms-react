import React, { Children, useEffect, useState } from "react";
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
import { set } from "date-fns";

const ProjectListApp = () => {
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
  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://localhost:8080/api/project/search", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      //console.log("getList : ", json);
      return json.body;
    };
    const getProject = async () => {
      const run = await getList();
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
  }, [tokenInfo.token]);
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

  const surveyWriteAnswerClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setAnswerMode(true);
  };

  const surveyWriteQuestionClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setWriteMode(true);
  };

  const reviewWritePageClickHandler = (record) => {
    const writeReview = record;
    console.log(record);

    navigate("/review", { state: { writeReview } });
  };

  const viewReviewResultHandler = (record) => {};

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
      width: "auto",
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
      width: "auto",
    },
    { title: "PM", dataIndex: "pm", key: "pm", width: "auto" },
    {
      title: "고객사",
      dataIndex: ["clientVO", "clntName"],
      key: "clntName",
      width: "auto",
    },
    {
      title: "프로젝트 기한",
      dataIndex: "endDt",
      key: "endDt",
      width: "auto",
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
        console.log(record);
        if (record.prjSts === "409") {
          if (info[2].admnCode !== "301" && info[4][index].role !== "PM") {
            if (info[4][index].rvYn === "Y") {
              return (
                <>
                  <span>후기 작성완료</span>
                </>
              );
            } else {
              return (
                <>
                  <button onClick={() => reviewWritePageClickHandler(record)}>
                    후기 작성하기
                  </button>
                </>
              );
            }
          } else {
            return (
              <>
                <button onClick={() => viewReviewResultHandler(record)}>
                  후기 결과보기
                </button>
              </>
            );
          }
        } else {
          return (
            <>
              <span>프로젝트 진행 중</span>
            </>
          );
        }
      },
    },
    {
      title: "설문작성",
      dataIndex: "srvSts",
      key: "srvSts",
      width: "auto",
      render: (srvsts, record, index) => {
        if (record.prjSts !== "409") {
          /*  return "미종료";  */
          return <>{record.prjSts}</>;
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
            <button /* onClick={() => surveyResultClickHandler(record.prjId)} */
            >
              결과 보기
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
                <button /* onClick={() => surveyResultClickHandler(record.prjId)} */
                >
                  결과 보기
                </button>
              )}
            </>
          );
        }
      },
    },
  ];

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
      {!answerMode && !writeMode && data && (
        <>
          <Button onClickHandler={() => navigate("/project/create")}>
            생성
          </Button>
          <div>{data.projectCount}개의 프로젝트</div>
          <Table
            columns={columns}
            dataSource={data.projectList}
            rowKey={(data) => data.id}
            filter
            filterOptions={filterOptions}
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
        <SurveyAnswer
          token={tokenInfo.token}
          selectedProjectId={selectedProjectId}
          setAnswerMode={setAnswerMode}
          info={info}
          setReload={setReload}
        />
      )}
      {writeMode && (
        <SurveyWrite
          token={tokenInfo.token}
          setWriteMode={setWriteMode}
          surveys={data} // 설문 데이터를 SurveyWrite 컴포넌트로 전달
          selectedProjectId={selectedProjectId} // 선택된 프로젝트 ID 전달
          info={info}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default ProjectListApp;
