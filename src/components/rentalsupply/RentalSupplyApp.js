import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRentalSupplyList } from "../../http/rentalSupplyHttp";
import Table from "../../utils/Table";
import style from "./rentalSupply.module.css";
import RentalSupplyView from "./components/RentalSupplyView";
import RentalSupplyRegist from "./components/RentalSupplyRegist";

export default function RentalSupplyApp() {
  const [selectedRsplId, setSelectedRsplId] = useState();
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [isRentalSupplyModificationMode, setIsRentalSupplyModificationMode] =
    useState(false);
  const [isRentalSupplyLogViewMode, setIsRentalSupplyLogViewMode] =
    useState(false);
  const [needReload, setNeedReload] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isSelect = selectedRsplId !== undefined;

  const memoizedLoadRentalSupplyList = useCallback(loadRentalSupplyList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyList({ ...memoizedToken });
      setData(json.body);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyList, memoizedToken]);

  const columns = [
    {
      title: "카테고리",
      dataIndex: "rsplCtgr",
      key: "rsplCtgr",
      // width: "20%"
    },
    {
      title: "제품 명",
      dataIndex: "rsplName",
      key: "rsplName",
    },
    {
      title: "재고",
      dataIndex: "invQty",
      key: "invQty",
    },
  ];

  const simplifiedColumns = [
    {
      title: "제품 명",
      dataIndex: "rsplName",
      key: "rsplName",
    },
  ];

  const filterOptions = [
    {
      label: "카테고리",
      value: "rsplCtgr",
    },
    {
      label: "제품 명",
      value: "rsplName",
    },
  ];

  const simplifiedFilterOptions = [
    {
      label: "제품 명",
      value: "rsplName",
    },
  ];

  const onRowClickHandler = (rowId) => {
    setSelectedRsplId((prevId) => (prevId === rowId ? undefined : rowId));
  };

  const onRegistrationModeClickHandler = () => {
    setIsRegistrationMode(true);
  };

  const onRentalSupplyLogViewModeClickHandler = () => {
    setIsRentalSupplyLogViewMode(true);
  };

  return (
    <>
      <div className={style.rentalSupplyAppContainer}>
        <div className={style.tableComponent}>
          {token && !isRegistrationMode && !isRentalSupplyLogViewMode && (
            <Table
              columns={isSelect ? simplifiedColumns : columns}
              dataSource={data}
              rowKey={(dt) => dt.rsplId}
              filter
              filterOptions={isSelect ? simplifiedFilterOptions : filterOptions}
              onRow={(record) => {
                return {
                  onClick: () => {
                    onRowClickHandler(record.rsplId);
                  },
                  style: { cursor: "pointer" },
                };
              }}
            />
          )}
          {!isRegistrationMode && !isRentalSupplyLogViewMode && (
            <>
              <button onClick={onRegistrationModeClickHandler}>
                대여품 등록
              </button>
              <button onClick={onRentalSupplyLogViewModeClickHandler}>
                신청 기록
              </button>
            </>
          )}
        </div>
        {isSelect && !isRegistrationMode && !isRentalSupplyLogViewMode && (
          <div className={style.rentalSupplyViewComponent}>
            <RentalSupplyView
              selectedRsplId={selectedRsplId}
              setSelectedRsplId={setSelectedRsplId}
              isRentalSupplyModificationMode={isRentalSupplyModificationMode}
              setIsRentalSupplyModificationMode={
                setIsRentalSupplyModificationMode
              }
              needReload={needReload}
              setNeedReload={setNeedReload}
              token={token}
            />
          </div>
        )}
      </div>
      {isRegistrationMode && !isRentalSupplyLogViewMode && (
        <RentalSupplyRegist
          setIsRegistrationMode={setIsRegistrationMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
      {/* {!isRegistrationMode && isRentalSupplyLogViewMode && (
        <SupplyLogView
          setIsSupplyLogViewMode={setIsSupplyLogViewMode}
          needReload={needReload}
          token={token}
        />
      )} */}
    </>
  );
}
