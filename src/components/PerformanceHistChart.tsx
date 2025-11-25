import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEmployee } from '../context/EmployeeContext';

// Icons - sizes match Figma design (13px × 13px for chart, 17px × 17px for calendar)
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]">
    <path d="M3 13h2v8H3v-8zm4-5h2v13H7V8zm4-5h2v18h-2V3zm4 8h2v10h-2V11zm4-3h2v13h-2V8z"/>
  </svg>
);

const CalendarSmallIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px] text-gray-500">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
  </svg>
);

// Performance History Chart Component
export function PerformanceHistChart() {
  const { selectedEmployee } = useEmployee();

  // Transform employee performance history to chart data format
  const chartData = selectedEmployee?.performanceHistory.map(item => ({
    name: item.quarter,
    achievement: item.achievement,
  })) || [
    { name: "Q1", achievement: 0 },
    { name: "Q2", achievement: 0 },
    { name: "Q3", achievement: 0 },
    { name: "Q4", achievement: 0 },
  ];

  return (
    <div className="bg-white gradient-border-sm rounded-[25px] p-3 mb-[10px] w-[437px] h-[366px]" data-name="360-user-Performance-hist">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ChartIcon />
          <span className="text-xs font-bold uppercase tracking-wide">
            Performance hist {selectedEmployee ? `- ${selectedEmployee.name}` : ''}
          </span>
        </div>
        <CalendarSmallIcon />
      </div>
      
      {/* Bar Chart using Recharts */}
      <ResponsiveContainer width="100%" height={290}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#d9d9d9" />
          <XAxis
            dataKey="name"
            fontSize={11}
            stroke="#666"
          />
          <YAxis
            fontSize={11}
            stroke="#666"
            domain={[0, 120]}
            ticks={[0, 20, 40, 60, 80, 100, 120]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "11px",
            }}
          />
          <Bar
            dataKey="achievement"
            fill="#838383"
            radius={[6, 6, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceHistChart;
