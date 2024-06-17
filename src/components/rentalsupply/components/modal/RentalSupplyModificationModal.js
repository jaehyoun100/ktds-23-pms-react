import React, { useEffect, useState } from "react";
import {
  modifyRentalSupply,
  loadRentalSupplyImage,
  loadRentalSupply,
} from "../../../../http/rentalSupplyHttp";
import { useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const RentalSupplyModificationModal = ({
  visible,
  onClose,
  selectedRsplId,
  onModify,
}) => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [rentalSupplyBody, setRentalSupplyBody] = useState(null);

  const { token } = useSelector((state) => state.tokenInfo);

  useEffect(() => {
    if (visible && selectedRsplId) {
      const fetchRentalSupply = async () => {
        const json = await loadRentalSupply({
          selectedRsplId,
          token,
          needReload: 0,
        });
        setRentalSupplyBody(json.body);

        if (json.body.rsplImg) {
          const imageData = await loadRentalSupplyImage({
            rsplImg: json.body.rsplImg,
            token,
          });
          setImagePreview(imageData);
        }
        form.setFieldsValue({
          category: json.body.rsplCtgr,
          name: json.body.rsplName,
          price: json.body.rsplPrice,
          stock: json.body.invQty,
          detail: json.body.rsplDtl,
        });
      };

      fetchRentalSupply();
    }
  }, [selectedRsplId, token, visible, form]);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImagePreview(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const onFinish = async (values) => {
    const { name, category, price, stock, image, detail } = values;
    const imageFile = image?.file.originFileObj;

    const json = await modifyRentalSupply(
      token,
      selectedRsplId,
      name,
      category,
      price,
      stock,
      imageFile,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        message.error(error);
      });
    } else if (json.body) {
      message.success("대여품 수정 성공!");
      onModify();
      onClose();
    }
  };

  return (
    <Modal
      title="대여품 수정"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          category: rentalSupplyBody?.rsplCtgr,
          name: rentalSupplyBody?.rsplName,
          price: rentalSupplyBody?.rsplPrice,
          stock: rentalSupplyBody?.invQty,
          detail: rentalSupplyBody?.rsplDtl,
        }}
      >
        <Form.Item
          name="category"
          label="카테고리"
          rules={[{ required: true, message: "카테고리를 입력하세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="제품 명"
          rules={[{ required: true, message: "제품 명을 입력하세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="제품 가격"
          rules={[{ required: true, message: "제품 가격을 입력하세요" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="stock"
          label="재고"
          rules={[{ required: true, message: "재고를 입력하세요" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="image" label="이미지">
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="미리보기"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            </div>
          )}
        </Form.Item>
        <Form.Item
          name="detail"
          label="제품 설명"
          rules={[{ required: true, message: "제품 설명을 입력하세요" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClose}>
            취소
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RentalSupplyModificationModal;
