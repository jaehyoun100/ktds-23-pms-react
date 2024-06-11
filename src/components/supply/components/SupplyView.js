import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteSupply,
  loadSupply,
  loadSupplyImage,
} from "../../../http/supplyHttp";
import SupplyModification from "./SupplyModification";

export default function SupplyView({
  selectedSplId,
  setSelectedSplId,
  isSupplyModificationMode,
  setIsSupplyModificationMode,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedLoadSupply = useCallback(loadSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token, needReload };
  }, [selectedSplId, token, needReload]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
    setIsSupplyModificationMode(true);
  };

  const onDeleteClickHandler = async () => {
    const json = await deleteSupply(supplyBody.splId, token);

    if (json.body) {
      setSelectedSplId(undefined);
      setNeedReload(Math.random());
    } else {
      console.log(json);
      alert(json.errors);
    }
  };

  return (
    <div>
      {supplyBody && !isSupplyModificationMode && (
        <>
          <div>
            <h3>{supplyBody.splName}</h3>
            <div>{supplyBody.splCtgr}</div>
            <div>{supplyBody.splPrice}</div>
            <div>{supplyBody.invQty}</div>
            <div>
              {image ? (
                <img src={image} alt={supplyBody.splName} />
              ) : (
                "이미지 불러오는 중..."
              )}
            </div>
            <div>{supplyBody.splDtl}</div>
          </div>
          <button onClick={onSupplyModificationModeClickHandler}>수정</button>
          <button onClick={onDeleteClickHandler}>삭제</button>
        </>
      )}
      {isSupplyModificationMode && (
        <SupplyModification
          setIsSupplyModificationMode={setIsSupplyModificationMode}
          token={token}
          supplyBody={supplyBody}
          setNeedReload={setNeedReload}
        />
      )}
    </div>
  );
}
