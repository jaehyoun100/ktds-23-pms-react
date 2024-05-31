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

  const { count, pages, next } = data || {};
  const { body: supplies } = data || {};

  return (
    <>
      <div>총 {count} 개의 소모품이 검색되었습니다.</div>
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>이름</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {supplies &&
            supplies.map((supplyItem) => (
              <tr key={supplyItem.splId}>
                <td>{supplyItem.splCtgr}</td>
                <td>{supplyItem.splName}</td>
                <td>{supplyItem.invQty}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
