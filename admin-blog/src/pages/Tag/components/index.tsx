import React, { useState } from "react"
import { Button, Checkbox, Form, Input, Modal, Select, Tag } from "antd"
import colorNames from 'color-name';
import { useAppDispatch } from "@/redux/hooks";
import { addTag, editTag } from "@/redux/slices/TagSlice";
import { tagFrom } from "@/types";

interface Props{
  title:string
  isModalOpen: boolean
  onCloseModal:()=>void
  tag: {
    id: number
    name: string
    color: string
    created_by: string
    state:number
  } | null
  onSuccess: () => void
}

//表单字段类型
type FieldType = {
  id?:number
  name?: string
  color?: string
  created_by?: string
  state?:number
}




const EditTagModal: React.FC<Props> = ({ title, isModalOpen, tag, onCloseModal, onSuccess }) => {
  const dispatch=useAppDispatch()
  const [form] = Form.useForm();
  const handleClose = () => {
    onCloseModal();
  };

  const onFinish = (values: tagFrom ) => {
    console.log('提交的数据:', values);
    //根据id判断是已有的数据还是新增的数据
    if (values.id) {
      console.log("修改数据")
      dispatch(editTag(values)).then(() => {
        onSuccess();
      });
    } else {
      console.log("新增数据：", values);
      dispatch(addTag(values)).then(() => {
        onSuccess();
      });
    }
    handleClose();
  };

  const colorOptions = Object.keys(colorNames).map(color => (
    <Select.Option key={color} value={color}>
      <Tag color={color}>{color}</Tag> 
    </Select.Option>
  ));

  return (
    <>
      <Modal
        title={<h1 className="pl-1">{title}</h1>}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        className="flex justify-center items-center"
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="max-w-md"
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{
            name: tag?.name,
            color: tag?.color,
            id: tag?.id,
            created_by: tag?.created_by,
            state:tag?.state
          }}
          clearOnDestroy
        >
          <Form.Item<FieldType>
            label="标签名称"
            name="name"
            rules={[{ required: true, message: "标签名称不能为空" }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item<FieldType>
            label="颜色"
            name="color"
            rules={[{ required: true, message: "请选择一个标签颜色" }]}
          >
            <Select>
            {colorOptions}
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="创建人"
            name="created_by"
            rules={[{ required: true, message: "创建人不能为空" }]}
          >
            {tag?.created_by ? (
              <Input disabled />
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item<FieldType>
            label="状态"
            name="state"
            rules={[{ required: true, message: "请选择是否启用标签" }]}
          >
            <Select>
              <Select.Option value={0}>禁止</Select.Option>
              <Select.Option value={1}>启用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            name="id"
            noStyle
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item<FieldType>
            name="state"
            noStyle
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label={null} className="text-center">
            <Button type="primary" htmlType="submit" className="w-1/2">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditTagModal
