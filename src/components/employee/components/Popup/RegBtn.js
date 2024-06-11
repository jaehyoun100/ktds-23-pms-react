import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import InputPopup from "./InputPopup";
export default function RegBtn({
  data,
  options,
  onOk,
  defaultValues,
  playerInfo,
  btnText,
  fileUpload,
  buttonProps,
}) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleShowPopup = useCallback(() => {
    setEditData(defaultValues);
    setOpen(true);
  }, [defaultValues]);

  const handleClosePopup = useCallback(() => {
    setEditData(defaultValues);
    setOpen(false);
  }, [defaultValues]);

  const handleChangeData = useCallback((val) => {
    setEditData(val);
  }, []);

  const handleOk = useCallback(() => {
    onOk(editData);
    handleClosePopup();
  }, [editData, onOk, handleClosePopup]);

  useEffect(() => {}, [editData]);

  return (
    <>
      {
        <Button
          style={{ borderColor: "#fff", float: "right" }}
          onClick={handleShowPopup}
          {...buttonProps}
        >
          {btnText || "등록"}
        </Button>
      }
      {open && (
        <InputPopup
          onChange={handleChangeData}
          onCancel={handleClosePopup}
          onOk={handleOk}
          open={open}
          data={editData}
          playerInfo={playerInfo}
          modify={false}
          options={options}
          fileUpload={fileUpload}
        />
      )}
    </>
  );
}
