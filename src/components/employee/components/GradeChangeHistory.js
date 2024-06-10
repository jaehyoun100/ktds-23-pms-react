import React from "react";
import Table from "../../../utils/Table";
import { Typography } from "antd";

const { Title } = Typography;

function GradeChangeHistory() {
  return (
    <>
      <Title level={5}>직급 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
    </>
  );
}

export default GradeChangeHistory;
