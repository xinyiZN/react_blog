import React, { useEffect, useState } from "react"
import { Button, Flex, Popconfirm, Table, Tag } from "antd"

import type { TableColumnsType, TableProps } from "antd"
import { useAppDispatch } from "@/redux/hooks"
import { getAllTags, deleteTag } from "@/redux/slices/TagSlice"
import EditTagModal from "./components"

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key
  id:number
  name: string
  color: string
  state: number
  created_by: string
}

const TagPage: React.FC = () => {
  
  const columns: TableColumnsType<DataType> = [
    {
      title: "名称",
      dataIndex: "name",
      render: (text, record) => <Tag color={record.color}>{text}</Tag>
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (_, record) => (
          <p>{record.state ? "正在使用" : "禁用中"}</p>
      )
    },
    { title: "创建人", dataIndex: "created_by" },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => (
        <Flex gap="small" wrap>
          <Button
            value="small"
            color="primary"
            variant="outlined"
            onClick={() => handleModalTag("edit",record.id,record.name,record.color,record.created_by,record.state)}
          >
            修改
          </Button>
          <Button
            value="small"
            color="danger"
            variant="outlined"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Flex>
      )
    }
  ]
  const dispatch = useAppDispatch()
  const [tagSource, setTagSource] = useState<DataType[]>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false)
 // 表格数据
 useEffect(() => {
  const getTagSource = async () => {
    const data = await dispatch(getAllTags());
    setTagSource(data.payload.map((item: DataType) => ({
      ...item
    })));
  };
  getTagSource();
}, [dispatch]);



  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  

  const hasSelected = selectedRowKeys.length > 0
 

  //模态框控制
  //模态框标题
  const [title,setTitle]=useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<{ id: number; name: string; color: string;
    created_by: string;state:number}|null>(null)
  //模态关闭操作
  const handleModalClose = async() => {
    setIsModalOpen(false)
    setCurrentTag(null) // 清空当前标签
  }
  const handleModalTag = (type: "edit" | "add", id?: number, name?: string, color?: string,
    created_by?: string,state?:number) => {
    console.log("编辑下",id,name,color,created_by)
    if (type === "edit") {
      if (id === undefined || name === undefined || color === undefined || created_by===undefined ||state===undefined ) {
        throw new Error("编辑模式下，id、name 、color、created_by 是必需的");
      }
      setTitle("修改标签");
      setCurrentTag({ id, name, color,created_by,state });
    } else {
      setTitle("新增标签");
    }
    setIsModalOpen(true);
  }

  const handleDelete = async (id: number) => {
    console.log("Deleting tag with id:", id)
    // 添加异步 dispatch 操作
    await dispatch(deleteTag(id))
    // 处理删除后重新获取标签数据
    const data = await dispatch(getAllTags())
    setTagSource(data.payload.map((item: { id: number; name: string; color: string; state: number; created_by: string }) => ({
      key: item.id, // 添加 key 属性
      id: item.id,
      name: item.name,
      color: item.color,
      state: item.state === 1 ? "正在使用" : "禁用中", // 根据 state 转换为字符串
      created_by: item.created_by
    })))
  }

  const handleDataUpdate = async () => {
    const data = await dispatch(getAllTags());
    setTagSource(data.payload.map((item: DataType) => ({
      ...item
    })));
  };

  return (
    <>
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button
          type="primary"
          onClick={() => handleModalTag("add")} // 打开新增标签模态框
        >
          新增标签
        </Button>
        <Button
            color="danger"
            onClick={start}
            disabled={!hasSelected} loading={loading}
        >
          一键删除
          </Button>
      </Flex>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tagSource}
      />
    </Flex>
      <EditTagModal 
        title={title}
        isModalOpen={isModalOpen} 
        onCloseModal={handleModalClose}
        tag={currentTag}
        onSuccess={handleDataUpdate}
    />
    </>

  )
}

export default TagPage
