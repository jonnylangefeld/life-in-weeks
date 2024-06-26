export default function Tick({ t, vertical }: { t: number; vertical?: boolean }) {
  const emphasize = t % 5 == 0
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <text
        style={{
          fontSize: emphasize ? 60 : 50,
          textAnchor: vertical ? "end" : "middle",
          dominantBaseline: vertical ? "middle" : "text-after-edge",
          fill: emphasize ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
        }}
        x={vertical ? "100%" : "50%"}
        y={vertical ? "50%" : "100%"}
      >
        {t}
      </text>
    </svg>
  )
}
