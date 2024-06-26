export default function Tick({ t, vertical, minIndex }: { t: number; vertical?: boolean; minIndex?: number }) {
  const emphasize = t % 5 == 0
  return (
    <div className="relative aspect-square w-16 min-w-[2px] sm:m-[1px]">
      <div className="absolute h-full w-full">
        {t >= (minIndex || 0) && (
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <text
              style={{
                fontSize: emphasize ? 60 : 50,
                textAnchor: vertical ? "end" : "middle",
                dominantBaseline: vertical ? "middle" : "no-change",
                fill: emphasize ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              }}
              x={vertical ? "85%" : "50%"}
              y={vertical ? "50%" : "85%"}
            >
              {t}
            </text>
          </svg>
        )}
      </div>
    </div>
  )
}
