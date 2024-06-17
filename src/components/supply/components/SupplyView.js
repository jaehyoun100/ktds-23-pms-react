import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupply, loadSupplyImage } from "../../../http/supplyHttp";
import style from "../supply.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SupplyView({ selectedSplId }) {
  const [data, setData] = useState();
  const [image, setImage] = useState(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const { token } = useSelector((state) => state.tokenInfo);
  const navigate = useNavigate();

  const memoizedLoadSupply = useCallback(loadSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token };
  }, [selectedSplId, token]);

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
    loadUserInfo();
  }, [memoizedLoadSupply, loadUserInfo, memoizedParam, setData, token]);

  const deptId =
    userInfo && userInfo.departmentVO ? userInfo.departmentVO.deptId : null;

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
          {deptId === "DEPT_230101_000010" && (
            <div className={style.supplyViewButtonContainer}>
              <button onClick={onSupplyModificationModeClickHandler}>
                수정
              </button>
              {/* <button onClick={onDeleteClickHandler}>삭제</button> */}
            </div>
          )}
        </>
      )}
    </div>
  );
}
