import styled from "@emotion/styled";
import { Button, Descriptions, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import Table from "../../../utils/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import GradeChangeHistory from "./GradeChangeHistory";
import DepartChangeHistory from "./DepartChangeHistory";
import WorkChangeHistory from "./WorkChangeHistory";
import ModifyBtn from "./Popup/ModifyBtn";

const { Title } = Typography;

const imgBase64 = "333";

export default function EmployeeView() {
  //useParams 는 Router설정에서 url에 :파라미터명 으로 지정한 파라미터를 받아오게 해주는 hook.
  //!!!! 훅 사용한 값은 위에, 바로 밑에 state 순서로 정렬
  const { empId } = useParams();
  const { token } = useSelector((state) => state.tokenInfo);
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false); // 모달 상태 (기본 false)
  const [isModifyEmployee, setIsModifyEmployee] = useState(false); // 수정 상태 사원의 데이터
  const [dataList, setDataList] = useState({
    depart: [],
    team: [],
    job: [],
    grade: [],
  });

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
      },
      {
        title: "팀",
        type: "select",
        dataIndex: "tmId",
        option: dataList.team.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
      },
      {
        title: "직무",
        type: "select",
        dataIndex: "jobId",
        option: dataList.job.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
      },
      {
        title: "직급",
        type: "select",
        dataIndex: "pstnId",
        option: dataList.grade.map(({ dataId, dataName }) => ({
          label: dataName,
          value: dataId,
        })),
      },
    ],
    [dataList]
  );

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
    setData(json.body);
  }, [token, empId]);

  const loadDataLists = useCallback(async () => {
    const response = await fetch("http://localhost:8080/api/v1/employee/data", {
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    setDataList(json.body);
  }, []);

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
        children: data?.departmentVO?.deptName,
      },
      {
        key: "tmName",
        label: "팀",
        children: data?.teamVO?.tmName,
      },

      {
        key: "jobName",
        label: "직무",
        children: data?.jobVO?.jobName,
      },
      {
        key: "pstnId",
        label: "직급",
        children: `${data?.commonCodeVO?.cmcdName}(${data.pstnId})`,
      },
      {
        key: "workSts",
        label: "재직상태",
        children: data?.workSts,
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

  const handleUpdateEmployee = useCallback(
    async (data) => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/employee/modify/${empId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(data),
          }
        );
        if (res.status === 200) {
          loadOneData();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [empId, loadOneData, token]
  );

  // 모달 수정 완료 후 확인 버튼 눌렀을 때 호출 함수
  // !!!함수 실행시점에 loadOneData라는 함수에 변경이 있을수 있으므로, useCallback 사용하고, 참조배열에 loadOneData 추가.
  const ModifyHandleOk = useCallback(async () => {
    // 여기에 수정 요청을 보내는 로직을 추가
    // 예: await updateEmployee(isModifyEmployee);

    setIsModal(false); // 모달 닫기
    loadOneData(); // 데이터 다시 로드
  }, [loadOneData]);

  // 모달의 취소 버튼 클릭 시 호출되는 함수
  const ModifyHandleCancel = () => {
    setIsModal(false); // 모달 닫기
  };

  // useEffect는 항상 다른 함수나 state, 변수를 참조할수 있기 때문에
  // return 바로 위에 둘것!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    loadOneData();
    loadDataLists();
  }, [loadOneData, loadDataLists]);

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
      <GradeChangeHistory />
      <DepartChangeHistory />
      <WorkChangeHistory />
      <ModifyBtn
        data={data}
        options={inputOptions}
        onOk={handleUpdateEmployee}
      />
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
