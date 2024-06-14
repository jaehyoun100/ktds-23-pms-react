import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../utils/Table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegBtn from "./components/Popup/RegBtn";
import { handleRegistEmployee, loadData } from "../../http/employeeHttp";
import dayjs from "dayjs";

const defaultValues = {
  empName: "",
  email: "",
  addr: "",
  cntct: "",
  deptId: "",
  jobId: "",
  pstnId: "",
  workSts: "",
  mngrYn: "N",
  hireDt: "",
  brth: "",
};

const registData = {
  empName: "",
  email: "",
  addr: "",
  cntct: "",
  deptId: "",
  jobId: "",
  pstnId: "",
  workSts: "",
  mngrYn: "N",
  hireDt: dayjs(),
  brth: dayjs(),
};

export default function EmployeeApp() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // 페이지 네비게이션을 위한 hook
  // 게시글 선택을 위한 state (상세내용)
  const [dataList, setDataList] = useState({
    depart: [],
    team: [],
    job: [],
    grade: [],
    workSts: [],
  });

  // const [error, setError] = useState();
  const { token } = useSelector((state) => state.tokenInfo); // Redux에서 토큰 정보 가져오기

  const fetchData = useCallback(async () => {
    const json = await loadData({ token });
    if (json) {
      setData(json.body);
    }
  }, [token]);

  const url =
    "http://" +
    (window.location.host === "43.202.29.221"
      ? "43.202.29.221"
      : "localhost:8080");

  const loadDataLists = useCallback(async () => {
    const response = await fetch(`${url}/api/v1/employee/data`, {
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    setDataList(json.body);
  }, [token, url]);

  const inputOptions = useMemo(
    () => [
      {
        title: "사원명",
        type: "string",
        dataIndex: "empName",
        required: true,
      },
      {
        title: "주소",
        type: "string",
        dataIndex: "addr",
        required: true,
      },
      {
        title: "입사일자",
        type: "date",
        dataIndex: "hireDt",
        required: true,
      },
      {
        title: "생일",
        type: "date",
        dataIndex: "brth",
        required: true,
      },
      {
        title: "연락처",
        type: "string",
        dataIndex: "cntct",
        required: true,
      },
      {
        title: "부서",
        type: "select",
        dataIndex: "deptId",
        option: dataList.depart.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "직무",
        type: "select",
        dataIndex: "jobId",
        option: dataList.job.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "직급",
        type: "select",
        dataIndex: "pstnId",
        option: dataList.grade.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "재직상태",
        type: "select",
        dataIndex: "workSts",
        option: dataList.workSts.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "임원여부",
        type: "radio",
        dataIndex: "mngrYn",
        option: [
          { label: "아니오", value: "N" },
          { label: "예", value: "Y" },
        ],
        required: true,
      },
    ],
    [dataList]
  );

  const columns = [
    {
      title: "사번",
      dataIndex: "empId",
      key: "empId",
      width: "20%",
    },
    {
      title: "사원명",
      dataIndex: "empName",
      key: "empName",
      // render는 테이블에서 dataIndex에서 지정한 데이터를 첫번째 argument로 받고
      // 해당 row 전체를 두번째 argument로 받는다.
      // 여기서는 empName이라는 dataIndex로 값을 가져오기때문에, 첫번째 인자인 data 는 empName이다.
      // 여기서는 사원명을 클릭하면, 사원정보페이지로 이동하는데, 사원정보페이지에서 해당 사원의 정보조회를 위해 empId가 필요하기 때문에
      // row에서 empId를 추출해 사용한다.
      // =============
      // title: "사원명",
      // key: "empName",
      // render: (row) => (
      //   <span style={{ cursor: "pointer" }} onClick={() => navigate(`/employee/view/${row.empId}`)}>
      //     {row.empName}
      //   </span>
      // ),
      // 위와같이, dataIndex를 지정하지 않는 경우에는 첫번째 인자로 row를 받을 수 있다.
      render: (data, row) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/employee/${row.empId}`)}
        >
          {data}
        </span>
      ),
    },
    {
      title: "부서",
      dataIndex: ["departmentVO", "deptName"],
      key: "deptName",
      width: "20%",
      // 데이터의 구조가, 하위뎁스로 내려가는 경우 데이터 인덱스는, 위와같이 배열로 입력한다.
    },
    {
      title: "팀",
      dataIndex: ["teamVO", "tmName"],
      key: "tmName",
      width: "20%",
    },

    {
      title: "입사일",
      dataIndex: "hireDt",
      key: "hireDt",
      width: "20%",
    },
  ];

  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     empId: "empId",
  //     empName: "empName",
  //     departmentVO: "departmentVO.deptName",
  //     teamVO: "teamVO.tmName",
  //     hireDt: "hireDt",
  //   });
  // }

  //검색 필터
  const filterOptions = [
    {
      label: "사번",
      value: "empId",
    },
    {
      label: "사원명",
      value: "empName",
    },
    // {
    //   label: "부서명",
    //   value: "deptId",
    //   dataIndex: "deptName", // 실제 검색할 필드
    // },
  ];

  const handleAddEmployee = useCallback(
    async (data) => {
      await handleRegistEmployee({ data, token });
      await fetchData(); // 데이터 다시 불러오기
    },
    [token, fetchData]
  );

  useEffect(() => {
    loadDataLists();
    fetchData();
  }, [loadDataLists, fetchData]);

  return (
    <>
      <div>총 {data.length}명이 조회되었습니다.</div>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(dt) => dt.empId}
        filter
        filterOptions={filterOptions}
      />
      {/* {
        userInfo.deptId === "DEPT_230101_000010" &&
      <Button style={{ borderColor: "#fff", float: "right" }}>{btnText || "사원등록"}</Button>
      } */}
      <RegBtn
        data={registData}
        defaultValues={defaultValues}
        options={inputOptions}
        btnText="사원등록"
        onOk={handleAddEmployee}
      />
    </>
  );
}

// TODO: 로그인 시, Redux store와 sessionStorage 로그인한 유저 정보 저장하도록 요구.
// 그 후,
