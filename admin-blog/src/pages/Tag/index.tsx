import React, { useState } from "react"
import { Button, Flex, Table } from "antd"

import type { TableColumnsType, TableProps } from "antd"

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"]

interface DataType {
  id: number
  name: string
  color: string
  state: string
  createdBy: string
}

const columns: TableColumnsType<DataType> = [
  { title: "名称", dataIndex: "name" },
  { title: "颜色", dataIndex: "color" },
  { title: "状态", dataIndex: "state" },
  { title: "创建人", dataIndex: "createdBy" },
  {
    title: "操作",
    dataIndex: "operation",
    render: () => (
      <Flex gap="small" wrap>
        <Button value="small" color="primary" variant="outlined">
          修改
        </Button>
        <Button value="small" color="danger" variant="outlined">
          删除
        </Button>
      </Flex>
    )
  }
]

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    id: i,
    name: `Edward King ${i}`,
    color: "orange",
    state: "禁用",
    createdBy: "我"
  })
)

const TagPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

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
        dataSource={dataSource}
      />
    </Flex>
  )
}

export default TagPage
