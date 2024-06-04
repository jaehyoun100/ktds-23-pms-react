import { CgSearch } from "react-icons/cg";
import TextInput from "../input/TextInput";
import Selectbox from "../selectbox/Selectbox";
import s from "./search.module.css";
export default function Search({
  onClickHandler,
  textRef,
  optionList,
  selectedData,
  setSelectedData,
}) {
  return (
    <div className={s.flexArray}>
      <Selectbox
        className={s.selectBox}
        optionList={optionList}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <TextInput textRef={textRef} />
      <CgSearch onClick={onClickHandler} />
    </div>
  );
}
