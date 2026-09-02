import React from 'react';

interface DimensionData {
  key: string;
  label: string;
  score: number; // 0 to 100
}

interface DimensionRadarChartProps {
  dimensions: DimensionData[];
  size?: number;
}

export const DimensionRadarChart: React.FC<DimensionRadarChartProps> = ({
  dimensions,
  size = 360,
}) => {
  const center = size / 2;
  const radius = size * 0.36;
  const numLevels = 4;
  const total = dimensions.length || 6;

  // Compute angles for each dimension vertex (starting top -PI/2)
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius * Math.min(Math.max(valueRatio, 0.05), 1);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric polygon grid points
  const gridLevels = Array.from({ length: numLevels }, (_, i) => (i + 1) / numLevels);

  // Polygon path for user's actual dimension scores
  const scorePoints = dimensions.map((dim, i) => {
    const ratio = dim.score / 100;
    const { x, y } = getCoordinates(i, ratio);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Grid Polygons */}
        {gridLevels.map((levelRatio, levelIdx) => {
          const points = dimensions.map((_, i) => {
            const { x, y } = getCoordinates(i, levelRatio);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={levelIdx}>
              <polygon
                points={points}
                fill={levelIdx === numLevels - 1 ? '#f8fafc' : 'none'}
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeDasharray={levelIdx < numLevels - 1 ? '3 3' : 'none'}
              />
              {/* Level label */}
              <text
                x={center + 6}
                y={center - radius * levelRatio + 4}
                className="text-[10px] fill-slate-400 font-mono font-medium"
              >
                {Math.round(levelRatio * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axis lines from center to outer vertices */}
        {dimensions.map((_, i) => {
          const { x, y } = getCoordinates(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
          );
        })}

        {/* User Score Polygon (Teal fill with gold border) */}
        <polygon
          points={scorePoints}
          fill="rgba(46, 134, 171, 0.25)"
          stroke="#2E86AB"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Data points & Labels */}
        {dimensions.map((dim, i) => {
          const ratio = dim.score / 100;
          const point = getCoordinates(i, ratio);
          const outerLabelPos = getCoordinates(i, 1.22);

          return (
            <g key={i}>
              {/* Vertex Point */}
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#F5A623"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Dimension Label Text */}
              <text
                x={outerLabelPos.x}
                y={outerLabelPos.y}
                textAnchor={
                  Math.abs(outerLabelPos.x - center) < 15
                    ? 'middle'
                    : outerLabelPos.x > center
                    ? 'start'
                    : 'end'
                }
                dominantBaseline="middle"
                className="text-xs font-bold fill-slate-800"
              >
                {dim.label}
              </text>

              {/* Score Percentage Pill */}
              <text
                x={outerLabelPos.x}
                y={outerLabelPos.y + 14}
                textAnchor={
                  Math.abs(outerLabelPos.x - center) < 15
                    ? 'middle'
                    : outerLabelPos.x > center
                    ? 'start'
                    : 'end'
                }
                dominantBaseline="middle"
                className="text-[11px] font-bold fill-primary-600 font-mono"
              >
                {dim.score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DimensionRadarChart;
