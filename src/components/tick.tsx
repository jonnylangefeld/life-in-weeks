export default function Tick({ t, vertical }: { t: number; vertical?: boolean }) {
  const emphasize = t % 5 == 0
  return (
    <div className={`sticky ${vertical ? "left-0" : "top-0"} z-40 size-full border border-muted bg-muted`}>
      <svg viewBox="0 0 100 100" className="size-full">
        <text
          style={{
            fontSize: emphasize ? 60 : 50,
            textAnchor: vertical ? "end" : "middle",
            dominantBaseline: vertical ? "central" : "no-change",
            fill: emphasize ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
          }}
          x={vertical ? "85%" : "50%"}
          y={vertical ? "50%" : "85%"}
        >
          {t}
        </text>
      </svg>
    </div>
  )
}
