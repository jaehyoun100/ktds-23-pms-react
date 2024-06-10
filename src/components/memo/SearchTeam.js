import { useState } from "react";
import style from "./Memo.module.css";
import { BsPlusSquare, BsFolder, BsFolder2Open } from "react-icons/bs";

export default function SearchTeam({ item }) {
  const [isOpened, setIsOpened] = useState(false);

  const onOpenClickHandler = () => {
    if (item.children) {
      setIsOpened(!isOpened);
    }
  };

  return (
    <div className={style.treeItem}>
      <button onClick={onOpenClickHandler}>
        {item.children && (isOpened ? <BsFolder2Open /> : <BsFolder />)}
        {item.name}
      </button>
      {item.children && (
        <div
          className={`${style.treeSubItem} ${
            isOpened ? "" : style.subMenuShrunk
          }`}
        >
          {item.children.length
            ? item.children.map((subitem) => <SearchTeam item={subitem} />)
            : "팀 없음"}
        </div>
      )}
    </div>
  );
}
