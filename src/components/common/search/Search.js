import { CgSearch } from "react-icons/cg";
import TextInput from "../input/TextInput";
import Selectbox from "../selectbox/Selectbox";
import "./search.css";
export default function Search({
  onClickHandler,
  textRef,
  optionList,
  selectedData,
  setSelectedData,
}) {
  return (
    <div className="flex-array">
      <Selectbox
        className="select-box"
        optionList={optionList}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        styleClassName="select-box"
      />
      <TextInput textRef={textRef} />
      <CgSearch onClick={onClickHandler} />
    </div>
  );
}
