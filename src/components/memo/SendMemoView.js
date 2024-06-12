import { useCallback, useMemo, useState } from "react";
import {
  cancelSendMemo,
  deleteSendMemo,
  loadSendMemo,
  saveSendMemo,
} from "../../http/memoHttp";
import { useFetch } from "../hook/useFetch";
import Button from "../common/Button/Button";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function SendMemoView({
  token,
  selectSendMemoId,
  setSelectSendMemoId,
  setNeedLoad,
}) {
  const [needViewReLoad, setNeedViewReLoad] = useState();

  const fetchLoadSendMemo = useCallback(loadSendMemo, []);
  const fetchParam = useMemo(() => {
    return { selectSendMemoId, token, needViewReLoad };
  }, [selectSendMemoId, token, needViewReLoad]);

  const { data, isLoading } = useFetch(
    undefined,
    fetchLoadSendMemo,
    fetchParam
  );

  const { body: sendMemo } = data || {};

  // 발신함 이동
  const onBoardListClickHandler = () => {
    setSelectSendMemoId(undefined);
  };

  // 쪽지 보관
  const onClickSaveSendMenoHandler = async () => {
    const newSaveState = sendMemo.sendSaveYn === "N" ? "Y" : "N";

    const json = await saveSendMemo(token, selectSendMemoId, newSaveState);
    if (json.body) {
      setNeedViewReLoad(Math.random());
    } else if (json.errors) {
      alert(json.erros);
    }
  };

  // 쪽지 삭제
  const onDeleteClickHandler = async () => {
    const json = await deleteSendMemo(token, selectSendMemoId);
    if (json.body) {
      setSelectSendMemoId(undefined);
      setNeedLoad(Math.random);
    } else {
      alert(json.errors);
    }
  };

  // 발신 취소
  const onCancelClickHandler = async () => {
    const json = await cancelSendMemo(token, selectSendMemoId);
    if (json.body) {
      alert("발신이 취소되었습니다");
    } else {
      alert(json.errors);
    }
  };

  return (
    <div>
      {isLoading && <div>쪽지 내용을 불러오는 중입니다.</div>}
      {!isLoading && (
        <div className="memo-container">
          <div className="button-area">
            <Button onClickHandler={onBoardListClickHandler}>목록</Button>
            <Button onClickHandler={onDeleteClickHandler}>삭제</Button>
            <Button onClickHandler={onCancelClickHandler}>발신취소</Button>
          </div>
          <div>
            {sendMemo && (
              <div className="grid" key={selectSendMemoId}>
                {sendMemo.sendSaveYn && (
                  <div id="grid-save" onClick={onClickSaveSendMenoHandler}>
                    {sendMemo.sendSaveYn === "Y" ? <BsStarFill /> : <BsStar />}
                  </div>
                )}
                <h4 id="grid-title">{sendMemo.memoTtl}</h4>
                <>
                  <lable id="grid-label-send" htmlFor="sendEmp">
                    보낸사람
                  </lable>
                  <div className="sendEmp" id="grid-send">
                    {sendMemo.departmentVO.deptName}
                    {"부 "}
                    {sendMemo.employeeVO.empName}({sendMemo.employeeVO.email})
                  </div>
                </>
                <>
                  <lable id="grid-label-receive" htmlFor="ReceiveEmp">
                    받는사람
                  </lable>
                  <div className="ReceiveEmp" id="grid-receive">
                    {/* {receiveMemo.departmentVO.deptName}
                    {"부 "}
                    {receiveMemo.employeeVO.empName} (
                    {receiveMemo.employeeVO.email}) */}
                  </div>
                </>
                {sendMemo.originFileName && (
                  <>
                    <lable id="grid-label-file" htmlFor="sendEmp">
                      첨부파일
                    </lable>
                    <div className="sendEmp" id="grid-file">
                      {sendMemo.originFileName}
                    </div>
                  </>
                )}
                <div id="grid-send-date">{sendMemo.sendDate}</div>
                <div />
                <div id="grid-content">{sendMemo.memoCntnt}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
