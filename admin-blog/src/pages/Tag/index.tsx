import React, { useEffect, useState } from "react"
import { Button, Flex, Popconfirm, Table, Tag } from "antd"

import type { TableColumnsType, TableProps } from "antd"
import { useAppDispatch } from "@/redux/hooks"
import { getAllTags, editTag, deleteTag } from "@/redux/slices/TagSlice"

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"]

interface DataType {
  id: number
  name: string
  color: string
  state: string
  created_by: string
}

const TagPage: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "名称", dataIndex: "name",
      render: (text, record) => (
        <Tag color={record.color}>{text}</Tag>
      )
     },
    {
      title: "状态", dataIndex: "state", 
      render: (_, record) => (
        <Popconfirm title={record.state ? "确认关闭使用吗？" : "确认开启使用吗？"} onConfirm={() => handleState(record.id)}>
          <a>{record.state ? "正在使用" : "禁用中"}</a>
      </Popconfirm>)
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
            onClick={() => handleEdit(record.id)}
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
  const [tagSource,setTagSource]=useState<DataType[]>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  //表格数据
  useEffect(() => {
    const getTagSource = async () => {
      const data = await dispatch(getAllTags())
      console.log("data.payload:",data.payload.lists)
      // 处理获取到的数据，例如更新状态
      setTagSource(data.payload.lists)
    }
    getTagSource()
  }, [dispatch])

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0


  const handleState = (id: number) => {
    //若当前标签有文章使用则不可以关闭
    console.log("id:", id)
    // const newData = tagSource?.filter((item) => item.id !== id);
    // setDataSource(newData);
  };

  const handleEdit = async (id: number) => {
    console.log("Editing tag with id:", id);
    // 添加异步 dispatch 操作
    // await dispatch(editTag(id)); // 假设 editTag 是你定义的异步操作
    // 处理编辑后的逻辑，例如重新获取标签数据
    // const data = await dispatch(getAllTags());
    // setTagSource(data.payload.lists);
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting tag with id:", id);
    // 添加异步 dispatch 操作
    await dispatch(deleteTag(id));
    // 处理删除后的逻辑，例如重新获取标签数据
    const data = await dispatch(getAllTags());
    setTagSource(data.payload.lists);
  };

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tagSource}
      />
    </Flex>
  )
}

export default TagPage
