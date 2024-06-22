import { Data } from "./chart"
import Week from "./week"

interface Props {
  year: number
  data: Data
}

export default function Year({ year, data }: Props) {
  return (
    <div className="flex flex-row gap-3">
      <div className="relative flex min-w-3 flex-grow-0 lg:min-w-6">
        <div className="absolute bottom-0 right-0 flex h-full items-end text-[.8cqmax] leading-none sm:text-[.9cqmax] md:text-[1cqmax]">
          {year}
        </div>
      </div>
      <div className="flex flex-grow flex-row contain-inline-size">
        {Array.from({ length: 52 }).map((_, index) => (
          <Week key={index} year={year} week={index + 1} data={data} />
        ))}
      </div>
    </div>
  )
}
