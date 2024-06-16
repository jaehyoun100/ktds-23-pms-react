import React from "react";
import { Typography } from "antd";
import Table from "../../../utils/Table";

const { Title } = Typography;

function HistoryTable({ type, dataList, column }) {
  return (
    <>
      <Title level={5}>{type} 변경 이력</Title>
      <Table dataSource={dataList} rowKey={(dt) => dt.historyId} columns={column} />
    </>
  );
}

export default HistoryTable;
