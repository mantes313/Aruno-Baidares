type TreesProps = {
  opacity?: number;
  side?: "left" | "right" | "both";
};

export function TreesBackground({ opacity = 0.2, side = "both" }: TreesProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {(side === "left" || side === "both") && (
        <g fill="var(--forest)">
          <path d="M-50 800 L50 400 L150 800 Z" opacity="0.6" />
          <path d="M50 800 L130 450 L210 800 Z" opacity="0.8" />
          <path d="M150 800 L220 500 L290 800 Z" opacity="0.5" />
          <path d="M-100 800 L0 350 L100 800 Z" opacity="0.4" />
        </g>
      )}
      {(side === "right" || side === "both") && (
        <g fill="var(--forest)">
          <path d="M1290 800 L1390 400 L1490 800 Z" opacity="0.6" />
          <path d="M1230 800 L1310 450 L1390 800 Z" opacity="0.8" />
          <path d="M1150 800 L1220 500 L1290 800 Z" opacity="0.5" />
          <path d="M1340 800 L1440 350 L1540 800 Z" opacity="0.4" />
        </g>
      )}
    </svg>
  );
}

type RiverEdgeProps = {
  position?: "top" | "bottom";
  opacity?: number;
};

export function RiverEdge({ position = "bottom", opacity = 0.5 }: RiverEdgeProps) {
  return (
    <div
      className={`absolute left-0 right-0 h-24 md:h-32 pointer-events-none ${
        position === "top" ? "top-0 rotate-180" : "bottom-0"
      }`}
    >
      <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 60 C 200 20, 400 80, 600 50 C 800 20, 1000 90, 1200 40 C 1300 20, 1400 60, 1440 50 L 1440 120 L 0 120 Z"
          fill="var(--river)"
          opacity={opacity}
        />
        <path
          d="M0 80 C 300 50, 500 100, 720 60 C 900 30, 1100 90, 1440 70 L 1440 120 L 0 120 Z"
          fill="var(--river-light)"
          opacity={opacity * 0.7}
        />
      </svg>
    </div>
  );
}

type NatureBackgroundProps = {
  treeSide?: "left" | "right" | "both";
  treeOpacity?: number;
  river?: "top" | "bottom" | "both" | "none";
  gradient?: boolean;
};

export function NatureBackground({
  treeSide = "both",
  treeOpacity = 0.08,
  river = "bottom",
  gradient = false,
}: NatureBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 via-transparent to-river-light/10" />
      )}
      <TreesBackground opacity={treeOpacity} side={treeSide} />
      {(river === "bottom" || river === "both") && <RiverEdge position="bottom" opacity={0.35} />}
      {(river === "top" || river === "both") && <RiverEdge position="top" opacity={0.35} />}
    </div>
  );
}
