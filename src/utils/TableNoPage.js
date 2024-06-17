import { useCallback, useEffect, useMemo, useState } from "react";
import { Table as AntTable, Card, Input, Select } from "antd";
import { produce } from "immer";
import Selectbox from "../components/common/selectbox/Selectbox";
import s from "./table.module.css";
import Button from "../components/common/Button/Button";

export default function TableNoPage({
  dataSource,
  filter,
  filterOptions,
  columns,
  buttonName,
  buttonClassName,
  btnOnClickHandler,
  tableStyleClass,
  ...props
}) {
  const [filterParam, setFilterParam] = useState({ type: "", keyword: "" });

  const tableColumns = useMemo(
    () => columns.filter((col) => !col.formOnly),
    [columns]
  );

  useEffect(() => {
    if (filter && filterOptions && filterOptions.length > 0) {
      setFilterParam(
        produce((draft) => {
          draft.type = filterOptions[0].value;
        })
      );
    }
  }, [filterOptions, filter]);

  return (
    <>
      <AntTable
        className={tableStyleClass}
        dataSource={
          dataSource
            ? dataSource?.filter((dt) =>
                String(dt[filterParam?.type]).includes(filterParam?.keyword)
              )
            : []
        }
        pagination={false} // 페이지네이션 비활성화
        size="small"
        columns={tableColumns}
        {...props}
      />
    </>
  );
}
