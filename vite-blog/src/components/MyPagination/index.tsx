import React from "react"
import { Pagination } from "antd"

interface MyPaginationProps {
  total: number // 总条目数
  current: number // 当前页码
  pageSize: number // 每页显示条数
  onChange: (page: number, pageSize: number) => void // 页码改变的回调
}

const MyPagination: React.FC<MyPaginationProps> = (props) => {
  return (
    <div>
      <Pagination
        align="center"
        total={props.total}
        current={props.current}
        pageSize={props.pageSize}
        onChange={props.onChange}
      />
    </div>
  )
}

export default MyPagination
