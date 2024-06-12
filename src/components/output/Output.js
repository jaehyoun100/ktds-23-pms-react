import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteOutput,
  loadOutputs,
  outputFileDownload,
} from "../../http/outputHttp";
import { Link, useNavigate } from "react-router-dom";
import OutputModify from "./OutputModify";
import Table from "../../utils/Table";

export default function Output() {
  const [output, setOutput] = useState();
  // 선택한 산출물의 ID
  const [selectedOutputId, setSelectedOutputId] = useState();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [needReload, setNeedReload] = useState();
  const token = localStorage.getItem("token");

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();

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
    navigate("/output/write");
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
    const { token } = params;
    return await loadOutputs(token);
  }, []);

  useEffect(() => {
    // 산출물 리스트 불러오기
    const getOutputs = async () => {
      const json = await fetchLoadOutputs({ ...fetchParams });
      setOutput(json);
    };

    getOutputs();
  }, [fetchLoadOutputs, fetchParams, token]);

  const { count, body: data } = output || {};

  if (!data) {
    return <div>Loading...</div>; // 데이터 로딩 중
  }

  // 테이블 컬럼
  const columns = [
    {
      title: "프로젝트",
      dataIndex: ["projectVO", "prjName"],
      key: "prjName",
      width: "10%",
    },
    {
      title: "산출물 제목",
      dataIndex: "outTtl",
      key: "outTtl",
      width: "10%",
    },
    {
      title: "산출물 종류",
      dataIndex: ["outTypeVO", "cmcdName"],
      key: "cmcdName",
      width: "10%",
    },
    {
      title: "버전",
      dataIndex: ["outVerSts", "cmcdName"],
      key: "cmcdName",
      width: "10%",
    },
    {
      title: "파일명",
      dataIndex: "outFile",
      key: "outFile",
      width: "10%",
    },
    {
      title: "작성자",
      dataIndex: ["crtrIdVO", "empName"],
      key: "empName",
      width: "10%",
    },
    {
      title: "등록일",
      dataIndex: "crtDt",
      key: "crtDt",
      width: "10%",
    },
    {
      title: "수정",
      dataIndex: "",
      key: "",
      width: "10%",
    },
    {
      title: "삭제",
      dataIndex: "",
      key: "",
      width: "10%",
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
      value: "outTtl",
    },
    {
      label: "작성자",
      value: "empName",
    },
  ];

  return (
    <>
      {/** 데이터가 불러와졌고, 수정모드가 아니면  */}
      {data && !isModifyMode && (
        <>
          <div>총 {count}개의 산출물이 검색되었습니다.</div>
          <table>
            <thead>
              <tr>
                <th>프로젝트</th>
                <th>산출물 제목</th>
                <th>산출물 종류</th>
                <th>버전</th>
                <th>파일명</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.outId}>
                    <td>{item.project.prjName}</td>
                    <td>{item.outTtl}</td>
                    <td>{item.outTypeVO.cmcdName}</td>
                    <td>
                      {item.outVerSts.cmcdName} Ver.{item.level}
                    </td>
                    <td>
                      <div
                        onClick={() =>
                          onFileClickHandler(item.outId, item.outFile)
                        }
                      >
                        {item.outFile}
                      </div>
                    </td>
                    <td>{item.crtrIdVO.empName}</td>
                    <td>{item.crtDt}</td>
                    <td>
                      <button onClick={() => onOutputModifyHandler(item.outId)}>
                        수정
                      </button>
                    </td>
                    <td>
                      <button onClick={() => onOutputDeleteHandler(item.outId)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {data && isModifyMode && (
        <OutputModify
          setIsModifyMode={setIsModifyMode}
          selectedOutputId={selectedOutputId}
          setSelectedOutputId={setSelectedOutputId}
          setNeedReload={setNeedReload}
        />
      )}

      {!isModifyMode && (
        <div className="button-area right-align">
          <button onClick={onOutputCreateHandler}>산출물 생성</button>
        </div>
      )}
    </>
  );
}
