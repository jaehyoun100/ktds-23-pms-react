import { useDispatch, useSelector } from "react-redux";
import { BsDashSquare } from "react-icons/bs";
import style from "../Memo.module.css";
import { memoAddrAction } from "../../../store/toolkit/slice/memoAddrSlice";

export default function SearchAddReceiver() {
  const memoDispatch = useDispatch();
  const { rcvList, rcvRefList, rcvSecretRefList } = useSelector(
    (state) => state.receiverList
  );

  const onDeleteRcvListHandler = (empId) => {
    const updateRcvList = rcvList.filter((emp) => emp.empId !== empId);
    memoDispatch(memoAddrAction.deleteRcvList({ rcvList: updateRcvList }));
  };

  const onDeleteRcvRefListHandler = (empId) => {
    const updateRcvRefList = rcvRefList.filter((emp) => emp.empId !== empId);
    memoDispatch(
      memoAddrAction.deleteRcvRefList({ rcvRefList: updateRcvRefList })
    );
  };

  const onDeleteRcvSecretRefListHandler = (empId) => {
    const updateRcvSecretRefList = rcvSecretRefList.filter(
      (emp) => emp.empId !== empId
    );
    memoDispatch(
      memoAddrAction.deleteRcvSecretRefList({
        rcvSecretRefList: updateRcvSecretRefList,
      })
    );
  };

  return (
    <div>
      <div className={style.receiveBox}>
        <div>수신</div>
        {rcvList && (
          <div className={style.rcvBox}>
            {rcvList &&
              rcvList.map((emp) => (
                <div key={emp.empId}>
                  <BsDashSquare
                    onClick={() => onDeleteRcvListHandler(emp.empId)}
                  />
                  {emp.empName} ({emp.email})
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={style.receiveBox}>
        <div>참조</div>
        {rcvRefList &&
          rcvRefList.map((emp) => (
            <div>
              <BsDashSquare
                onClick={() => onDeleteRcvRefListHandler(emp.empId)}
              />
              {emp.empName} ({emp.email})
            </div>
          ))}
      </div>
      <div className={style.receiveBox}>
        <div>비밀참조</div>
        {rcvSecretRefList &&
          rcvSecretRefList.map((emp) => (
            <div>
              <BsDashSquare
                onClick={() => onDeleteRcvSecretRefListHandler(emp.empId)}
              />
              {emp.empName} ({emp.email})
            </div>
          ))}
      </div>
    </div>
  );
}
