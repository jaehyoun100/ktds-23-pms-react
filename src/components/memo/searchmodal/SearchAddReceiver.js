import { useDispatch, useSelector } from "react-redux";
import { BsDashSquare, BsDashSquareFill } from "react-icons/bs";
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
    <div className={style.contentGridOneRows}>
      <div className={style.heightFull}>
        <div className={style.miniTitle}>수신</div>
        {rcvList && (
          <div className={`${style.tree} ${style.treeItemOverflow}`}>
            {rcvList &&
              rcvList.map((emp) => (
                <div key={emp.empId} className={style.treeItemSmall}>
                  <div className={style.treeItemMinus}>
                    <BsDashSquareFill
                      onClick={() => onDeleteRcvListHandler(emp.empId)}
                    />
                  </div>
                  {emp.empName} ({emp.email})
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={style.heightFull}>
        <div className={style.miniTitle}>참조</div>
        <div className={`${style.tree} ${style.treeItemOverflow}`}>
          {rcvRefList &&
            rcvRefList.map((emp) => (
              <div key={emp.empId} className={style.treeItemSmall}>
                <div className={style.treeItemMinus}>
                  <BsDashSquareFill
                    onClick={() => onDeleteRcvRefListHandler(emp.empId)}
                  />
                </div>
                {emp.empName} ({emp.email})
              </div>
            ))}
        </div>
      </div>
      <div className={style.heightFull}>
        <div className={style.miniTitle}>숨은참조</div>
        <div className={`${style.tree} ${style.treeItemOverflow}`}>
          {rcvSecretRefList &&
            rcvSecretRefList.map((emp) => (
              <div key={emp.empId} className={style.treeItemSmall}>
                <div className={style.treeItemMinus}>
                  <BsDashSquareFill
                    onClick={() => onDeleteRcvSecretRefListHandler(emp.empId)}
                  />
                </div>
                {emp.empName} ({emp.email})
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
