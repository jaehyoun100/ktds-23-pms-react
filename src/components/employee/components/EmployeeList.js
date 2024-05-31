import { useCallback, useState } from "react";
import { loadEmployeeList } from "../../../http/employeeHttp";

export default function EmployeeList({ token }) {
  // 사원 리스트 노출을 위한 state
  const [employeeList, setEmployeeList] = useState([]);

  // 리스트 불러오기
  const fetchEmployeeList = useCallback(loadEmployeeList, []);

  // const { body: employeeVO } = data || {};

  return;
}
