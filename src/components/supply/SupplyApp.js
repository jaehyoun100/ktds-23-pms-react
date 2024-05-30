import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyList } from "../../http/supplyHttp";

let pageNo = 0;

export default function SupplyApp({ token }) {
  const [needReload, setNeedReload] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const memoizedLoadSupplyList = useCallback(loadSupplyList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadSupplyList({ ...memoizedToken });
      setData(json);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadSupplyList, memoizedToken]);

  return <div>소모품 App</div>;
}
