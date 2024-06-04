import styled from "@emotion/styled/macro";
import { Button, Descriptions, Typography } from "antd";
import { useParams } from "react-router-dom";
import Table from "../../../utils/Table";

const { Title } = Typography;

const imgBase64 = "333";

const items = [
  {
    key: "1",
    label: "UserName",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "Telephone",
    children: "1810000000",
  },
  {
    key: "3",
    label: "Live",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Remark",
    children: "empty",
  },
  {
    key: "5",
    label: "Address",
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
];

export default function EmployeeView() {
  //useParams 는 Router설정에서 url에 :파라미터명 으로 지정한 파라미터를 받아오게 해주는 훅.
  const { empId } = useParams();
  //

  return (
    <EmployeeInfoWrapper>
      <Title level={3}>사원정보</Title>
      <ImageWrapper>
        <img src={imgBase64} alt="프로필이미지" />
      </ImageWrapper>
      {/* Descriptions의 column prop에는 한 row에 표시할 column개수를 브라우저 화면 사이즈 별로 지정. 기본=3개 */}
      <Descriptions
        column={{ xxl: 2, xl: 2, lg: 2, md: 2 }}
        items={items}
        size="small"
        bordered
      />
      <Title level={5}>직무 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
      <Title level={5}>부서 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
      <CustomButton>Button</CustomButton>
    </EmployeeInfoWrapper>
  );
}

// styled.(HTML태그명)``;
// styled(컴포넌트명)``;
const EmployeeInfoWrapper = styled.div`
  p {
    padding: 0 20px;
  }
`;

const ImageWrapper = styled.div`
  text-align: right;
  margin-bottom: img {
    width: 200px;
    border: 1px solid #d6d6d6;
    border-radius: 50%;
  }
`;

export const CustomButton = styled(Button)`
  margin-top: 30px;
`;
