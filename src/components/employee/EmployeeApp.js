import { useCallback, useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import Table from "../../utils/Table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegBtn from "./components/Popup/RegBtn";
import { loadData } from "../../http/employeeHttp";

export default function EmployeeApp() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // 페이지 네비게이션을 위한 hook
  // const [error, setError] = useState();
  const { token } = useSelector((state) => state.tokenInfo); // Redux에서 토큰 정보 가져오기

  useEffect(() => {
    const fetchData = async () => {
      const json = await loadData({ token });
      if (json) {
        setData(json.body);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

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
          onClick={() => navigate(`/employee/view/${row.empId}`)}
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
    //   value: "departmentVO", "deptName",
    // },
  ];
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
      <RegBtn />
    </>
  );
}
