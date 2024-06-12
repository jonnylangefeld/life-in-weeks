"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gauge, Gear, ProjectorScreenChart, UserCircle } from "@phosphor-icons/react/dist/ssr"
import { Icon } from "@phosphor-icons/react"

export default function Nav() {
  const pathname = usePathname()
  return (
    <>
      <Link className="hidden font-bold md:block" href="/">
        <span>Acme Inc</span>
      </Link>
      <ul className="space-y-2">
        <Li icon={Gauge} text="Dashboard" pathname={pathname} />
        <Li icon={ProjectorScreenChart} text="Projects" pathname={pathname} />
        <ul className="mt-auto space-y-2">
          <Li icon={Gear} text="Settings" pathname={pathname} />
        </ul>
      </ul>
      <ul className="mt-auto space-y-2">
        <Li icon={UserCircle} text="Account" pathname={pathname} />
      </ul>
    </>
  )
}

interface LiProps {
  icon: Icon
  text: string
  pathname: string | null
}

function Li({ icon: Icon, text, pathname }: LiProps) {
  const path = encodeURIComponent(text).toLowerCase()
  const selected = pathname?.startsWith("/" + path)
  return (
    <Link
      className={
        "flex flex-nowrap gap-x-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground" +
        (selected ? " bg-accent text-accent-foreground" : "")
      }
      href={path}
    >
      <Icon size={24} className="min-w-min"></Icon>
      <span className="hidden overflow-hidden truncate md:block">{text}</span>
    </Link>
  )
}
