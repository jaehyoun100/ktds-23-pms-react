import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyLogList } from "../../http/supplyHttp";

export default function SupplyLogView({ needReload, setNeedReload, token }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const memoizedLoadSupplyLogList = useCallback(loadSupplyLogList, []);
  const memoizedToken = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadSupplyLogList({ ...memoizedToken });
      setData(json);
      setIsLoading(false);
    };

    fetchingData();
  }, [memoizedLoadSupplyLogList, memoizedToken]);

  const { count, pages, next } = data || {};
  const { body: supplyLogs } = data || {};

  return;
}
