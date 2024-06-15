import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteDepartment,
  loadDepartmentDetail,
} from "../../../http/deptteamHttp";
import s from "./detail.module.css";
import DepartmentUpdate from "./DepartmentUpdate";
import ConfirmModal from "../../common/modal/ConfirmModal";

export default function DepartmentDetail({
  selectedDeptId,
  token,
  openModal,
  setIsModalOpen,
  setModalContent,
}) {
  const [data, setData] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const deptDetailHandler = () => {
    console.log(data[0]);
    openModal(
      <DepartmentUpdate
        token={token}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
        data={data[0]}
      />
    );
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const handleConfirm = async () => {
    // 여기 안에 삭제 로직
    const json = await deleteDepartment(token, selectedDeptId);
    if (json.body) {
      // 삭제 성공
      // 목록 컴포넌트를 노출.
      setShowConfirmModal(false);
    } else {
      // 삭제 실패
      // 실패한 사유를 알려줘야한다.
      console.log(json);
      alert(json.errors);
      setShowConfirmModal(false);
    }
  };

  const deptDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  return (
    <>
      {data && (
        <div className={s.detail}>
          <div className={s.detailinfo}>
            <h4>부서 상세정보</h4>
            <div>부서 이름 : {data[0].deptName}</div>
            <div>부서 창립일 : {data[0].deptCrDt}</div>
            <div>부서장 : {data[0].empName}</div>
            <div>EMAIL : {data[0].email}</div>
          </div>
          <div className={s.rightSection}>
            <img
              className={s.detailpickture}
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTZfOTAg/MDAxNTg5NjI0MzUyMTUz.NCF3F8V7KPwBdAruYevbqilI9RnJddO-Ci0yO-qGHlkg.xhQ5_kZrmdfFd_JHqJKQs07TMY7aobd1uUDNHRORh1Ug.PNG.fgus00/%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%82%AC_%EC%9E%90%EA%B2%A9%EC%A6%9D%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8%EC%9D%98_%EC%82%AC%EB%B3%B8_(16).png?type=w800"
              alt="프로필이미지"
            />
            <div>
              <button type="button" onClick={deptDetailHandler}>
                부서 정보 수정 신청
              </button>
              <button type="button" onClick={deptDeleteHandler}>
                부서 삭제 신청
              </button>
            </div>
          </div>
          <ConfirmModal
            show={showConfirmModal}
            onClose={handleCloseConfirmModal}
            content="정말 삭제 신청을 하시겠습니까?"
            cancelContent="아니오"
            confirmContent="예"
            onCloseHandler={handleCloseConfirmModal}
            confirmOnClick={handleConfirm}
            cancelOnclick={handleCloseConfirmModal}
          />
        </div>
      )}
    </>
  );
}
