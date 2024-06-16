import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyList } from "../../http/supplyHttp";
import SupplyView from "./components/SupplyView";
import Table from "../../utils/Table";
import style from "./supply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SupplyApp() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideZeroInventory, setHideZeroInventory] = useState(false);

  const { token } = useSelector((state) => state.tokenInfo);
  const isSelect = selectedSplId !== undefined;
  const navigate = useNavigate();

  const memoizedLoadSupplyList = useCallback(loadSupplyList, []);
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

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
      width: "20%",
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
      width: "10%",
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
    navigate("regist");
  };

  const onSupplyLogViewModeClickHandler = () => {
    navigate("log");
  };

  const onApplyModeClickHandler = () => {
    navigate("get");
  };

  const handleCheckboxChange = (e) => {
    setHideZeroInventory(e.target.checked);
  };

  const filteredData = hideZeroInventory
    ? data.filter((item) => item.invQty > 0)
    : data;

  return (
    <div className={style.supplyAppContainer}>
      <div
        className={`${style.tableComponent} ${isSelect ? style.collapsed : ""}`}
      >
        {token && (
          <>
            <label>
              <input
                type="checkbox"
                checked={hideZeroInventory}
                onChange={handleCheckboxChange}
              />
              재고 없는 비품 감추기
            </label>
            <Table
              columns={isSelect ? simplifiedColumns : columns}
              dataSource={filteredData}
              rowKey={(dt) => dt.splId}
              filter
              filterOptions={isSelect ? simplifiedFilterOptions : filterOptions}
              onRow={(record) => {
                return {
                  onClick: () => {
                    onRowClickHandler(record.splId);
                  },
                  className: style.pointerCursor,
                };
              }}
            />
          </>
        )}
        <button onClick={onRegistrationModeClickHandler}>소모품 등록</button>
        <button onClick={onApplyModeClickHandler}>소모품 신청</button>
        <button onClick={onSupplyLogViewModeClickHandler}>신청 기록</button>
      </div>
      {isSelect && (
        <div
          className={`${style.supplyViewComponent} ${
            isSelect ? "" : style.hidden
          }`}
        >
          <SupplyView selectedSplId={selectedSplId} />
        </div>
      )}
    </div>
  );
}
