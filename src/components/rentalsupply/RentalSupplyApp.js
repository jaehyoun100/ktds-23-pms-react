import { useCallback, useEffect, useMemo, useState } from "react";
import { loadRentalSupplyList } from "../../http/rentalSupplyHttp";
import RentalSupplyView from "./components/RentalSupplyView";
import Table from "../../utils/Table";
import style from "./rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox } from "antd";
import RentalSupplyRegistModal from "./components/modal/RentalSupplyRegistModal";
import RentalSupplyRequestModal from "./components/modal/RentalSupplyRequestModal";

export default function RentalSupplyApp() {
  const [selectedRsplId, setSelectedRsplId] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideZeroInventory, setHideZeroInventory] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isRegistModalVisible, setIsRegistModalVisible] = useState(false);
  const [isGetModalVisible, setIsGetModalVisible] = useState(false);

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

  const handleCheckboxChange = (e) => {
    setHideZeroInventory(e.target.checked);
  };

  const filteredData = hideZeroInventory
    ? data.filter((item) => item.invQty > 0)
    : data;

  const handleOpenRegistModal = () => {
    setIsRegistModalVisible(true);
  };

  const handleCloseRegistModal = () => {
    setIsRegistModalVisible(false);
  };

  const handleOpenGetModal = () => {
    setIsGetModalVisible(true);
  };

  const handleCloseGetModal = () => {
    setIsGetModalVisible(false);
  };

  const handleRegisterSuccess = () => {
    // Refresh data or perform necessary actions after registration
    handleCloseRegistModal();
  };

  const handleApplySuccess = () => {
    // Refresh data or perform necessary actions after applying
    handleCloseGetModal();
  };

  return (
    <div className={style.rentalSupplyAppContainer}>
      <div
        className={`${style.tableComponent} ${isSelect ? style.collapsed : ""}`}
      >
        {token && (
          <>
            <Checkbox
              checked={hideZeroInventory}
              onChange={handleCheckboxChange}
            >
              재고 없는 대여품 감추기
            </Checkbox>
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
            <Button onClick={handleOpenRegistModal}>대여품 등록</Button>
          )}
          <Button onClick={handleOpenGetModal}>대여품 신청</Button>
          <Button onClick={() => navigate("log")}>신청 기록</Button>
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
      <RentalSupplyRegistModal
        visible={isRegistModalVisible}
        onClose={handleCloseRegistModal}
        onRegister={handleRegisterSuccess}
      />
      <RentalSupplyRequestModal
        visible={isGetModalVisible}
        onClose={handleCloseGetModal}
        onApply={handleApplySuccess}
      />
    </div>
  );
}
