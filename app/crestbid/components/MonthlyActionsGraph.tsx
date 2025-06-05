import React from 'react';

const MonthlyActionsGraph = () => {
  const data = [
    { month: 'Jan', actions: 10 },
    { month: 'Feb', actions: 15 },
    { month: 'Mar', actions: 25 },
    { month: 'Apr', actions: 30 },
    { month: 'May', actions: 40 },
    { month: 'Jun', actions: 50 },
  ];

  const svgWidth = 500;
  const svgHeight = 300;
  const padding = 50; // Increased padding for labels
  const chartWidth = svgWidth - 2 * padding;
  const chartHeight = svgHeight - 2 * padding;

  const maxActions = Math.max(...data.map(d => d.actions), 0) || 50; // Ensure maxActions is not 0

  // Create points for polyline
  const points = data
    .map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = svgHeight - padding - (d.actions / maxActions) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Actions</h3>
      <div className="relative">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          {/* Y-axis Label */}
          <text
            x={-(padding + chartHeight / 2)}
            y={padding / 3}
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-xs text-gray-500"
          >
            No. of Actions
          </text>

          {/* X-axis Labels */}
          {data.map((d, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            return (
              <text
                key={d.month}
                x={x}
                y={svgHeight - padding / 2}
                textAnchor="middle"
                className="text-xs text-gray-500"
              >
                {d.month}
              </text>
            );
          })}

          {/* Y-axis lines and labels (simplified) */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = svgHeight - padding - tick * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={padding -5}
                  y1={y}
                  x2={padding + chartWidth}
                  y2={y}
                  className="stroke-current text-gray-200"
                  strokeDasharray="2,2"
                />
                <text x={padding - 15} y={y + 4} textAnchor="end" className="text-xs text-gray-400">
                  {Math.round(tick * maxActions)}
                </text>
              </g>
            );
          })}

          {/* X-axis line */}
           <line
             x1={padding}
             y1={svgHeight - padding}
             x2={padding + chartWidth}
             y2={svgHeight - padding}
             className="stroke-current text-gray-300"
           />
           {/* Y-axis line */}
           <line
             x1={padding}
             y1={padding -20} // extend slightly above max value for visual appeal
             x2={padding}
             y2={svgHeight - padding}
             className="stroke-current text-gray-300"
           />

          {/* Graph Line */}
          <polyline
            fill="none"
            stroke="#3B82F6" // blue-500
            strokeWidth="2"
            points={points}
          />

        {/* Data Points (optional circles) */}
        {data.map((d, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            const y = svgHeight - padding - (d.actions / maxActions) * chartHeight;
            return (
              <circle
                key={`dot-${d.month}`}
                cx={x}
                cy={y}
                r="3"
                fill="#3B82F6" // blue-500
              />
            );
          })}

        </svg>
      </div>
    </div>
  );
};

export default MonthlyActionsGraph;
