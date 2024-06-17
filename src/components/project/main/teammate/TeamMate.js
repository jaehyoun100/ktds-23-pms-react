import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import Selectbox from "../../../common/selectbox/Selectbox";
import s from "./TeamMate.module.css";
import Button from "../../../common/Button/Button";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { CiCircleMinus } from "react-icons/ci";
import { FcBusinessman } from "react-icons/fc";
import MainHeader from "../MainHeader";
import {
  addTmmate,
  deleteTmmate,
  getEmp,
  getEmpData,
} from "../../../../http/projectHttp";
import TeammateEmpInfo from "./TeammateEmpInfo";
import { jwtDecode } from "jwt-decode";

export default function TeamMate() {
  const [teammateList, setTeammateList] = useState([]);
  const [project, setproject] = useState([]);
  const [pm, setPm] = useState(null);
  const [deptId, setDeptId] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [selectedRoleData, setSelectedRoleData] = useState([]);
  const [lastModifiedIndex, setLastModifiedIndex] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [temporaryList, setTemporaryList] = useState([]);
  const [deleteItemList, setDeleteItemList] = useState([]);
  const [selectDeleteData, setSelectDeleteData] = useState();
  const [lastModifyData, setLastModifyData] = useState([]);
  const [selectedEmpData, setSelectedEmpData] = useState();
  const [willInsertData, setWillInsertData] = useState([]);
  const [canAdd, setCanAdd] = useState(true);
  const [isPossible, setIsPossible] = useState(false);
  const nameRef = useRef();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfo = jwtDecode(token).user;

  const location = useLocation();

  useEffect(() => {
    console.log(selectedData, selectedRoleData);
    // console.log(selectedEmpData);
  }, [selectedData, selectedRoleData]);

  useMemo(() => {
    const item = location.state.key;
    setproject(item.project);

    const pmData = item.project.pm;
    const teamListWithoutPm = item.project.projectTeammateList.filter(
      (member) => member.empId !== pmData.empId
    );

    setTeammateList(teamListWithoutPm);
    setPm(pmData);
    setDeptId(item.project.deptId);
  }, [location.state.key]);

  // 부서 구성원 리스트 로드
  const memoizedGetEmp = useCallback(getEmp, []);

  useEffect(() => {
    memoizedGetEmp(deptId, token, setMemberList);
  }, [deptId, token, memoizedGetEmp]);

  const buttonGroupHiddenRef = useRef(null);
  const buttonHiddenRef = useRef(null);
  const cancelButtonGroupHiddenRef = useRef(null);

  useEffect(() => {
    if (buttonGroupHiddenRef.current) {
      buttonGroupHiddenRef.current.style.display = "none";
      cancelButtonGroupHiddenRef.current.style.display = "none";
    }
  }, []);

  const onPlusClickHandler = () => {
    if (isEditing) {
      setTemporaryList((prev) => [
        ...prev,
        { empName: "", empId: "", role: "", key: Date.now() },
      ]);
    }
  };

  const onSaveClickHandler = () => {
    console.log(selectedData, selectedRoleData);
    if (selectedData.length === 0 || selectedRoleData.length === 0) {
      alert("값을 선택해주세요");
      return;
    }
    console.log(selectedData.length);

    const newData = selectedData.map((data, index) => ({
      prjId: project.prjId,
      tmId: data,
      role: selectedRoleData[index],
    }));

    setWillInsertData((prev) => [...prev, ...newData]);
    setIsPossible(true);
  };

  const memoizeAddTmmate = useCallback(addTmmate, []);
  useEffect(() => {
    const sendRequest = async () => {
      if (willInsertData.length > 0 && isPossible) {
        const json = await memoizeAddTmmate(token, project, willInsertData);
        if (json.status === 200) {
          setIsEditing(false);
          navigate("/project/view", { state: { key: project } });
        }
        setWillInsertData([]);
        setIsPossible(false);
      }
    };

    sendRequest();
  }, [willInsertData, isPossible]);

  const onModifyClickHandler = () => {
    setIsEditing(true);
    buttonGroupHiddenRef.current.style.display = "block";
    buttonHiddenRef.current.style.display = "none";
  };

  const onChangeSelectHandler = async (selectedOption, idx, type) => {
    for (let item of project.projectTeammateList) {
      if (selectedOption?.value === item.tmId) {
        alert("이미 존재하는 사원입니다.");
        setCanAdd(false);
        return;
      }
    }
    for (let item of selectedData) {
      if (selectedOption?.value === item) {
        alert("이미 존재하는 사원입니다.");
        setCanAdd(false);
        return;
      }
    }
    if (selectedOption && canAdd) {
      canAdd &&
        setTemporaryList((prevList) =>
          prevList?.map((item, index) =>
            index === idx
              ? {
                  ...item,
                  [type]: selectedOption.label,
                  empId: type === "empName" ? selectedOption.value : item.empId,
                }
              : item
          )
        );
      setLastModifiedIndex(idx);
      return;
    }
  };
  const onCancelClickHandler = () => {
    setIsEditing(false);
    setIsDelete(false);
    setTemporaryList([]);
    setSelectedEmpData("");
    setSelectedData([]);
    buttonGroupHiddenRef.current.style.display = "none";
    buttonHiddenRef.current.style.display = "block";
    cancelButtonGroupHiddenRef.current.style.display = "none";
  };

  const memoizedGetEmpData = useCallback(getEmpData, []);
  useEffect(() => {
    const data = async () => {
      const getdata = await memoizedGetEmpData(lastModifyData, token);
      await setSelectedEmpData(getdata.body);
    };
    data();
  }, [lastModifyData, token, memoizedGetEmpData]);

  useEffect(() => {
    if (lastModifiedIndex !== null) {
      const lastModifiedData = {
        empName: selectedData[lastModifiedIndex],
      };
      setLastModifyData(lastModifiedData.empName);
    }
  }, [lastModifiedIndex, selectedData]);

  const onDeleteClickHandler = (item) => {
    setIsDelete(true);
    const deleteItemListData = project.projectTeammateList.filter(
      (item) => item.role !== "PM"
    );
    setDeleteItemList(deleteItemListData);
    buttonHiddenRef.current.style.display = "none";
    cancelButtonGroupHiddenRef.current.style.display = "block";
  };

  const memoizeDeleteTmmate = useCallback(deleteTmmate, []);
  const onTeammateDeleteHandler = async (item) => {
    const json = await memoizeDeleteTmmate(token, project, item);
    if (json.status) {
      navigate("/project/view", { state: { key: project } });
    }
  };

  const onDeleteHandler = (idx) => {
    const updatedTemporaryList = [...temporaryList];
    updatedTemporaryList.splice(idx, 1);
    setTemporaryList(updatedTemporaryList);

    const updatedSelectedData = [...selectedData];
    updatedSelectedData.splice(idx, 1);
    setSelectedData(updatedSelectedData);

    const updatedSelectedRoleData = [...selectedRoleData];
    updatedSelectedRoleData.splice(idx, 1);
    setSelectedRoleData(updatedSelectedRoleData);
  };

  return (
    <div>
      <MainHeader project={project} />
      <div className={s.teamMateContainer}>
        <div className={s.leftContainer}>
          <div className={s.teamMateTableContainer}>
            <table className={s.teamMateTable}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ccc" }}>
                  <th>이름</th>
                  <th>역할</th>
                  {(isEditing || isDelete) && (
                    <th style={{ width: "15%" }}>삭제</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {pm && (
                  <tr style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ width: "300px" }}>{pm.employeeVO.empName}</td>
                    <td style={{ width: "300px" }}>{pm.role}</td>
                    {isEditing && <td></td>}
                  </tr>
                )}
                {project.projectTeammateList &&
                  project.projectTeammateList
                    .filter((item) => item.role !== "PM")
                    .map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                        <td>{item.employeeVO.empName}</td>
                        <td>{item.role}</td>
                        {isEditing && <td></td>}
                        {isDelete && (
                          <td className={s.svgTeammateContainer}>
                            <CiCircleMinus
                              onClick={() => onTeammateDeleteHandler(item)}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                {isEditing &&
                  temporaryList.map((item, idx) => (
                    <tr
                      key={item.key}
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <td style={{ width: "300px" }}>
                        <Selectbox
                          optionList={memberList}
                          selectedData={selectedData}
                          setSelectedData={setSelectedData}
                          idx={idx}
                          style={{ width: "100%" }}
                          onChangeFn={(selectedOption) =>
                            onChangeSelectHandler(
                              selectedOption,
                              idx,
                              "empName"
                            )
                          }
                          initial="추가할 직원을 선택해주세요"
                        />
                      </td>
                      <td style={{ width: "300px" }}>
                        <div className={s.teamMateDisplayFlex}>
                          <Selectbox
                            optionList={[
                              { label: "PL", value: "PL" },
                              { label: "NONE", value: "NONE" },
                            ]}
                            idx={idx}
                            selectedData={selectedRoleData}
                            setSelectedData={setSelectedRoleData}
                            style={{ width: "100%" }}
                            onChangeFn={(selectedOption) =>
                              onChangeSelectHandler(selectedOption, idx, "role")
                            }
                            initial="직책을 선택해주세요"
                          />
                        </div>
                      </td>
                      <td className={s.svgTeammateContainer}>
                        <CiCircleMinus onClick={() => onDeleteHandler(idx)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {userInfo &&
            pm &&
            (userInfo.admnCode === "301" || userInfo.empId === pm.tmId) && (
              <div className={s.teamMateButtonArea}>
                <div ref={buttonHiddenRef}>
                  <Button
                    onClickHandler={onModifyClickHandler}
                    children="참여원 추가"
                  />
                  <Button
                    onClickHandler={onDeleteClickHandler}
                    children="참여원 삭제"
                  />
                </div>
                <div ref={buttonGroupHiddenRef}>
                  <Button
                    onClickHandler={onPlusClickHandler}
                    children="줄 추가"
                  />
                  <Button onClickHandler={onSaveClickHandler} children="저장" />
                  <Button
                    onClickHandler={onCancelClickHandler}
                    children="취소"
                  />
                </div>
                <div ref={cancelButtonGroupHiddenRef}>
                  <Button
                    onClickHandler={onCancelClickHandler}
                    children="취소"
                  />
                </div>
              </div>
            )}
        </div>
        {userInfo &&
          pm &&
          (userInfo.admnCode === "301" || userInfo.empId === pm.tmId) && (
            <div className={s.teamMateEmpArea}>
              {selectedEmpData?.originPrflFileName ? (
                <div
                  className={s.teamMateEmpPhoto}
                  style={{
                    backgroundImage: `url(${
                      selectedEmpData?.originPrflFileName
                        ? selectedEmpData.originPrflFileName
                        : "https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171"
                    })`,
                  }}
                ></div>
              ) : (
                <FcBusinessman className={s.teamMateEmpPhoto} />
              )}
              <TeammateEmpInfo empData={selectedEmpData && selectedEmpData} />
            </div>
          )}
      </div>
    </div>
  );
}
