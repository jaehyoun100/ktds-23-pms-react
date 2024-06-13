import style from "../Memo.module.css";
import { BsX } from "react-icons/bs";

export default function MemoModal({ id, header, body, footer, onClose }) {
  return (
    <div id={id || "Modal"} className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h5>{header ? header : "Header"}</h5>
          <BsX onClick={onClose} className={style.closeModalIcon} />
        </div>
        <div className={style.modalBody}>
          {body ? (
            body
          ) : (
            <div>
              <p>데이터를 불러오는 중입니다.</p>
            </div>
          )}
        </div>
        <div className={style.modalFooter}>{footer && footer}</div>
      </div>
    </div>
  );
}
