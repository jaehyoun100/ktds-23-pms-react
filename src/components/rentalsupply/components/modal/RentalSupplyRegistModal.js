import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Upload,
  message,
} from "antd";
import {
  loadRentalSupplyCategory,
  registerRentalSupply,
} from "../../../../http/rentalSupplyHttp";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const RentalSupplyRegistModal = ({ visible, onClose, onRegister }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputFields, setInputFields] = useState({
    name: "",
    category: "",
    customCategory: "",
    price: "",
    stock: "",
    image: null,
    detail: "",
  });

  const { token } = useSelector((state) => state.tokenInfo);
  const [form] = Form.useForm();

  const memoizedLoadRentalSupplyCategory = useCallback(
    loadRentalSupplyCategory,
    []
  );
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoadRentalSupplyCategory({ ...memoizedToken });
      const categories = json.rentalSupplyList.map((item) => item.rsplCtgr);
      setCategoryList(categories);
    };

    fetchingData();
  }, [memoizedLoadRentalSupplyCategory, memoizedToken]);

  const onFinish = async (values) => {
    const { name, category, customCategory, price, stock, image, detail } =
      values;
    const finalCategory = category === "직접 입력" ? customCategory : category;
    const json = await registerRentalSupply(
      token,
      name,
      finalCategory,
      price,
      stock,
      image?.file,
      detail
    );

    if (json.errors) {
      json.errors.forEach((error) => {
        message.error(error);
      });
    } else if (json.body) {
      message.success("대여품 등록에 대한 결재 요청 완료!");
      onRegister();
      onClose();
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ customCategory: "" });
  };

  return (
    <Modal
      title="대여품 등록"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={inputFields}
      >
        <Form.Item
          name="category"
          label="카테고리"
          rules={[{ required: true, message: "카테고리를 선택하세요" }]}
        >
          <Select onChange={handleCategoryChange}>
            <Select.Option value="">카테고리를 선택하세요</Select.Option>
            {categoryList.map((category, i) => (
              <Select.Option key={i} value={category}>
                {category}
              </Select.Option>
            ))}
            <Select.Option value="직접 입력">직접 입력</Select.Option>
          </Select>
        </Form.Item>
        {selectedCategory === "직접 입력" && (
          <Form.Item
            name="customCategory"
            label="카테고리 직접 입력"
            rules={[{ required: true, message: "카테고리를 입력하세요" }]}
          >
            <Input />
          </Form.Item>
        )}
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
        <Form.Item name="image" label="이미지" valuePropName="file">
          <Upload name="image" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="detail" label="제품 설명">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClose}>
            취소
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RentalSupplyRegistModal;
