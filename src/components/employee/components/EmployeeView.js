import styled from "@emotion/styled";
import { Button, Descriptions, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import GradeChangeHistory from "./GradeChangeHistory";
import DepartChangeHistory from "./DepartChangeHistory";
import WorkChangeHistory from "./WorkChangeHistory";
import ModifyBtn from "./Popup/ModifyBtn";
import { loadOneData, handleUpdateEmployee } from "../../../http/employeeHttp";
import MenuBtn from "./Popup/MenuBtn";
import RegBtn from "./Popup/RegBtn";

const { Title } = Typography;

const imgBase64 = "333";

export default function EmployeeView() {
  //useParams 는 Router설정에서 url에 :파라미터명 으로 지정한 파라미터를 받아오게 해주는 hook.
  //!!!! 훅 사용한 값은 위에, 바로 밑에 state 순서로 정렬
  const { empId } = useParams();
  const { token } = useSelector((state) => state.tokenInfo);
  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState({
    depart: [],
    team: [],
    job: [],
    grade: [],
    workSts: [],
  });

  // TODO: 비밀번호 변경 버튼 추가

  const inputOptions = useMemo(
    () => [
      {
        title: "사원명",
        type: "string",
        dataIndex: "empName",
        required: true,
      },
      {
        title: "이메일",
        type: "string",
        dataIndex: "email",
        required: true,
      },
      {
        title: "주소",
        type: "string",
        dataIndex: "addr",
        required: true,
      },
      {
        title: "연락처",
        type: "string",
        dataIndex: "cntct",
        required: true,
      },
      {
        title: "부서",
        type: "select",
        dataIndex: "deptId",
        option: dataList.depart.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "직무",
        type: "select",
        dataIndex: "jobId",
        option: dataList.job.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "직급",
        type: "select",
        dataIndex: "pstnId",
        option: dataList.grade.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
      {
        title: "재직상태",
        type: "select",
        dataIndex: "workSts",
        option: dataList.workSts.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
        required: true,
      },
    ],
    [dataList]
  );

  // loadOneData
  useEffect(() => {
    const fetchData = async () => {
      if (token && empId) {
        try {
          const json = await loadOneData({ token, empId }); // token과 empId 전달
          setData(json.body);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [token, empId]);

  const url =
    "http://" +
    (window.location.host === "43.202.29.221"
      ? "43.202.29.221"
      : "localhost:8080");
  const loadDataLists = useCallback(async () => {
    const response = await fetch(`${url}/api/v1/employee/data`, {
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    setDataList(json.body);
  }, [token, url]);

  const items = useMemo(
    () => [
      {
        key: "empId",
        label: "사원번호",
        children: data?.empId,
      },
      {
        key: "empName",
        label: "사원명",
        children: data?.empName,
      },
      {
        key: "deptName",
        label: "부서",
        children: data?.deptName,
      },
      {
        key: "tmName",
        label: "팀",
        children: data?.tmName,
      },

      {
        key: "jobName",
        label: "직무",
        children: data?.jobName,
      },
      {
        key: "pstnId",
        label: "직급",
        children: `${data?.pstnName}(${data.pstnId})`,
      },
      {
        key: "workSts",
        label: "재직상태",
        children: `${data?.workStsName}(${data?.workSts})`,
        // children: data?.workSts,
      },
      {
        key: "hireDt",
        label: "입사일",
        children: data?.hireDt,
      },
      {
        key: "email",
        label: "이메일",
        children: data?.email,
      },
      {
        key: "cntct",
        label: "연락처",
        children: data?.cntct,
      },
      {
        key: "brth",
        label: "생년월일",
        children: data?.brth,
      },
      {
        key: "addr",
        label: "주소",
        children: data?.addr,
      },
    ],
    [data]
  );
  console.log(data);

  // 수정
  const handleUpdateEmployeeAndReloadData = useCallback(
    async (data) => {
      try {
        await handleUpdateEmployee({ data, token, empId }); // 데이터 업데이트
      } catch (error) {
        message.warning("수정 실패하였습니다.");
      } finally {
        const updatedData = await loadOneData({ token, empId }); // 업데이트된 데이터 다시 가져오기
        setData(updatedData.body);
      }
    },
    [empId, token]
  );
  // useEffect는 항상 다른 함수나 state, 변수를 참조할수 있기 때문에
  // return 바로 위에 둘것!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    // loadOneData();
    loadDataLists();
  }, [loadDataLists]);

  return (
    <EmployeeInfoWrapper>
      <Title level={3}>사원정보</Title>
      <ImageWrapper>
        <img src={imgBase64} alt="프로필이미지" />
        <RegBtn />
      </ImageWrapper>

      {/* Descriptions의 column prop에는 한 row에 표시할 column개수를 브라우저 화면 사이즈 별로 지정.
      기본=3개 */}
      <Descriptions
        column={{ xxl: 3, xl: 3, lg: 3, md: 3 }}
        items={items}
        size="small"
        bordered
      />
      <GradeChangeHistory />
      <DepartChangeHistory />
      <WorkChangeHistory />
      <ModifyBtn
        data={data}
        options={inputOptions}
        onOk={handleUpdateEmployeeAndReloadData}
      />
      <MenuBtn />
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
  // margin-bottom: img {
  //   width: 200px;
  //   border: 1px solid #d6d6d6;
  //   border-radius: 50%;
  // }
`;

export const CustomButton = styled(Button)`
  margin-top: 30px;
  text-align: right;
`;
