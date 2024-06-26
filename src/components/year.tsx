import { Data } from "./chart"
import Tick from "./tick"
import Week from "./week"

interface Props {
  year: number
  data: Data
}

export default function Year({ year, data }: Props) {
  return (
    <div className="flex flex-grow flex-row contain-inline-size">
      <Tick key={year} t={year} vertical />
      {Array.from({ length: 52 }).map((_, index) => (
        <Week key={index} year={year} week={index + 1} data={data} />
      ))}
    </div>
  )
}
