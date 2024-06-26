import { Data } from "./chart"
import Tick from "./tick"
import Week from "./week"

interface Props {
  year: number
  data: Data
}

export default function Year({ year, data }: Props) {
  return (
    <div className="flex flex-row gap-1 sm:gap-2">
      <div className="relative flex min-w-3 flex-grow-0 lg:min-w-5">
        {/* <div
          className={`absolute h-full w-full items-end text-[.8cqmax] leading-none sm:text-[.9cqmax] md:text-[1cqmax] xl:text-sm ${(year + 1) % 5 == 0 ? "font-bold" : "text-muted-foreground"}`}
        >
          {year}
        </div> */}
        <div className="absolute h-full w-full">
          <Tick key={year} t={year} vertical />
        </div>
        {/* <Tick key={year} t={year} vertical /> */}
      </div>
      {/* <div className="flex aspect-square w-6 min-w-[2px] flex-grow-0">
        <Tick key={year} t={year} vertical />
      </div> */}
      <div className="flex flex-grow flex-row contain-inline-size">
        {Array.from({ length: 52 }).map((_, index) => (
          <Week key={index} year={year} week={index + 1} data={data} />
        ))}
      </div>
    </div>
  )
}
