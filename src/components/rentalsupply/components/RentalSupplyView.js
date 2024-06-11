import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteRentalSupply,
  loadRentalSupply,
} from "../../../http/rentalSupplyHttp";
import RentalSupplyModification from "./RentalSupplyModification";

export default function RentalSupplyView({
  selectedRsplId,
  setSelectedRsplId,
  isRentalSupplyModificationMode,
  setIsRentalSupplyModificationMode,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const memoizedLoadRentalSupply = useCallback(loadRentalSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedRsplId, token, needReload };
  }, [selectedRsplId, token, needReload]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const json = await memoizedLoadRentalSupply(memoizedParam);
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [memoizedLoadRentalSupply, memoizedParam, setData]);

  const { body: rentalSupplyBody } = data || {};

  const onRentalSupplyModificationModeClickHandler = () => {
    setIsRentalSupplyModificationMode(true);
  };

  const onDeleteClickHandler = async () => {
    const json = await deleteRentalSupply(rentalSupplyBody.rsplId, token);

    if (json.body) {
      setSelectedRsplId(undefined);
      setNeedReload(Math.random());
    } else {
      console.log(json);
      alert(json.errors);
    }
  };

  return (
    <div>
      {rentalSupplyBody && !isRentalSupplyModificationMode && (
        <>
          <div>
            <h3>{rentalSupplyBody.rsplName}</h3>
            <div>{rentalSupplyBody.rsplCtgr}</div>
            <div>{rentalSupplyBody.rsplPrice}</div>
            <div>{rentalSupplyBody.invQty}</div>
            <div>이미지 보여줄 div</div>
            <div>{rentalSupplyBody.rsplDtl}</div>
          </div>
          <button onClick={onRentalSupplyModificationModeClickHandler}>
            수정
          </button>
          <button onClick={onDeleteClickHandler}>삭제</button>
        </>
      )}
      {isRentalSupplyModificationMode && (
        <RentalSupplyModification
          setIsSupplyModificationMode={setIsRentalSupplyModificationMode}
          token={token}
          supplyBody={rentalSupplyBody}
          setNeedReload={setNeedReload}
        />
      )}
    </div>
  );
}
