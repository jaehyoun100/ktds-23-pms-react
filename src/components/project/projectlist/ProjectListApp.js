import React, { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Table from "../../../utils/Table";
import { getReviewYN } from "../../../http/reviewHttp";
import SurveyAnswer from "../../survey/components/SurveyAnswer";
import SurveyWrite from "../../survey/components/SurveyWriteApp";

const ProjectListApp = () => {
  const [data, setData] = useState([]);
  const [searchDataCommonCode, setSearchDataCommonCode] = useState();
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectCommonCode, setSelectCommonCode] =
    useState("옵션 선택해주세요.");
  const [currencyList, setCurrencyList] = useState([]);
  // 후기
  const [prjIdList, setPrjId] = useState([]);
  const [reviewResult, setReviewResult] = useState([]);
  const [info, setInfo] = useState({});
  const [answerMode, setAnswerMode] = useState(false);
  const [writeMode, setWriteMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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
      return json.body;
    };
    const getProject = async () => {
      const run = await getList();
      setData(run[1]);
      console.log(run[1]);

      let optionList = [];
      let filterOptionArray = [];
      for (let i = 0; i < run[0].length; i++) {
        optionList[i] = { value: run[0][i].cmcdId, name: run[0][i].cmcdName };
        filterOptionArray[i] = {
          value: run[0][i].cmcdId,
          label: run[0][i].cmcdName,
        };
      }
      setSearchDataCommonCode(optionList);
      setFilterOptions(filterOptionArray);
      setInfo(run);

      let projectIdArr = [];
      for (let i = 0; i < run[1].projectList.length; i++) {
        projectIdArr[i] = run[1].projectList[i].prjId;
      }
      setPrjId(projectIdArr);
    };
    getProject();
  }, [tokenInfo.token]);

  const surveyWriteAnswerClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setAnswerMode(true);
  };

  const surveyWriteQuestionClickHandler = (projectId) => {
    setSelectedProjectId(projectId);
    setWriteMode(true);
  };

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
    { title: "후기작성", dataIndex: "", key: "", width: "auto" },
    {
      title: "설문작성",
      dataIndex: "srvSts",
      key: "srvSts",
      width: "auto",
      render: (srvsts, record, index) => {
        if (info[1].projectList[index].prjSts !== "409") {
          return "프로젝트 미종료";
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
                <button
                  onClick={() => surveyWriteAnswerClickHandler(record.prjId)}
                >
                  설문 답변
                </button>
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
            rowKey={(dt) => dt.id}
            filter
            filterOptions={filterOptions}
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
        />
      )}
      {writeMode && (
        <SurveyWrite
          token={tokenInfo.token}
          setWriteMode={setWriteMode}
          surveys={data} // 설문 데이터를 SurveyWrite 컴포넌트로 전달
          selectedProjectId={selectedProjectId} // 선택된 프로젝트 ID 전달
          info={info}
        />
      )}
    </div>
  );
};

export default ProjectListApp;
