import { useCallback, useMemo, useState } from "react";
import { loadSendMemo } from "../../http/memoHttp";
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

  const onBoardListClickHandler = () => {};
  const onDeleteClickHandler = () => {};
  const onClickSaveSendMenoHandler = () => {};

  return (
    <div>
      {isLoading && <div>쪽지 내용을 불러오는 중입니다.</div>}
      {!isLoading && (
        <div className="memo-container">
          <div className="button-area">
            <Button onClickHandler={onBoardListClickHandler}>목록</Button>
            <Button onClickHandler={onDeleteClickHandler}>삭제</Button>
          </div>
          <div>
            {sendMemo && (
              <div className="grid" key={selectSendMemoId}>
                {sendMemo.rcvSaveYn && (
                  <div id="grid-save" onClick={onClickSaveSendMenoHandler}>
                    {sendMemo.rcvSaveYn === "Y" ? <BsStarFill /> : <BsStar />}
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
