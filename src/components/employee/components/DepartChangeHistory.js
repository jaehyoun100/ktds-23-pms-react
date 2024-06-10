import React from "react";
import Table from "../../../utils/Table";
import { Typography } from "antd";

const { Title } = Typography;

function DepartChangeHistory() {
  return (
    <>
      <Title level={5}>부서 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
    </>
  );
}

export default DepartChangeHistory;
