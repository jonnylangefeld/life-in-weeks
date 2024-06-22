"use client"

import Year from "./year"

export interface Event {
  title?: string
  emoji?: string
  date: Date
  toDate?: Date
  color?:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
}

export interface Data {
  birthDate: Date
  events: Event[]
}

const data: Data = {
  birthDate: new Date("1991-07-22"),
  // birthDate: new Date("1988-12-06"),
  // birthDate: new Date("1955-12-09"),
  // birthDate: new Date("1963-03-23"),
  events: [
    {
      title: "Born",
      date: new Date("1991-07-22"),
      emoji: "👶🏼",
    },
    {
      title: "Elementary school",
      date: new Date("1998-09-15"),
      toDate: new Date("2002-7-31"),
      color: "indigo",
      emoji: "🍎",
    },
    {
      title: "Moved to Lechallee 49B, Bobingen, Germany",
      date: new Date("1998-12-19"),
      emoji: "🏠",
    },
    {
      title: "Gymnasium",
      date: new Date("2002-09-17"),
      toDate: new Date("2011-03-06"),
      color: "violet",
      emoji: "🏫",
    },
    {
      title: "Got baptized",
      date: new Date("2007-07-01"),
      emoji: "🕊️",
    },
    {
      title: "First day of driving school",
      date: new Date("2008-03-25"),
      emoji: "🚗",
    },
    {
      title: "Graduated Gymnasium",
      date: new Date("2011-03-06"),
      emoji: "🎒",
    },
    {
      title: "Moved to Augustenstraße 37, Stuttgart, Germany",
      date: new Date("2011-09-24"),
      emoji: "🏠",
    },
    {
      title: "College",
      date: new Date("2011-10-10"),
      toDate: new Date("2014-09-30"),
      color: "purple",
      emoji: "👨🏼‍🎓",
    },
    {
      title: "First flight of my life",
      date: new Date("2012-03-09"),
      emoji: "✈️",
    },
    {
      title: "Moved to Trüffelweg 16, Stuttgart, Germany",
      date: new Date("2012-07-01"),
      emoji: "🏠",
    },
    {
      title: "Internship in New York",
      date: new Date("2013-06-14"),
      toDate: new Date("2013-08-14"),
      color: "orange",
      emoji: "🗽",
    },
    {
      title: "Graduated college",
      date: new Date("2014-09-30"),
      emoji: "🎓",
    },
    {
      title: "Greece Trip",
      date: new Date("2014-08-18"),
      toDate: new Date("2014-08-24"),
      color: "amber",
      emoji: "🇬🇷",
    },
    {
      title: "IBM",
      date: new Date("2014-10-01"),
      toDate: new Date("2017-04-01"),
      color: "fuchsia",
      emoji: "👨🏼‍💻",
    },
    {
      title: "London Trip",
      date: new Date("2015-03-16"),
      toDate: new Date("2015-03-19"),
      color: "amber",
      emoji: "🇬🇧",
    },
    {
      title: "French Riviera bike trip 🚴🏼‍♂️",
      date: new Date("2015-05-15"),
      toDate: new Date("2015-05-24"),
      color: "amber",
      emoji: "🇫🇷",
    },
    {
      title: "Arrived in Spain on bike",
      date: new Date("2015-05-20"),
      emoji: "🇪🇸",
    },
    {
      title: "Italy family trip",
      date: new Date("2015-08-16"),
      toDate: new Date("2015-08-20"),
      color: "amber",
      emoji: "🇮🇹",
    },
    {
      title: "Sweden trip",
      date: new Date("2016-02-14"),
      toDate: new Date("2016-02-18"),
      color: "yellow",
      emoji: "🇸🇪",
    },
    {
      title: "Sweden trip",
      date: new Date("2016-03-18"),
      toDate: new Date("2016-03-23"),
      color: "yellow",
      emoji: "🇸🇪",
    },
    {
      title: "Sweden trip",
      date: new Date("2016-04-03"),
      toDate: new Date("2016-04-07"),
      color: "yellow",
      emoji: "🇸🇪",
    },
    {
      title: "Sweden trip",
      date: new Date("2016-04-17"),
      toDate: new Date("2016-04-21"),
      color: "yellow",
      emoji: "🇸🇪",
    },
    {
      title: "Sweden trip",
      date: new Date("2016-04-28"),
      toDate: new Date("2016-05-08"),
      color: "yellow",
      emoji: "🇸🇪",
    },
    {
      title: "Portugal surf trip with Moritz",
      date: new Date("2016-07-12"),
      toDate: new Date("2016-07-19"),
      color: "amber",
      emoji: "🇵🇹",
    },
    {
      title: "Israel trip",
      date: new Date("2016-11-05"),
      toDate: new Date("2016-11-19"),
      color: "amber",
      emoji: "🇮🇱",
    },
    {
      title: "Tesla Norway road trip",
      date: new Date("2016-12-25"),
      toDate: new Date("2017-01-02"),
      color: "amber",
      emoji: "🇳🇴",
    },
    {
      title: "Cuba trip",
      date: new Date("2017-01-14"),
      toDate: new Date("2017-01-28"),
      color: "yellow",
      emoji: "🇨🇺",
    },
    {
      title: "Daimler",
      date: new Date("2017-04-03"),
      toDate: new Date("2017-07-31"),
      color: "pink",
      emoji: "⭐️",
    },
    {
      title: "Flew to the USA to stay",
      date: new Date("2017-08-29"),
      emoji: "🇺🇸",
    },
    {
      title: "MBRDNA",
      date: new Date("2017-09-05"),
      toDate: new Date("2020-03-06"),
      color: "red",
      emoji: "💼",
    },
    {
      title: "Germany trip",
      date: new Date("2017-10-04"),
      toDate: new Date("2017-10-12"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "Moved to 555 E Washington Ave, Sunnyvale, CA",
      date: new Date("2017-10-13"),
      emoji: "🏠",
    },
    {
      title: "China trip",
      date: new Date("2017-10-27"),
      toDate: new Date("2017-11-02"),
      color: "emerald",
      emoji: "🇨🇳",
    },
    {
      title: "Germany trip",
      date: new Date("2017-11-08"),
      toDate: new Date("2017-11-17"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "First word with Mckenzie",
      date: new Date("2017-11-21"),
      emoji: "💬",
    },
    {
      title: "Germany trip",
      date: new Date("2018-01-16"),
      toDate: new Date("2018-01-23"),
      color: "emerald",
      emoji: "🇩🇪",
    },
    {
      title: "Germany trip",
      date: new Date("2018-02-16"),
      toDate: new Date("2018-02-23"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "China trip",
      date: new Date("2018-03-05"),
      toDate: new Date("2018-03-09"),
      color: "emerald",
      emoji: "🇨🇳",
    },
    {
      title: "China trip",
      date: new Date("2018-04-16"),
      toDate: new Date("2018-04-20"),
      color: "green",
      emoji: "🇨🇳",
    },
    {
      title: "Germany trip",
      date: new Date("2018-04-30"),
      toDate: new Date("2018-05-09"),
      color: "emerald",
      emoji: "🇩🇪",
    },
    {
      title: "First date with Mckenzie",
      date: new Date("2018-04-28"),
      emoji: "🗓️",
    },
    {
      title: "Japan trip",
      date: new Date("2018-05-18"),
      toDate: new Date("2018-05-25"),
      color: "green",
      emoji: "🇯🇵",
    },
    {
      title: "First conversation with Mckenzie",
      date: new Date("2018-04-01"),
      emoji: "💘",
    },
    {
      title: "Intensify the relationship",
      date: new Date("2018-06-01"),
      emoji: "👫🏼",
    },
    {
      title: "Asked Mckenzie to be my girlfriend",
      date: new Date("2018-06-05"),
      emoji: "❤️‍🔥",
    },
    {
      title: "Germany trip",
      date: new Date("2018-06-05"),
      toDate: new Date("2018-06-12"),
      color: "emerald",
      emoji: "🇩🇪",
    },
    {
      title: "First Germany trip with Mckenzie",
      date: new Date("2018-10-04"),
      toDate: new Date("2018-10-28"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "Japan trip",
      date: new Date("2018-12-03"),
      toDate: new Date("2018-12-06"),
      color: "emerald",
      emoji: "🇯🇵",
    },
    {
      title: "Germany trip",
      date: new Date("2019-03-04"),
      toDate: new Date("2019-03-15"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "Got engaged",
      date: new Date("2019-04-24"),
      emoji: "💍",
    },
    {
      title: "Germany trip",
      date: new Date("2019-07-12"),
      toDate: new Date("2019-07-19"),
      color: "emerald",
      emoji: "🇩🇪",
    },
    {
      title: "Moved to 5450 Kirkwood Dr, Concord, CA",
      date: new Date("2019-08-18"),
      emoji: "🚚",
    },
    {
      title: "Married Mckenzie",
      date: new Date("2019-08-24"),
      emoji: "💒",
    },
    {
      title: "Germany trip",
      date: new Date("2019-12-17"),
      toDate: new Date("2020-01-02"),
      color: "green",
      emoji: "🇩🇪",
    },
    {
      title: "Maledives for honeymoon 🍯",
      date: new Date("2020-01-02"),
      toDate: new Date("2020-01-11"),
      color: "emerald",
      emoji: "🇲🇻",
    },
    {
      title: "Singapore for honeymoon 🍯",
      date: new Date("2020-01-11"),
      toDate: new Date("2020-01-15"),
      color: "green",
      emoji: "🇸🇬",
    },
    {
      title: "Bali for honeymoon 🍯",
      date: new Date("2020-01-15"),
      toDate: new Date("2020-01-30"),
      color: "emerald",
      emoji: "🇮🇩",
    },
    {
      title: "Cruise",
      date: new Date("2020-03-09"),
      toDate: new Date("2024-02-23"),
      color: "orange",
      emoji: "🛳️",
    },
    {
      title: "Germany trip",
      date: new Date("2020-12-02"),
      toDate: new Date("2020-12-15"),
      color: "sky",
      emoji: "🇩🇪",
    },
    {
      title: "Mexico for the Konkel wedding",
      date: new Date("2021-08-07"),
      toDate: new Date("2021-08-14"),
      color: "blue",
      emoji: "🇲🇽",
    },
    {
      title: "Germany trip",
      date: new Date("2021-09-05"),
      toDate: new Date("2021-09-16"),
      color: "sky",
      emoji: "🇩🇪",
    },
    {
      title: "Moved into 2228 Mulholland Dr, Lathrop, CA",
      date: new Date("2022-01-14"),
      emoji: "🏡",
    },
    {
      title: "Lucy was born",
      date: new Date("2022-01-27"),
      emoji: "🐶",
    },
    {
      title: "We adopted Lucy",
      date: new Date("2022-03-28"),
      emoji: "🐶",
    },
    {
      title: "Canada for Kubecon in Detroit",
      date: new Date("2022-10-25"),
      toDate: new Date("2022-10-28"),
      color: "blue",
      emoji: "🇨🇦",
    },
    {
      title: "Mexico for the Yawili wedding",
      date: new Date("2023-02-14"),
      toDate: new Date("2023-02-14"),
      color: "sky",
      emoji: "🇲🇽",
    },
    {
      title: "Found out we are pregnant with Leonie",
      date: new Date("2023-11-09"),
      emoji: "👶🏼",
    },
    {
      title: "Dominican Republic for the Marrow wedding",
      date: new Date("2023-11-30"),
      toDate: new Date("2023-12-04"),
      color: "blue",
      emoji: "🇩🇴",
    },
    {
      title: "Germany trip",
      date: new Date("2023-12-15"),
      toDate: new Date("2024-01-08"),
      color: "sky",
      emoji: "🇩🇪",
    },
    {
      title: "First day at Snowflake",
      date: new Date("2024-02-26"),
      emoji: "❄️",
    },
    {
      title: "Leonie was born",
      date: new Date("2024-06-03"),
      emoji: "👶🏼",
    },
  ],
}

export default function Chart() {
  const age = new Date().getFullYear() - data.birthDate.getFullYear() - 1
  return (
    <div className="grid h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <div />
      <div className="m-1 flex flex-row gap-3">
        <div className="min-w-3 lg:min-w-5"></div>
        <div>Weeks →</div>
      </div>
      <div className="flex flex-row">
        <div className="m-1 leading-none [writing-mode:vertical-lr]">Age →</div>
      </div>
      <div className="flex flex-col">
        {Array.from({ length: Math.max(79, age + 20) }).map((_, index) => (
          <Year key={index} year={index} data={data} />
        ))}
      </div>
    </div>
  )
}
