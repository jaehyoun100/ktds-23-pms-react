import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyList } from "../../http/supplyHttp";
import SupplyView from "./SupplyView";
import SupplyRegist from "./SupplyRegist";
import Table from "../../utils/Table";

let pageNo = 0;

export default function SupplyApp() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);
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

  // const { count, pages, next } = data || {};
  // const { body: supplies } = data || {};

  const onRowClickHandler = (rowId) => {
    setSelectedSplId((prevId) => (prevId === rowId ? undefined : rowId));
  };

  const onRegistrationModeClickHandler = () => {
    setIsRegistrationMode(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 1 }}>
        {token && !isRegistrationMode && (
          <>
            <Table
              columns={isSelect ? simplifiedColumns : columns}
              dataSource={data}
              rowKey={(dt) => dt.splId}
              filter
              filterOptions={filterOptions}
              onRow={(record) => {
                return {
                  onClick: () => {
                    onRowClickHandler(record.splId);
                  },
                  style: { cursor: "pointer" },
                };
              }}
            />
          </>
        )}
        {!isSelect && !isRegistrationMode && (
          <button onClick={onRegistrationModeClickHandler}>소모품 등록</button>
        )}
      </div>
      {isSelect && !isRegistrationMode && (
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <SupplyView
            selectedSplId={selectedSplId}
            setSelectedSplId={setSelectedSplId}
            needReload={needReload}
            setNeedReload={setNeedReload}
            token={token}
          />
        </div>
      )}
      {isRegistrationMode && (
        <SupplyRegist
          setIsRegistrationMode={setIsRegistrationMode}
          setNeedReload={setNeedReload}
          token={token}
        />
      )}
    </div>
  );
  // <button>버튼 2</button>
}
