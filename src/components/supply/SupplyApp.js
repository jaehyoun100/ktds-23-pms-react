import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyList } from "../../http/supplyHttp";
import SupplyView from "./components/SupplyView";
import SupplyRegist from "./components/SupplyRegist";
import Table from "../../utils/Table";
import style from "./supply.module.css";
import SupplyLogView from "./components/SupplyLogView";

export default function SupplyApp() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
  const [isSupplyModificationMode, setIsSupplyModificationMode] =
    useState(false);
  const [isSupplyLogViewMode, setIsSupplyLogViewMode] = useState(false);
  const [needReload, setNeedReload] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isSelect = selectedSplId !== undefined;

  const memoizedLoadSupplyList = useCallback(loadSupplyList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadSupplyList({ ...memoizedToken });
      setData(json.body);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadSupplyList, memoizedToken]);

  const columns = [
    {
      title: "카테고리",
      dataIndex: "splCtgr",
      key: "splCtgr",
      // width: "20%"
    },
    {
      title: "제품 명",
      dataIndex: "splName",
      key: "splName",
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
      dataIndex: "splName",
      key: "splName",
    },
  ];

  const filterOptions = [
    {
      label: "카테고리",
      value: "splCtgr",
    },
    {
      label: "제품 명",
      value: "splName",
    },
  ];

  const simplifiedFilterOptions = [
    {
      label: "제품 명",
      value: "splName",
    },
  ];

  const onRowClickHandler = (rowId) => {
    setSelectedSplId((prevId) => (prevId === rowId ? undefined : rowId));
  };

  const onRegistrationModeClickHandler = () => {
    setIsRegistrationMode(true);
  };

  const onSupplyLogViewModeClickHandler = () => {
    setIsSupplyLogViewMode(true);
  };

  return (
    <>
      <div className={style.supplyAppContainer}>
        <div className={style.tableComponent}>
          {token && !isRegistrationMode && !isSupplyLogViewMode && (
            <Table
              columns={isSelect ? simplifiedColumns : columns}
              dataSource={data}
              rowKey={(dt) => dt.splId}
              filter
              filterOptions={isSelect ? simplifiedFilterOptions : filterOptions}
              onRow={(record) => {
                return {
                  onClick: () => {
                    onRowClickHandler(record.splId);
                  },
                  style: { cursor: "pointer" },
                };
              }}
            />
          )}
          {!isRegistrationMode && !isSupplyLogViewMode && (
            <>
              <button onClick={onRegistrationModeClickHandler}>
                소모품 등록
              </button>
              <button onClick={onSupplyLogViewModeClickHandler}>
                신청 기록
              </button>
            </>
          )}
        </div>
        {isSelect && !isRegistrationMode && !isSupplyLogViewMode && (
          <div className={style.supplyViewComponent}>
            <SupplyView
              selectedSplId={selectedSplId}
              setSelectedSplId={setSelectedSplId}
              isSupplyModificationMode={isSupplyModificationMode}
              setIsSupplyModificationMode={setIsSupplyModificationMode}
              needReload={needReload}
              setNeedReload={setNeedReload}
              token={token}
            />
          </div>
        )}
      </div>
      {isRegistrationMode && !isSupplyLogViewMode && (
        <SupplyRegist
          setIsRegistrationMode={setIsRegistrationMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
      {!isRegistrationMode && isSupplyLogViewMode && (
        <SupplyLogView
          setIsSupplyLogViewMode={setIsSupplyLogViewMode}
          needReload={needReload}
          token={token}
        />
      )}
    </>
  );
}
