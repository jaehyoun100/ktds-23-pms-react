import React from "react";
import Table from "../../../utils/Table";
import { Typography } from "antd";

const { Title } = Typography;

function WorkChangeHistory() {
  return (
    <>
      <Title level={5}>직무 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
    </>
  );
}

export default WorkChangeHistory;
