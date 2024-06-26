import style from "./Memo.module.css";
import { useEffect, useState } from "react";

export default function MemoReceiverArea({ sendMemo, myInfo }) {
  console.log(myInfo, "<<<<");

  const receiveMemoVOList = sendMemo ? sendMemo.receiveMemoVOList : [];
  const [rcvSecretRefList, setRcvSecretRefList] = useState([]);

  const rcvList = receiveMemoVOList.filter((memo) => memo.rcvCode === "1401");
  const rcvRefList = receiveMemoVOList.filter(
    (memo) => memo.rcvCode === "1402"
  );

  useEffect(() => {
    if (myInfo === undefined) {
      const rcvList = receiveMemoVOList.filter(
        (memo) => memo.rcvCode === "1403"
      );
      setRcvSecretRefList(rcvList);
    } else if (myInfo) {
      const rcvList = receiveMemoVOList.filter(
        (memo) => memo.rcvCode === "1403" && memo.rcvId === myInfo.empId
      );
      setRcvSecretRefList(rcvList);
    }
  }, [myInfo, receiveMemoVOList]);
  const isRcvSecretExist = Object.keys(rcvSecretRefList).length > 0;

  return (
    receiveMemoVOList && (
      <>
        {rcvList && (
          <div className={style.memoOptionItem}>
            <div className={style.memotitleArea}>
              <strong className={style.optionTitle}>받는사람</strong>
            </div>
            <div className={style.optionArea}>
              {rcvList.map((receiver) => (
                <div className={style.receiverArea} key={receiver.empId}>
                  <button className={style.buttonUser}>
                    {receiver.departmentVO.deptName}{" "}
                    {receiver.employeeVO.empName} ({receiver.employeeVO.email})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 참조 */}
        {rcvRefList && (
          <div className={style.memoOptionItem}>
            <div className={style.memotitleArea}>
              <strong className={style.optionTitle}>참조</strong>
            </div>
            <div className={style.optionArea}>
              {rcvRefList.map((receiver) => (
                <div className={style.receiverArea} key={receiver.empId}>
                  <button className={style.buttonUser}>
                    {receiver.departmentVO.deptName}{" "}
                    {receiver.employeeVO.empName} ({receiver.employeeVO.email})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 비밀참조 */}
        {rcvSecretRefList && isRcvSecretExist && (
          <div className={style.memoOptionItem}>
            <div className={style.memotitleArea}>
              <strong className={style.optionTitle}>숨은참조</strong>
            </div>
            <div className={style.optionArea}>
              {rcvSecretRefList.map((receiver) => (
                <div className={style.receiverArea} key={receiver.empId}>
                  <button className={style.buttonUser}>
                    {receiver.departmentVO.deptName}{" "}
                    {receiver.employeeVO.empName} ({receiver.employeeVO.email})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )
  );
}
