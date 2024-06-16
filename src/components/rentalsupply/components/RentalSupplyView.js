import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadRentalSupply,
  loadRentalSupplyImage,
} from "../../../http/rentalSupplyHttp";
import style from "../rentalSupply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RentalSupplyView({ selectedRsplId }) {
  const [data, setData] = useState();
  const [image, setImage] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadRentalSupply = useCallback(loadRentalSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedRsplId, token };
  }, [selectedRsplId, token]);

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
  }, [memoizedLoadRentalSupply, memoizedParam, setData, token]);

  const { body: rentalSupplyBody } = data || {};

  const onRentalSupplyModificationModeClickHandler = () => {
    navigate(`modify/${selectedRsplId}`);
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
          <div>
            <button onClick={onRentalSupplyModificationModeClickHandler}>
              수정
            </button>
          </div>
        </>
      )}
    </div>
  );
}
