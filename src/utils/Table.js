import { useCallback, useEffect, useMemo, useState } from "react";
import { Table as AntTable, Card, Input, Select } from "antd";
import { produce } from "immer";
import Selectbox from "../components/common/selectbox/Selectbox";
import s from "./table.module.css";
import Button from "../components/common/Button/Button";

export default function Table({
  dataSource,
  filter,
  filterOptions,
  columns,
  pagination,
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
    // 테이블 마운트(컴포넌트를 DOM에 추가) 시,
    // filter옵션이 true이고, filterOptions array에 값이 있으면, filter(Select)검색조건 Option을 만들어줌
    if (filter && filterOptions && filterOptions.length > 0) {
      setFilterParam(
        produce((draft) => {
          draft.type = filterOptions[0].value;
        })
      );
    }
  }, [filterOptions, filter]);

  // handleInputChange 함수는 대부분의 데이터(1depth)인 경우에 input값 변경될때 업데이트해주도록 쓸 수 있음.
  // 아래 Select, Input에서 사용하는 예를 보면 됨.
  const handleInputChange = useCallback(
    (key) => (e) => {
      const value = e.target ? e.target.value : e;
      setFilterParam(
        produce((draft) => {
          draft[key] = value;
        })
      );
    },
    []
  );

  return (
    <>
      {filter && (
        <Card style={{ marginBottom: 10, padding: 0 }}>
          <div>
            <div>
              <Select
                options={filterOptions}
                style={{ width: 150, marginRight: "15px" }}
                value={filterParam.type}
                onChange={handleInputChange("type")}
              />

              <Input
                value={filterParam?.keyword}
                onChange={handleInputChange("keyword")}
              />
              {buttonName && (
                <Button
                  onClickHandler={btnOnClickHandler}
                  styleClass={buttonClassName}
                >
                  {buttonName}
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
      <AntTable
        className={tableStyleClass}
        dataSource={
          dataSource
            ? dataSource?.filter((dt) =>
                String(dt[filterParam?.type]).includes(filterParam?.keyword)
              )
            : []
        }
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
          ...pagination,
        }}
        size="small"
        columns={tableColumns}
        {...props}
      />
    </>
  );
}

/**
 * 각 App.js에 사용 예시
 *
 *   const filterOptions = [
 *       {
 *         label: 'ID',
 *         value: 'id',
 *       },
 *       {
 *         label: '이름',
 *         value: 'name',
 *       },
 *     ];
 *     위와같은 항목을 filterOptions에 전달하면, 해당 내용으로 필터할 항목이 select에 표시 됨.
 *
 *
 * return (
    <>
      <Table
        columns={tableColumns}
        dataSource={currencyList}
        rowKey={(dt) => dt.id}
        filter
        filterOptions={filterOptions}
      />
    </>
  );
 *
 * rowKey는 data중에서 고유값(dataIndex)을 지정해주어야 함.
 * 위 예시처럼 {(dt)=> dt.id} 라고 하면 데이터항목중 id라는 값을 기준으로 고유하게 row를 생성해줌.
 * filter 라고 넣는것은 filter={true} 인데, filter라고만 넣으면 이게 곧 true라는 의미이므로 중복제거하여 filter라고 쓴 것.
 * filterOptions에 options를 넣어줘야 함.
 *
 */
