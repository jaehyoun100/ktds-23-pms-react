import React, { useCallback, useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";
import { useSelector } from "react-redux";

const ProjectListApp = () => {
  const [data, setData] = useState([]);
  const [searchDataCommonCode, setSearchDataCommonCode] = useState();

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
      setSearchDataCommonCode(run[0]);
    };
    getProject();
  }, [tokenInfo.token]);
  const onClickHandler = () => {
    // 프로젝트 생성 api 호출
  };
  const searchOnClickHandler = () => {
    // 프로젝트 검색 api 호출
    // searchDataCommonCode : 선택된 프로젝트 상태 코드
  };
  return (
    <div>
      <div>{data.projectCount}개의 프로젝트</div>
      <Button onClickHandler={onClickHandler}>생성</Button>
      <Search
        optionList={data.projectCommonCodeList}
        setSelectedData={setSearchDataCommonCode}
        onClickHandler={searchOnClickHandler}
      />
      {data.projectList?.map((item, idx) => (
        <div key={idx}>{item.prjName}</div>
      ))}
    </div>
  );
};

export default ProjectListApp;
