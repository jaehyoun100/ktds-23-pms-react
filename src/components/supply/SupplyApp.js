import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyList } from "../../http/supplyHttp";
import SupplyView from "./components/SupplyView";
import Table from "../../utils/Table";
import style from "./supply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Checkbox } from "antd";
import SupplyRegistModal from "./components/modal/SupplyRegistModal";
import SupplyRequestModal from "./components/modal/SupplyRequestModal";

export default function SupplyApp() {
  const [selectedSplId, setSelectedSplId] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideZeroInventory, setHideZeroInventory] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isRegistModalVisible, setIsRegistModalVisible] = useState(false);
  const [isGetModalVisible, setIsGetModalVisible] = useState(false);

  const { token } = useSelector((state) => state.tokenInfo);
  const isSelect = selectedSplId !== undefined;
  const navigate = useNavigate();

  const memoizedLoadSupplyList = useCallback(loadSupplyList, []);
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
      const json = await memoizedLoadSupplyList({ ...memoizedToken });
      setData(json.body);
      setIsLoading(false);
    };
    fetchingData();
    loadUserInfo();
  }, [memoizedLoadSupplyList, loadUserInfo, memoizedToken]);

  // userInfo와 departmentVO가 존재하는지 확인
  const deptId =
    userInfo && userInfo.departmentVO ? userInfo.departmentVO.deptId : null;

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
    <div className={style.supplyAppContainer}>
      <div
        className={`${style.tableComponent} ${isSelect ? style.collapsed : ""}`}
      >
        {token && (
          <>
            <Checkbox
              checked={hideZeroInventory}
              onChange={handleCheckboxChange}
            >
              재고 없는 비품 감추기
            </Checkbox>
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
        <div className={style.buttonContainer}>
          {deptId === "DEPT_230101_000010" && (
            <Button onClick={handleOpenRegistModal}>소모품 등록</Button>
          )}
          <Button onClick={handleOpenGetModal}>소모품 신청</Button>
          <Button onClick={() => navigate("log")}>신청 기록</Button>
        </div>
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
      <SupplyRegistModal
        visible={isRegistModalVisible}
        onClose={handleCloseRegistModal}
        onRegister={handleRegisterSuccess}
      />
      <SupplyRequestModal
        visible={isGetModalVisible}
        onClose={handleCloseGetModal}
        onApply={handleApplySuccess}
      />
    </div>
  );
}
