import { useCallback, useEffect, useMemo, useState } from "react";
import {
  // deleteSupply,
  loadSupply,
  loadSupplyImage,
} from "../../../http/supplyHttp";
import style from "../supply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SupplyView({ selectedSplId }) {
  const [data, setData] = useState();
  const [image, setImage] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadSupply = useCallback(loadSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token };
  }, [selectedSplId, token]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setImage(null);
      const json = await memoizedLoadSupply(memoizedParam);
      setData(json);

      if (json.body && json.body.splImg) {
        const imageData = await loadSupplyImage({
          splImg: json.body.splImg,
          token,
        });
        setImage(imageData);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [memoizedLoadSupply, memoizedParam, setData, token]);

  const { body: supplyBody } = data || {};

  const onSupplyModificationModeClickHandler = () => {
    navigate(`modify/${selectedSplId}`);
  };

  // const onDeleteClickHandler = async () => {
  //   const json = await deleteSupply(supplyBody.splId, token);

  //   if (json.body) {
  //     setSelectedSplId(undefined);
  //     setNeedReload(Math.random());
  //   } else {
  //     console.log(json);
  //     alert(json.errors);
  //   }
  // };

  const toggleImageSize = () => {
    setIsImageEnlarged((prev) => !prev);
  };

  return (
    <div className={style.supplyViewContainer}>
      {supplyBody && (
        <>
          <div className={style.supplyViewHeader}>
            <h3>{supplyBody.splName}</h3>
          </div>
          <div className={style.supplyDetails}>
            <div className={style.detailItem}>
              <label>카테고리</label>
              <span>{supplyBody.splCtgr}</span>
            </div>
            <div className={style.detailItem}>
              <label>가격</label>
              <span>{supplyBody.splPrice}</span>
            </div>
            <div className={style.detailItem}>
              <label>재고</label>
              <span>{supplyBody.invQty}</span>
            </div>
          </div>
          <div
            className={`${style.supplyImageContainer} ${
              isImageEnlarged ? style.enlargedImage : ""
            }`}
            onClick={toggleImageSize}
          >
            {image ? (
              <img src={image} alt={supplyBody.splName} />
            ) : (
              <div className={style.loadingText}>이미지 없음</div>
            )}
          </div>
          <div className={style.detailItem}>
            <span>{supplyBody.splDtl}</span>
          </div>
          <div>
            <button onClick={onSupplyModificationModeClickHandler}>수정</button>
            {/* <button onClick={onDeleteClickHandler}>삭제</button> */}
          </div>
        </>
      )}
    </div>
  );
}
