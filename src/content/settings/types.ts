export type DataRow = {
  title: string
  showRevealIcon?: boolean
  isVersion?: boolean
}

export type SectionedData = {
  title: string
  data: DataRow[]
}