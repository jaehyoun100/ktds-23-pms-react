import React, { useEffect, useRef, useState } from "react";
import {
  modifySupply,
  loadSupplyImage,
  loadSupply,
} from "../../../../http/supplyHttp";
import { useSelector } from "react-redux";
import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SupplyModificationModal = ({
  visible,
  onClose,
  selectedSplId,
  onModify,
}) => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [supplyBody, setSupplyBody] = useState(null);

  const { token } = useSelector((state) => state.tokenInfo);

  useEffect(() => {
    if (visible && selectedSplId) {
      const fetchSupply = async () => {
        const json = await loadSupply({
          selectedSplId,
          token,
          needReload: 0,
        });
        setSupplyBody(json.body);

        if (json.body.splImg) {
          const imageData = await loadSupplyImage({
            splImg: json.body.splImg,
            token,
          });
          setImagePreview(imageData);
        }
        form.setFieldsValue({
          category: json.body.splCtgr,
          name: json.body.splName,
          price: json.body.splPrice,
          stock: json.body.invQty,
          detail: json.body.splDtl,
        });
      };

      fetchSupply();
    }
  }, [selectedSplId, token, visible, form]);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImagePreview(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const onFinish = async (values) => {
    const { name, category, price, stock, image, detail } = values;
    const imageFile = image?.file.originFileObj;

    const json = await modifySupply(
      token,
      selectedSplId,
      name,
      category,
      price,
      stock,
      imageFile,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      onModify();
      onClose();
    }
  };

  return (
    <Modal
      title="소모품 수정"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          category: supplyBody?.splCtgr,
          name: supplyBody?.splName,
          price: supplyBody?.splPrice,
          stock: supplyBody?.invQty,
          detail: supplyBody?.splDtl,
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

export default SupplyModificationModal;
