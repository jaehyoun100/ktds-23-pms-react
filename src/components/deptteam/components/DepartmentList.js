import { useCallback, useEffect, useMemo, useState } from "react";
import { loadDepartmentList } from "../../../http/deptteamHttp.js";
import TeamList from "./TeamList.js";
import Table from "../../../utils/Table.js";
import s from "./departmentList.module.css";
import DepartmentCreate from "./DepartmentCreate.js";
import TeamCreate from "./TeamCreate.js";
import TeamMemberCreate from "./TeamMemberCreate.js";
import DepartmentDetail from "./DepartmentDetail.js";
import TeamDetail from "./TeamDetail.js";
import Modal from "./DeptTeamModal.js"; // 모달 컴포넌트를 import 합니다.

export default function DepartmentList({ token }) {
  const [isDeptRegistrationMode, setIsDeptRegistrationMode] = useState(false);
  const [isTeamRegistrationMode, setIsTeamRegistrationMode] = useState(false);
  const [isTeamMemberRegistrationMode, setIsTeamMemberRegistrationMode] =
    useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState();
  const [selectTmId, setSelectTmId] = useState();
  const [data, setData] = useState();
  const [needReload, setNeedReload] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // departmentList;
  const memoizedLoaddepartmentList = useCallback(loadDepartmentList, []);
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoaddepartmentList({ ...memoizedToken });
      setData(json.body);
    };

    fetchingData();
  }, [memoizedLoaddepartmentList, memoizedToken]);

  const onDepartmentClick = (rowId) => {
    setSelectedDeptId((prevId) => (prevId === rowId ? undefined : rowId));
    setSelectTmId(false);
  };

  // 컬럼에 데이터 넣기
  const columns = [
    {
      title: "부서명",
      dataIndex: "deptName",
      key: "deptName",
      // width: "50%",
    },
    {
      title: "부서장명",
      dataIndex: "empName",
      key: "empName",
      // width: "50%",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      // width: "50%",
    },
  ];

  // 검색 필터
  const filterOptions = [
    { label: "부서명", value: "deptName" },
    { label: "부서ID", value: "deptId" },
    { label: "부서장명", value: "empName" },
  ];

  // modal 열고 닫는 메소드들
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onRegistrationDeptClickHandler = () => {
    openModal(
      <DepartmentCreate
        setIsDeptRegistrationMode={setIsDeptRegistrationMode}
        setNeedReload={setNeedReload}
        token={token}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
    );
  };
  const onRegistrationTmClickHandler = () => {
    openModal(
      <TeamCreate
        setIsTeamRegistrationMode={setIsTeamRegistrationMode}
        setNeedReload={setNeedReload}
        token={token}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
    );
  };
  const onRegistrationTmMemberClickHandler = () => {
    openModal(
      <TeamMemberCreate
        setIsTeamMemberRegistrationMode={setIsTeamMemberRegistrationMode}
        setNeedReload={setNeedReload}
        token={token}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
    );
  };

  return (
    <>
      {!isTeamMemberRegistrationMode &&
        !isTeamRegistrationMode &&
        !isDeptRegistrationMode &&
        data && <div>총 {data.length}개의 부서가 검색되었습니다.</div>}
      <div className={s.contentLayout}>
        {!isTeamMemberRegistrationMode &&
          !isTeamRegistrationMode &&
          !isDeptRegistrationMode &&
          data && (
            <>
              <div className={s.layout}>
                <Table
                  columns={columns}
                  dataSource={data}
                  rowKey={(dt) => dt.deptId}
                  filter
                  filterOptions={filterOptions}
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        onDepartmentClick(record.deptId);
                      },
                      style: { cursor: "pointer" },
                    };
                  }}
                />
              </div>
            </>
          )}
        {selectedDeptId &&
          !isTeamMemberRegistrationMode &&
          !isDeptRegistrationMode &&
          !isTeamRegistrationMode && (
            <div className={s.layout}>
              <TeamList
                selectedDeptId={selectedDeptId}
                setSelectedDeptId={setSelectedDeptId}
                selectTmId={selectTmId}
                setSelectTmId={setSelectTmId}
                token={token}
              />
            </div>
          )}
        <div>
          {isDeptRegistrationMode && (
            <DepartmentCreate
              setIsDeptRegistrationMode={setIsDeptRegistrationMode}
              setNeedReload={setNeedReload}
              token={token}
            />
          )}
          {isTeamRegistrationMode && (
            <TeamCreate
              setIsTeamRegistrationMode={setIsTeamRegistrationMode}
              setNeedReload={setNeedReload}
              token={token}
            />
          )}
          {isTeamMemberRegistrationMode && (
            <TeamMemberCreate
              setIsTeamMemberRegistrationMode={setIsTeamMemberRegistrationMode}
              setNeedReload={setNeedReload}
              token={token}
            />
          )}
        </div>
      </div>

      <div className={s.buttonanddetail}>
        <div className={s.detail}>
          {!isTeamMemberRegistrationMode &&
            !isDeptRegistrationMode &&
            !isTeamRegistrationMode &&
            selectedDeptId && (
              <div className={s.detail1}>
                <DepartmentDetail
                  selectedDeptId={selectedDeptId}
                  token={token}
                  setIsModalOpen={setIsModalOpen}
                  setModalContent={setModalContent}
                  openModal={openModal}
                />
              </div>
            )}
          {!isTeamMemberRegistrationMode &&
            !isDeptRegistrationMode &&
            !isTeamRegistrationMode &&
            selectTmId && (
              <div className={s.detail2}>
                <TeamDetail
                  selectTmId={selectTmId}
                  token={token}
                  setIsModalOpen={setIsModalOpen}
                  setModalContent={setModalContent}
                  openModal={openModal}
                />
              </div>
            )}
        </div>
        {!isTeamMemberRegistrationMode &&
          !isDeptRegistrationMode &&
          !isTeamRegistrationMode && (
            <div className={s.buttonlist}>
              <button>인사 발령 기록</button>
              <button onClick={onRegistrationDeptClickHandler}>
                부서 등록
              </button>
              {selectedDeptId && (
                <button onClick={onRegistrationTmClickHandler}>팀 등록</button>
              )}
              {selectTmId && (
                <button onClick={onRegistrationTmMemberClickHandler}>
                  팀원 등록
                </button>
              )}
            </div>
          )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
