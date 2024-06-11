import style from "./Memo.module.css";

export default function SearchAddReceiver({
  rcvList,
  // rcvRefList,
  // rcvSecretRefList,
}) {
  console.log(rcvList, "+++++++++++++++++++++++++ ");

  return (
    <div>
      <div className={style.receiveBox}>
        <div>수신</div>
        <div className={style.rcvBox}>
          {rcvList &&
            rcvList.map((emp) => (
              <div>
                {emp.empName} ({emp.email})
              </div>
            ))}
        </div>
      </div>
      {/* <div className={style.receiveBox}>
        <div>참조</div>
        <div>{rcvRefList}</div>
      </div>
      <div className={style.receiveBox}>
        <div>비밀참조</div>
        <div>{rcvSecretRefList}</div>
      </div> */}
    </div>
  );
}
