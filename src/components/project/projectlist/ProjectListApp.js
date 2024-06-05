import React, { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Table from "../../../utils/Table";
import { getReviewYN } from "../../../http/reviewHttp";

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
      // setCurrencyList({data})
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

      let projectIdArr = [];

      for (let i = 0; i < run[1].projectList.length; i++) {
        projectIdArr[i] = run[1].projectList[i].prjId;
      }
      setPrjId(projectIdArr);
    };
    getProject();
  }, [tokenInfo.token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const result = async () => {
      const body = await getReviewYN(token, prjIdList);

      setReviewResult(body.body);
    };

    result();
  }, [prjIdList]);

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
      width: "20%",
    },
    { title: "PM", dataIndex: "pm", key: "pm", width: "10%" },
    {
      title: "고객사",
      dataIndex: ["clientVO", "clntName"],
      key: "clntName",
      width: "15%",
    },
    {
      title: "프로젝트 기한",
      dataIndex: "endDt",
      key: "endDt",
      width: "10%",
      // render: (data) => (
      //   <span>{data}</span>
      // ),
    },
    {
      title: "진행상황",
      dataIndex: ["prjStsCode", "cmcdName"],
      key: "cmcdName",
      width: "10%",
    },
    { title: "후기작성", dataIndex: "", key: "", width: "10%" },
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
      <Button onClickHandler={() => navigate("/project/create")}>생성</Button>
      {data && (
        <>
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
    </div>
  );
};

export default ProjectListApp;
