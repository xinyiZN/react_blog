import React, { useState } from "react"
import { Button, Checkbox, Form, Input, Modal, Select, Tag, message,Upload  } from "antd"
import colorNames from 'color-name';
import { useAppDispatch } from "@/redux/hooks";
import type { UploadProps } from 'antd';
import { addTag, editTag } from "@/redux/slices/TagSlice";
import { tagFrom } from "@/types";
import { InboxOutlined } from "@ant-design/icons";
import { Category, TagType } from "@/types/article";

interface Props{
  title:string
  isModalOpen: boolean
  onCloseModal:()=>void
  article: {
    id: number;
    created_on: number;
    modified_on: number;
    tag_ids: string;
    tags: TagType [];
    category_id: number;
    category: Category;
    title: string;
    desc: string;
    content: string;
    created_by: string;
    modified_by: string;
    state: number;
    url: string;
  } | null
  onSuccess: () => void
}

//表单字段类型
type FieldType = {
  id?:number
  title?: string
  desc: string
  created_by: string
  category_id:number
  url: string
  tags:string[]
  state?:number
}

const { Dragger } = Upload;

const EditArticleModal: React.FC<Props> = ({ title, isModalOpen, article, onCloseModal, onSuccess }) => {
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

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    fileList: [],
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

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
            title: article?.title,
            id: article?.id,
            desc: article?.desc,
            category:article?.category.name,
            created_by: article?.created_by,
            state:article?.state
          }}
          clearOnDestroy
        >
          <Form.Item<FieldType>
            label="文章标题"
            name="title"
            rules={[{ required: true, message: "文章名称不能为空" }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item<FieldType>
            label="文章概述"
            name="desc"
            rules={[{ required: true, message: "文章概述不能为空" }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item<FieldType>
            label="类别"
            name="category_id"
            rules={[{ required: true, message: "请选择文章类别" }]}
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
            {article?.created_by ? (
              <Input disabled />
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item<FieldType>
            label="上传文章"
            name="desc"
            rules={[{ required: true, message: "文章介绍不能为空" }]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item<FieldType>
            label="状态"
            name="state"
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

export default EditArticleModal
