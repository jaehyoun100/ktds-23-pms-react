import React, { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";

const ProjectListApp = () => {
  const [data, setData] = useState([]);
  const [searchDataCommonCode, setSearchDataCommonCode] = useState();
  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://localhost:8080/api/project/search", {
        headers: {},
        method: "GET",
      });
      const json = await response.json();
      return json;
    };
    setData(getList());
  }, []);
  const onClickHandler = () => {
    // 프로젝트 생성 api 호출
  };
  const searchOnClickHandler = () => {
    // 프로젝트 검색 api 호출
    // searchDataCommonCode : 선택된 프로젝트 상태 코드
  };
  return (
    <div>
      <Button onClickHandler={onClickHandler}>생성</Button>
      <Search
        optionList={data.projectCommonCodeList}
        setSelectedData={setSearchDataCommonCode}
        onClickHandler={searchOnClickHandler}
      />
      {data.projectListVO?.map(() => (
        <></>
      ))}
    </div>
  );
};

export default ProjectListApp;
