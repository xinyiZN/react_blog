interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[]
}

interface tagFrom {
  id: number
  name: string
  color: string
  state?: number
  created_by: string
}


export type {
  MenuItem,
  tagFrom
}

