import styled from "@emotion/styled";
import { Button, Descriptions, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import Table from "../../../utils/Table";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Title } = Typography;

const imgBase64 = "333";

export default function EmployeeView() {
  //useParams 는 Router설정에서 url에 :파라미터명 으로 지정한 파라미터를 받아오게 해주는 hook.
  const { empId } = useParams();
  const [data, setData] = useState([]);

  const { token } = useSelector((state) => state.tokenInfo);

  const loadOneData = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/employee/view/${empId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const json = await response.json();
    console.log(json.body);
    setData(json.body);
  }, [token, empId]);

  useEffect(() => {
    loadOneData();
  }, [loadOneData]);

  const items = [
    {
      key: "empId",
      label: "사원번호",
      children: data.empId,
    },
    {
      key: "empName",
      label: "사원명",
      children: data.empName,
    },
    {
      key: "deptName",
      label: "부서",
      children: data.departmentVO ? data.departmentVO.deptName : "",
    },
    {
      key: "tmName",
      label: "팀",
      children: data.teamVO ? data.teamVO.tmName : "",
    },

    {
      key: "jobName",
      label: "직무",
      children: data.jobVO ? data.jobVO.jobName : "",
    },
    {
      key: "pstnId",
      label: "직급번호",
      children: data.pstnId,
    },

    {
      key: "workSts",
      label: "재직상태",
      children: data.workSts,
    },
    {
      key: "hireDt",
      label: "입사날짜",
      children: data.hireDt,
    },
    {
      key: "email",
      label: "이메일",
      children: data.email,
    },
    {
      key: "cntct",
      label: "전화번호",
      children: data.cntct,
    },
    {
      key: "brth",
      label: "생년월일",
      children: data.brth,
    },
    {
      key: "addr",
      label: "주소",
      children: data.addr,
    },
  ];

  return (
    <EmployeeInfoWrapper>
      <Title level={3}>사원정보</Title>
      <ImageWrapper>
        <img src={imgBase64} alt="프로필이미지" />
      </ImageWrapper>
      {/* Descriptions의 column prop에는 한 row에 표시할 column개수를 브라우저 화면 사이즈 별로 지정.
      기본=3개 */}
      <Descriptions
        column={{ xxl: 3, xl: 3, lg: 3, md: 3 }}
        items={items}
        size="small"
        bordered
      />
      <Title level={5}>직급 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
      <Title level={5}>부서 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
      <Title level={5}>직무 변경 이력</Title>
      <Table dataSource={[]} columns={[]} />
      <CustomButton onClick={() => Navigate(`/employee/modify/${empId}`)}>
        수정
      </CustomButton>
    </EmployeeInfoWrapper>
  );
}

// styled.(HTML태그명)``;
// styled(컴포넌트명)``;
const EmployeeInfoWrapper = styled.div`
  p {
    padding: 0 20px;
  }
  h5 {
    padding-top: 30px;
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
  text-align: right;
`;
