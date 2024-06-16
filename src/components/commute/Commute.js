import { useEffect } from "react";
import Table from "../../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCommuteLog } from "../../http/commuteHttp";

export default function CommuteApp() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenInfo);
  const { body } = useSelector((state) => state.commuteInfo);

  useEffect(() => {
    dispatch(getCommuteLog(token));
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
          <Table
            columns={columns}
            dataSource={body.commuteList}
            rowKey={(commuteList) => commuteList.cmmtId}
            filter
            filterOptions={filterOptions}
          />
        </>
      )}
    </>
  );
}
