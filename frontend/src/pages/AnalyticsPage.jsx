import MetricCard from '../components/MetricCard'
import RevenueChart from '../components/RevenueChart'
import TopRoutes from '../components/TopRoutes'
import BookingStats from '../components/BookingStats'

const metrics = [
  { title: 'Total Revenue', value: '£84,320', icon: '💰', color: 'bg-green-500/20' },
  { title: 'Total Bookings', value: '290', icon: '📋', color: 'bg-blue-500/20' },
  { title: 'Avg. Ticket Price', value: '£291', icon: '🎫', color: 'bg-purple-500/20' },
  { title: 'Busiest Route', value: 'LHR→JFK', icon: '✈️', color: 'bg-orange-500/20' },
]

function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">
          System-wide performance overview — admin only.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      <RevenueChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopRoutes />
        <BookingStats />
      </div>

    </div>
  )
}

export default AnalyticsPage