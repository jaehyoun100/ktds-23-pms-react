import { useCallback, useEffect, useMemo, useState } from "react";
import { loadDepartmentDetail } from "../../../http/deptteamHttp";
import s from "./detail.module.css";

export default function DepartmentDetail({ selectedDeptId, token }) {
  const [data, setData] = useState();

  const memoizedloadDepartmentDetail = useCallback(loadDepartmentDetail, []);
  const memoizedParam = useMemo(() => {
    return { selectedDeptId, token };
  }, [selectedDeptId, token]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await memoizedloadDepartmentDetail(memoizedParam);
      setData(json.body);
    };

    fetchData();
  }, [memoizedloadDepartmentDetail, memoizedParam, setData]);

  console.log(data);
  return (
    <>
      {data && (
        <div className={s.detail}>
          <div>
            <h4>부서 상세정보</h4>
            <div>부서 이름 : {data[0].deptName}</div>
            <div>부서 창립일 : {data[0].deptCrDt}</div>
            <div>부서장 : {data[0].empName}</div>
            <div>EMAIL : {data[0].email}</div>
          </div>
          <div>
            <img
              className={s.detailpickture}
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTZfOTAg/MDAxNTg5NjI0MzUyMTUz.NCF3F8V7KPwBdAruYevbqilI9RnJddO-Ci0yO-qGHlkg.xhQ5_kZrmdfFd_JHqJKQs07TMY7aobd1uUDNHRORh1Ug.PNG.fgus00/%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%9E%90%EA%B2%A9%EC%A6%9D%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8_(16).png?type=w800"
              alt="프로필이미지"
            />
            <div>
              <button>부서 정보 수정</button>
              <button>부서 삭제</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
