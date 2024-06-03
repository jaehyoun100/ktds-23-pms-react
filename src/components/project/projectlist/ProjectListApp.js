import React, { useEffect, useState } from "react";
import Button from "../../common/Button/Button";
import Search from "../../common/search/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProjectListApp = () => {
  const [data, setData] = useState([]);
  const [searchDataCommonCode, setSearchDataCommonCode] = useState();
  const [selectCommonCode, setSelectCommonCode] =
    useState("옵션 선택해주세요.");

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
      console.log(run[0]);
      let optionList = [];
      for (let i = 0; i < run[0].length; i++) {
        optionList[i] = { value: run[0][i].cmcdId, name: run[0][i].cmcdName };
      }
      setSearchDataCommonCode(optionList);
    };
    getProject();
  }, [tokenInfo.token]);
  const onClickHandler = () => {
    // 프로젝트 생성 api 호출
  };
  const searchOnClickHandler = () => {
    // 프로젝트 검색 api 호출
    // selectCommonCode : 선택된 프로젝트 상태 코드
  };
  const navigate = useNavigate();
  return (
    <div>
      {searchDataCommonCode && (
        <Search
          optionList={searchDataCommonCode}
          setSelectedData={setSelectCommonCode}
          onClickHandler={searchOnClickHandler}
          selectedData={selectCommonCode}
        />
      )}
      <Button onClickHandler={onClickHandler}>생성</Button>
      {data && (
        <>
          <div>{data.projectCount}개의 프로젝트</div>
          {data.projectList?.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate("/project/view", { state: { key: { item } } });
              }}
            >
              {item.prjName}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProjectListApp;
