import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRentalSupplyList } from "../../http/rentalSupplyHttp";
import RentalSupplyView from "./components/RentalSupplyView";
import Table from "../../utils/Table";
import style from "./rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RentalSupplyApp() {
  const [selectedRsplId, setSelectedRsplId] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideZeroInventory, setHideZeroInventory] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { token } = useSelector((state) => state.tokenInfo);
  const isSelect = selectedRsplId !== undefined;
  const navigate = useNavigate();

  const memoizedLoadRentalSupplyList = useCallback(loadRentalSupplyList, []);
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  const loadUserInfo = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/", {
        headers: {
          Authorization: token,
        },
      });
      setUserInfo(res.data.body);
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyList({ ...memoizedToken });
      setData(json.body);
      setIsLoading(false);
    };

    fetchingData();
    loadUserInfo();
  }, [memoizedLoadRentalSupplyList, loadUserInfo, memoizedToken]);

  const deptId =
    userInfo && userInfo.departmentVO ? userInfo.departmentVO.deptId : null;

  const columns = [
    {
      title: "카테고리",
      dataIndex: "rsplCtgr",
      key: "rsplCtgr",
      width: "20%",
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
      width: "10%",
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
    navigate("regist");
  };

  const onRentalSupplyLogViewModeClickHandler = () => {
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
    <div className={style.rentalSupplyAppContainer}>
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
              재고 없는 대여품 감추기
            </label>
            <Table
              columns={isSelect ? simplifiedColumns : columns}
              dataSource={filteredData}
              rowKey={(dt) => dt.rsplId}
              filter
              filterOptions={isSelect ? simplifiedFilterOptions : filterOptions}
              onRow={(record) => {
                return {
                  onClick: () => {
                    onRowClickHandler(record.rsplId);
                  },
                  className: style.pointerCursor,
                };
              }}
            />
          </>
        )}
        <div className={style.buttonContainer}>
          {deptId === "DEPT_230101_000010" && (
            <button onClick={onRegistrationModeClickHandler}>
              대여품 등록
            </button>
          )}
          <button onClick={onApplyModeClickHandler}>대여품 신청</button>
          <button onClick={onRentalSupplyLogViewModeClickHandler}>
            신청 기록
          </button>
        </div>
      </div>
      {isSelect && (
        <div
          className={`${style.rentalSupplyViewComponent} ${
            isSelect ? "" : style.hidden
          }`}
        >
          <RentalSupplyView selectedRsplId={selectedRsplId} />
        </div>
      )}
    </div>
  );
}
