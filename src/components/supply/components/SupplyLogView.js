import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSupplyLogList } from "../../../http/supplyHttp";

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

  const columns = [
    {
      title: "카테고리",
      dataIndex: "splCtgr",
      key: "splCtgr,",
    },
    {
      title: "제품 명",
      dataIndex: "splName",
      key: "splName",
    },
    {
      title: "신청인",
      dataIndex: "reqrId",
      key: "reqrId",
    },
    {
      title: "신청 갯수",
      dataIndex: "reqCnt",
      key: "reqCnt",
    },
    {
      title: "신청일",
      dataIndex: "reqDt",
      key: "reqDt",
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
    {
      label: "신청인",
      value: "r",
    },
  ];

  const { count, pages, next } = data || {};
  const { body: supplyLogs } = data || {};

  return;
}
