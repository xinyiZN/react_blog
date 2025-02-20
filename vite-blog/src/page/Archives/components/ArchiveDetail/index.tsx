import { Article } from "@/types"

import ArchiveTimeLine from "@/components/ArchiveTimeLine"
interface ArchiveDetailComponentProps {
  articles?: Article[]
  name?: string
}

function ArchivesTimeLine({ articles, name }: ArchiveDetailComponentProps) {
  return <ArchiveTimeLine articles={articles} name={name} />
}

export default ArchivesTimeLine
