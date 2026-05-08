import MetricCard from '../components/MetricCard'
import RecentBookings from '../components/RecentBookings'
import BookingStats from '../components/BookingStats'

const metrics = [
  { title: 'Total Bookings', value: '290', icon: '📋', color: 'bg-blue-500/20' },
  { title: 'Total Revenue', value: '£84,320', icon: '💰', color: 'bg-green-500/20' },
  { title: 'Active Flights', value: '24', icon: '✈️', color: 'bg-purple-500/20' },
  { title: 'Passengers', value: '1,284', icon: '👤', color: 'bg-orange-500/20' },
]

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back — here's what's happening today.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>
        <div>
          <BookingStats />
        </div>
      </div>

    </div>
  )
}

export default DashboardPage