import { useEffect } from "react";
import Table from "../../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCommuteLog } from "../../http/commuteHttp";
import { getEmployee } from "../../http/userDetailHttp";

export default function CommuteApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { body } = useSelector((state) => state.commuteInfo);
  const { employee } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getCommuteLog(token));
    dispatch(getEmployee(token));
  }, [token, dispatch]);

  const columns = [
    {
      title: "사원명",
      dataIndex: ["employeeVO", "empName"],
      key: "empName",
    },
    {
      title: "날 자",
      dataIndex: "cmmtDate",
      key: "cmmtDate",
    },
    {
      title: "출근시간",
      dataIndex: "cmmtTime",
      key: "cmmtTime",
    },
    {
      title: "퇴근시간",
      dataIndex: "fnshTime",
      key: "fnshTime",
    },
  ];

  const filterOptions = [
    {
      label: "사번",
      value: "empId",
    },
    {
      label: "사원명",
      value: "empName",
    },
  ];
  return (
    <>
      {body.commuteList && (
        <>
          <h4> 출퇴근 기록</h4>
          {/* <CommuteSelectBox /> */}
          {parseInt(employee.pstnId) >= 106 && (
            <>
              <Table
                columns={columns}
                dataSource={body.commuteList}
                rowKey={(commuteList) => commuteList.cmmtId}
                filter
                filterOptions={filterOptions}
              />
            </>
          )}
          {parseInt(employee.pstnId) < 106 && (
            <>
              <Table
                columns={columns}
                dataSource={body.commuteList}
                rowKey={(commuteList) => commuteList.cmmtId}
                filterOptions={filterOptions}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
