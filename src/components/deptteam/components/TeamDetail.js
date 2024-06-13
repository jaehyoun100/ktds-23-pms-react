import { useCallback, useEffect, useMemo, useState } from "react";
import { loadTeamDetail } from "../../../http/deptteamHttp";
import s from "./detail.module.css";
import TeamUpdate from "./TeamUpdate";

export default function TeamDetail({
  selectTmId,
  token,
  openModal,
  setIsModalOpen,
  setModalContent,
}) {
  const [data, setData] = useState();

  const memoizedloadTeamDetail = useCallback(loadTeamDetail, []);
  const memoizedParam = useMemo(() => {
    return { selectTmId, token };
  }, [selectTmId, token]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await memoizedloadTeamDetail(memoizedParam);
      setData(json.body);
    };

    fetchData();
  }, [memoizedloadTeamDetail, memoizedParam, setData]);

  const teamDetailHandler = () => {
    openModal(
      <TeamUpdate
        token={token}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
        data={data}
      />
    );
  };
  return (
    <>
      {data && (
        <div className={s.detail}>
          <div>
            <h4>팀 상세정보</h4>
            <div>팀 이름 : {data.tmName}</div>
            <div>팀 창립일 : {data.tmCrDt}</div>
            <div>팀장 : {data.empName}</div>
            <div>EMAIL : {data.email}</div>
          </div>
          <div className={s.rightSection}>
            <img
              className={s.detailpickture}
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTZfOTAg/MDAxNTg5NjI0MzUyMTUz.NCF3F8V7KPwBdAruYevbqilI9RnJddO-Ci0yO-qGHlkg.xhQ5_kZrmdfFd_JHqJKQs07TMY7aobd1uUDNHRORh1Ug.PNG.fgus00/%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%9E%90%EA%B2%A9%EC%A6%9D%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8_(16).png?type=w800"
              alt="프로필이미지"
            />
            <div>
              <button type="button" onClick={teamDetailHandler}>
                팀 정보 수정
              </button>
              <button>팀 삭제</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
