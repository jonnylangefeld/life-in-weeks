"use client"

import Year from "./year"

export interface Event {
  title?: string
  emoji?: string
  date: Date
  toDate?: Date
  color?: string
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
      color: "#c7d2fe",
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
      color: "#ddd6fe",
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
      color: "#e9d5ff",
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
      title: "Flew to New York for Internship",
      date: new Date("2013-06-14"),
      emoji: "🗽",
    },
    {
      title: "Graduated college",
      date: new Date("2014-09-30"),
      emoji: "🎓",
    },
    {
      title: "IBM",
      date: new Date("2014-10-01"),
      toDate: new Date("2017-04-01"),
      color: "#f5d0fe",
      emoji: "👨🏼‍💻",
    },
    {
      title: "Daimler",
      date: new Date("2017-04-03"),
      toDate: new Date("2017-07-31"),
      color: "#fbcfe8",
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
      color: "#fecdd3",
      emoji: "💼",
    },
    {
      title: "Moved to 555 E Washington Ave, Sunnyvale, CA",
      date: new Date("2017-10-13"),
      emoji: "🏠",
    },
    {
      title: "First word with Mckenzie",
      date: new Date("2017-11-21"),
      emoji: "💬",
    },
    {
      title: "First conversation with Mckenzie",
      date: new Date("2018-04-01"),
      emoji: "💘",
    },
    {
      title: "First date with Mckenzie",
      date: new Date("2018-04-28"),
      emoji: "🗓️",
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
      title: "Got engaged",
      date: new Date("2019-04-24"),
      emoji: "💍",
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
      title: "Cruise",
      date: new Date("2020-03-09"),
      toDate: new Date("2024-02-23"),
      color: "#fed7aa",
      emoji: "🛳️",
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
      title: "Found out we are pregnant with Leonie",
      date: new Date("2023-11-09"),
      emoji: "👶🏼",
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
        <div className="lg:min-w-6"></div>
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
