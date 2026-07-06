"use client";

export function RiverPath() {
  return (
    <svg
      className="absolute left-0 top-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 500"
      preserveAspectRatio="none"
      style={{ height: "100%", width: "100%" }}
    >
      <defs>
        <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--river)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="var(--river-light)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--river)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="riverBlur">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      {/* Main river path - winding from top to bottom */}
      <path
        d="M 50 0 
           C 70 20, 80 40, 60 60
           C 40 80, 30 100, 45 120
           C 60 140, 75 160, 55 180
           C 35 200, 25 220, 50 240
           C 75 260, 70 280, 50 300
           C 30 320, 40 340, 55 360
           C 70 380, 60 400, 45 420
           C 30 440, 50 460, 55 480
           L 55 500"
        fill="none"
        stroke="url(#riverGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#riverBlur)"
      />
      {/* River highlights */}
      <path
        d="M 50 0 
           C 70 20, 80 40, 60 60
           C 40 80, 30 100, 45 120
           C 60 140, 75 160, 55 180
           C 35 200, 25 220, 50 240
           C 75 260, 70 280, 50 300
           C 30 320, 40 340, 55 360
           C 70 380, 60 400, 45 420
           C 30 440, 50 460, 55 480
           L 55 500"
        fill="none"
        stroke="var(--river-light)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

// Returns the position on the river path based on scroll progress (0-1)
export function getRiverPosition(progress: number): { x: number; y: number } {
  // Simplified bezier curve calculation for the river path
  const t = Math.min(Math.max(progress, 0), 1);
  
  // Key points along the river (x, y percentages)
  const points = [
    { x: 50, y: 0 },
    { x: 60, y: 60 },
    { x: 45, y: 120 },
    { x: 55, y: 180 },
    { x: 50, y: 240 },
    { x: 50, y: 300 },
    { x: 55, y: 360 },
    { x: 45, y: 420 },
    { x: 55, y: 500 },
  ];
  
  const segmentCount = points.length - 1;
  const segment = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
  const localT = (t * segmentCount) - segment;
  
  const p1 = points[segment];
  const p2 = points[segment + 1];
  
  return {
    x: p1.x + (p2.x - p1.x) * localT,
    y: p1.y + (p2.y - p1.y) * localT,
  };
}
