import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteSupply, loadSupply } from "../../../http/supplyHttp";

export default function SupplyView({
  selectedSplId,
  setSelectedSplId,
  needReload,
  setNeedReload,
  token,
}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const backToListHandler = () => {
    setSelectedSplId(undefined);
    setNeedReload(Math.random());
  };

  const memoizedLoadSupply = useCallback(loadSupply, []);
  const memoizedParam = useMemo(() => {
    return { selectedSplId, token, needReload };
  }, [selectedSplId, token, needReload]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const json = await memoizedLoadSupply(memoizedParam);
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [memoizedLoadSupply, memoizedParam, setData]);

  const { body: supplyBody } = data || {};

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
      {supplyBody && (
        <div>
          <h3>{supplyBody.splName}</h3>
          <div>{supplyBody.splCtgr}</div>
          <div>{supplyBody.splPrice}</div>
          <div>{supplyBody.invQty}</div>
          <div>이미지 보여줄 div</div>
          <div>{supplyBody.splDtl}</div>
        </div>
      )}
      <button onClick={onDeleteClickHandler}>삭제</button>
      <button onClick={backToListHandler}>목록보기</button>
    </div>
  );
}
