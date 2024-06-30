import Chart from "@/components/chart"
import Create from "@/components/create"
import { Button } from "@/components/ui/button"
import H1 from "@/components/ui/h1"

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-1">
        <H1 className="whitespace-nowrap">My Life in Weeks</H1>
        <Create />
      </div>
      <Chart />
    </>
  )
}
