import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Rate,
  Select,
} from "antd";
import { produce } from "immer";
// import { Scrollbar } from "react-scrollbars-custom";
import Spacer from "../Spacer";
import dayjs from "dayjs";

const { TextArea, Password } = Input;

const now = dayjs();

export default function InputPopup({
  modalWidth,
  data,
  options,
  onChange,
  playerInfo,
  modify,
  onOk,
  onCancel,
  del,
  confirmText,
  confirm,
  fileUpload,
  ...props
}) {
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(data);
  const [height, setHeight] = useState(0);
  const formRef = useRef(null);
  // const scrollbarRef = useRef(null); // Scrollbar에 elementRef로 사용할 ref

  const text = useMemo(() => {
    let msg;
    if (modify) {
      msg = "수정";
    } else if (del) {
      msg = "삭제";
    } else if (confirm) {
      msg = "확인";
    } else {
      msg = "등록";
    }
    return msg;
  }, [del, modify, confirm]);

  const message = useMemo(() => {
    let msg;
    if (modify) {
      msg = "수정하시겠습니까?";
    } else if (del) {
      msg = "삭제하시겠습니까?";
    } else if (confirm) {
      msg = confirmText;
    } else {
      msg = "등록하시겠습니까?";
    }

    return msg;
  }, [del, modify, confirm, confirmText]);

  const handleConfirmChanges = useCallback(() => {
    Modal.confirm({
      centered: true,
      title: "확인",
      content: message,
      onOk,
    });
  }, [onOk, message]);

  const handleInputChange = useCallback(
    (key) => (e) => {
      const value = e.target ? e.target.value : e;
      setEditData(
        produce((draft) => {
          draft[key] = value;
        })
      );
    },
    []
  );

  const handleDateChange = useCallback(
    (key) => (_, dateStr) => {
      setEditData(
        produce((draft) => {
          draft[key] = dateStr;
        })
      );
    },
    []
  );

  const renderInput = useCallback(
    ({ type, dataIndex, option, readOnly }) => {
      switch (type) {
        case "textarea":
          return (
            <TextArea
              value={editData[dataIndex]}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
        case "date":
          return (
            <DatePicker
              value={editData[dataIndex]}
              onChange={handleDateChange(dataIndex)}
              disabled={readOnly}
              format="YYYY-MM-DD"
            />
          );
        case "number":
          return (
            <InputNumber
              max={option?.max ?? Number.MAX_SAFE_INTEGER}
              min={option?.min ?? 0}
              value={editData[dataIndex]}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
        case "password":
          return (
            <Password
              value={editData[dataIndex]}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
        case "select":
          return (
            <Select
              value={editData[dataIndex]}
              onChange={handleInputChange(dataIndex)}
              options={option}
              disabled={readOnly || del}
            />
          );
        case "radio":
          return (
            <Radio.Group
              value={editData[dataIndex]}
              initialValues={option[0].value}
              onChange={handleInputChange(dataIndex)}
              options={option}
              disabled={readOnly}
            />
          );
        case "checkbox":
          return (
            <Checkbox.Group
              value={editData[dataIndex]}
              options={option}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
        case "star":
          return (
            <Rate
              value={editData[dataIndex]}
              count={option?.count ?? 3}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
        default:
          return (
            <Input
              value={editData[dataIndex]}
              onChange={handleInputChange(dataIndex)}
              disabled={readOnly}
            />
          );
      }
    },
    [editData, handleInputChange, del]
  );

  const handleScrollToField = useCallback(
    ({ errorFields }) => {
      const target = errorFields[0];
      form.scrollToField(target.name);
    },
    [form]
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(formRef.current?.offsetHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (onChange) onChange(editData);
  }, [editData, onChange]);

  return (
    <Modal
      title={text}
      width={modalWidth}
      styles={{ body: {}, footer: { marginTop: 40 } }}
      onOk={() => form.submit()}
      onCancel={onCancel}
      centered
      footer={[
        <Button onClick={() => form.submit()} type="register" key="okButton">
          확인
        </Button>,
        <Spacer key="forMargin" margin={5} />,
        <Button onClick={onCancel} key="cancelButton">
          닫기
        </Button>,
      ]}
      {...props}
    >
      <div>
        {/* <Scrollbar style={{ height: height + 30, maxHeight: 700 }}> */}
        <div>
          {confirmText && confirmText}
          <Form
            // 폼의 초기 값 설정
            initialValues={editData}
            onFinish={handleConfirmChanges}
            form={form}
            labelCol={{ span: del ? 4 : 8 }}
            labelAlign="left"
            wrapperCol={{ span: del ? 20 : 16 }}
            colon={false}
            onFinishFailed={handleScrollToField}
          >
            {options.map(({ type, dataIndex, title, option, required, readOnly }) => (
              <Form.Item
                label={title}
                name={dataIndex}
                key={dataIndex}
                rules={[
                  {
                    required,
                    message: `${title}을(를) 입력해주세요.`,
                  },
                ]}
              >
                {renderInput({
                  type,
                  dataIndex,
                  title,
                  option,
                  required,
                  readOnly,
                })}
              </Form.Item>
            ))}
          </Form>
        </div>
        {/* </Scrollbar> */}
      </div>
    </Modal>
  );
}
