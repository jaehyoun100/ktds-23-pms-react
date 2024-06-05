import { useRef } from "react";
import { modifySupply } from "../../../http/supplyHttp";

export default function SupplyModification({
  setIsSupplyModificationMode,
  token,
  supplyBody,
  setNeedReload,
}) {
  const supplyNameRef = useRef();
  const supplyCategoryRef = useRef();
  const supplyPriceRef = useRef();
  const supplyStockRef = useRef();
  const supplyImageRef = useRef();
  const supplyDetailRef = useRef();

  const onModificationClickHandler = async () => {
    const name = supplyNameRef.current.value;
    const category = supplyCategoryRef.current.value;
    const price = supplyPriceRef.current.value;
    const stock = supplyStockRef.current.value;
    const image = supplyImageRef.current.files[0];
    const detail = supplyDetailRef.current.value;

    const json = await modifySupply(
      token,
      supplyBody.splId,
      name,
      category,
      price,
      stock,
      image,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsSupplyModificationMode(false);
      setNeedReload(Math.random());
    }
  };

  const onCancelClickHandler = () => {
    setIsSupplyModificationMode(false);
  };

  return (
    <div>
      <div>
        <label htmlFor="category">카테고리</label>
        {/* <input type="text" id="category" name="category" defaultValue={supplyBody.s} */}
      </div>
    </div>
  );
}
