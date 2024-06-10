import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import InputPopup from "./InputPopup";

export default function ModifyBtn({
  data,
  options,
  onOk,
  btnText,
  buttonProps,
}) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const handleShowPopup = useCallback(() => {
    setEditData(data);
    setOpen(true);
  }, [data]);

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleChangeData = useCallback((val) => {
    setEditData(val);
  }, []);

  const handleOk = useCallback(() => {
    onOk(editData);
    handleClosePopup();
  }, [editData, onOk]);

  useEffect(() => {
    if (data) setEditData(data);
  }, [data]);

  return (
    <>
      <Button
        style={{ borderColor: "#fff" }}
        onClick={handleShowPopup}
        {...buttonProps}
      >
        {btnText || "수정"}
      </Button>
      {open && (
        <InputPopup
          onChange={handleChangeData}
          onCancel={handleClosePopup}
          onOk={handleOk}
          open={open}
          data={editData}
          options={options}
          modify
        />
      )}
    </>
  );
}
