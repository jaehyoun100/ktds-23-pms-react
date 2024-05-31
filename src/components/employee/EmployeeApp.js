import { useCallback, useEffect, useState } from "react";

export default function EmployeeApp() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/employee")
      .then((response) => {
        // 응답이 성공적이지 않은 경우 오류 던지기
        if (!response.ok) {
          throw new Error("!!!");
        }
        // JSON 응답을 JavaScript 객체로 변환
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // 데이터 상태 업데이트 및 로딩 상태 해제
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        // 오류 상태 업데이트 및 로딩 상태 해제
        setError(error);
        setLoading(false);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  return (
    <table>
      <thead>
        <tr>
          <th>사원ID</th>
          <th>이름</th>
          <th>부서</th>
          <th>팀</th>
          <th>직무</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr key={employee.id}>
          <td>{employee.id}</td>
        </tr> */}
      </tbody>
    </table>
  );
}
