import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const revenueData = [
  { month: 'Nov', revenue: 6200 },
  { month: 'Dec', revenue: 9800 },
  { month: 'Jan', revenue: 7400 },
  { month: 'Feb', revenue: 8100 },
  { month: 'Mar', revenue: 11200 },
  { month: 'Apr', revenue: 9600 },
  { month: 'May', revenue: 12800 },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white font-bold text-sm">
          £{payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

function RevenueChart() {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-1">Monthly Revenue</h2>
      <p className="text-gray-400 text-xs mb-5">Last 7 months</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={revenueData} barSize={32}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `£${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart