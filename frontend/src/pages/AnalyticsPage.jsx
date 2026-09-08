import { useEffect, useState } from 'react'
import MetricCard from '../components/MetricCard'
import RevenueChart from '../components/RevenueChart'
import TopRoutes from '../components/TopRoutes'
import BookingStats from '../components/BookingStats'
import { getAnalytics } from '../api'

function AnalyticsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const result = await getAnalytics()
        if (cancelled) return
        setData(result)
        setLoading(false)
      } catch (err) {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="text-gray-400">Loading analytics...</div>
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>
  }

  const metrics = [
    { title: 'Total Revenue', value: `£${data.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-500/20' },
    { title: 'Total Bookings', value: data.totalBookings, icon: '📋', color: 'bg-blue-500/20' },
    { title: 'Avg. Ticket Price', value: `£${data.avgTicketPrice}`, icon: '🎫', color: 'bg-purple-500/20' },
    { title: 'Busiest Route', value: data.busiestRoute, icon: '✈️', color: 'bg-orange-500/20' },
  ]

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
      <RevenueChart data={data.revenueByMonth} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopRoutes data={data.topRoutes} />
        <BookingStats />
      </div>
    </div>
  )
}

export default AnalyticsPage