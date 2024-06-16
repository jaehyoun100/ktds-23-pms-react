import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Button, Descriptions, Typography, message } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModifyBtn from "./Popup/ModifyBtn";
import { loadOneData, handleUpdateEmployee } from "../../../http/employeeHttp";
import MenuBtn from "./Popup/MenuBtn";
import RegBtn from "./Popup/RegBtn";
import PasswordBtn from "./Popup/PasswordBtn";
import axios from "axios";
import HistoryTable from "./HistoryTable";

const { Title } = Typography;

const keyText = {
  depart: "부서",
  position: "직급",
  job: "직무",
};

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
    position: [],
    workSts: [],
  });
  const [historyList, setHistoryList] = useState([]);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  // 프로필 사진 업로드를 위한 state
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const loadHisotry = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/employee/${empId}/history`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setHistoryList(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token, empId, historyList]);

  // 비밀번호 변경
  const inputOptions2 = useMemo(
    () => [
      {
        title: "기존 비밀번호",
        type: "string",
        dataIndex: "pwd",
        required: true,
      },
      {
        title: "새로운 비밀번호",
        type: "string",
        dataIndex: "newPwd",
        required: true,
      },

      {
        title: "비밀번호 확인",
        type: "string",
        dataIndex: "confirmPwd",
        required: true,
      },
    ],
    []
  );

  const defaultOptions = [
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
  ];

  const inputOptions = useMemo(
    () =>
      userInfo?.mngrYn === "Y"
        ? [
            ...defaultOptions,
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
              option: dataList.position.map(({ dataId, dataName }) => ({
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
            {
              title: "임원여부",
              type: "radio",
              dataIndex: "mngrYn",
              option: [
                { label: "아니오", value: "N" },
                { label: "예", value: "Y" },
              ],
              required: true,
            },
          ]
        : defaultOptions,
    [dataList, defaultOptions, userInfo]
  );

  const loadEmpData = useCallback(async () => {
    try {
      const json = await loadOneData({ token, empId }); // token과 empId 전달
      setData(json.body);
    } catch (error) {
      console.error(error);
    }
  }, [token, empId]);

  const url =
    "http://" + (window.location.host === "43.202.29.221" ? "43.202.29.221" : "localhost:8080");

  const loadDataLists = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/v1/employee/data`, {
        headers: {
          Authorization: token,
        },
      });
      setDataList(res.data);
    } catch (error) {
      console.error(error);
    }
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
      {
        key: "mngrYn",
        label: "임원여부",
        children: data?.mngrYn,
      },
    ],
    [data]
  );

  const handleGetNameText = useCallback(
    (type, value) => {
      return dataList
        ? dataList[type].find((data) => data?.dataId === value)?.dataName
        : keyText[type];
    },
    [dataList]
  );

  const historyColumns = useCallback((key) => [
    { title: "번호", key: "historyId", render: (_, __, idx) => idx + 1 },
    {
      title: `현재 ${keyText[key]}`,
      dataIndex: "curValue",
      key: "curValue",
      render: (dt) => handleGetNameText(key, dt),
    },
    {
      title: `변경전 ${keyText[key]}`,
      dataIndex: "preValue",
      key: "preValue",
      render: (dt) => handleGetNameText(key, dt),
    },
    { title: "변경일", dataIndex: "updDate", key: "updDate" },
  ]);

  // 수정
  const handleUpdateEmployeeAndReloadData = useCallback(
    async (data) => {
      try {
        await handleUpdateEmployee({ data, token, empId }); // 데이터 업데이트
        await loadHisotry();
      } catch (error) {
        message.warning("수정 실패하였습니다.");
      } finally {
        const updatedData = await loadOneData({ token, empId }); // 업데이트된 데이터 다시 가져오기
        setData(updatedData.body);
      }
    },
    [empId, token]
  );

  // 파일 업로드
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${url}/api/v1/employee/profile/{empId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("프로필 사진이 업로드되었습니다.");
      } else {
        throw new Error(data.message || "업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드에 실패했습니다.");
    }
  };

  const loadUserInfo = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/", {
        headers: {
          Authorization: token,
        },
      });
      setUserInfo(res.data.body);
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  //화면에 프로필 사진 표시
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // useEffect는 항상 다른 함수나 state, 변수를 참조할수 있기 때문에
  // return 바로 위에 둘것!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    if (token && empId) {
      loadDataLists();
      loadEmpData();
      loadHisotry();
    }
    loadUserInfo();
  }, [loadDataLists, token, empId]);

  return (
    <EmployeeInfoWrapper>
      <Title level={3}>사원정보</Title>
      <ImageWrapper>
        <Avatar
          src={Image}
          style={{ margin: "20px" }}
          size={150}
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,impge/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
        <RegBtn btnText="업로드" type="primary" onClick={handleUpload} />

        {/* <RegBtn /> */}
      </ImageWrapper>

      {/* Descriptions의 column prop에는 한 row에 표시할 column개수를 브라우저 화면 사이즈 별로 지정.
      기본=3개 */}
      <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3 }} items={items} size="small" bordered />
      <HistoryTable
        type={keyText["depart"]}
        column={historyColumns("depart")}
        dataList={historyList.filter((item) => item.type === "depart")}
      />
      <HistoryTable
        type={keyText["position"]}
        column={historyColumns("position")}
        dataList={historyList.filter((item) => item.type === "position")}
      />
      <HistoryTable
        type={keyText["job"]}
        column={historyColumns("job")}
        dataList={historyList.filter((item) => item.type === "job")}
      />
      {userInfo?.empId === empId && (
        <PasswordBtn data={data} options={inputOptions2} onOk={handleUpdateEmployeeAndReloadData} />
      )}
      {(userInfo?.mngrYn === "Y" || userInfo?.empId === empId) && (
        <ModifyBtn data={data} options={inputOptions} onOk={handleUpdateEmployeeAndReloadData} />
      )}
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
