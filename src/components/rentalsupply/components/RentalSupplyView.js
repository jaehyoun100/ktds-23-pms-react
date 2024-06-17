import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadRentalSupply,
  loadRentalSupplyImage,
} from "../../../http/rentalSupplyHttp";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { Button } from "antd";
import RentalSupplyModificationModal from "./modal/RentalSupplyModificationModal";
import axios from "axios";

export default function RentalSupplyView({ selectedRsplId }) {
  const [data, setData] = useState();
  const [image, setImage] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { token } = useSelector((state) => state.tokenInfo);

  const memoizedLoadRentalSupply = useCallback(loadRentalSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedRsplId, token };
  }, [selectedRsplId, token]);

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
    const fetchData = async () => {
      setIsLoading(true);
      setImage(null);
      const json = await memoizedLoadRentalSupply(memoizedParam);
      setData(json);

      if (json.body && json.body.rsplImg) {
        const imageData = await loadRentalSupplyImage({
          rsplImg: json.body.rsplImg,
          token,
        });
        setImage(imageData);
      }

      setIsLoading(false);
    };

    fetchData();
    loadUserInfo();
  }, [memoizedLoadRentalSupply, loadUserInfo, memoizedParam, setData, token]);

  const deptId =
    userInfo && userInfo.departmentVO ? userInfo.departmentVO.deptId : null;

  const { body: rentalSupplyBody } = data || {};

  const onRentalSupplyModificationModeClickHandler = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleModifySuccess = () => {
    setIsModalVisible(false);
    memoizedLoadRentalSupply(memoizedParam).then((json) => setData(json));
  };

  const toggleImageSize = () => {
    setIsImageEnlarged((prev) => !prev);
  };

  return (
    <div className={style.rentalSupplyViewContainer}>
      {rentalSupplyBody && (
        <>
          <div className={style.rentalSupplyViewHeader}>
            <h3>{rentalSupplyBody.rsplName}</h3>
          </div>
          <div className={style.rentalDetails}>
            <div className={style.detailItem}>
              <label>카테고리</label>
              <span>{rentalSupplyBody.rsplCtgr}</span>
            </div>
            <div className={style.detailItem}>
              <label>가격</label>
              <span>{rentalSupplyBody.rsplPrice}</span>
            </div>
            <div className={style.detailItem}>
              <label>재고</label>
              <span>{rentalSupplyBody.invQty}</span>
            </div>
          </div>
          <div
            className={`${style.rentalImageContainer} ${
              isImageEnlarged ? style.enlargedImage : ""
            }`}
            onClick={toggleImageSize}
          >
            {image ? (
              <img src={image} alt={rentalSupplyBody.rsplName} />
            ) : (
              <div className={style.loadingText}>이미지 없음</div>
            )}
          </div>
          <div className={style.detailItem}>
            <span>{rentalSupplyBody.rsplDtl}</span>
          </div>
          {deptId === "DEPT_230101_000010" && (
            <div className={style.rentalViewButtonContainer}>
              <Button
                type="primary"
                onClick={onRentalSupplyModificationModeClickHandler}
              >
                수정
              </Button>
            </div>
          )}
        </>
      )}
      <RentalSupplyModificationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        selectedRsplId={selectedRsplId}
        onModify={handleModifySuccess}
      />
    </div>
  );
}
