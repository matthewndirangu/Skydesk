import { useEffect, useState } from 'react'
import MetricCard from '../components/MetricCard'
import RecentBookings from '../components/RecentBookings'
import BookingStats from '../components/BookingStats'
import { getAnalytics, getFlights, getPassengers } from '../api'

function DashboardPage() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const [analytics, flights, passengers] = await Promise.all([
          getAnalytics(),
          getFlights(),
          getPassengers(),
        ])
        if (cancelled) return
        setMetrics([
          { title: 'Total Bookings', value: analytics.totalBookings, icon: '📋', color: 'bg-blue-500/20' },
          { title: 'Total Revenue', value: `£${analytics.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-500/20' },
          { title: 'Active Flights', value: flights.length, icon: '✈️', color: 'bg-purple-500/20' },
          { title: 'Passengers', value: passengers.length, icon: '👤', color: 'bg-orange-500/20' },
        ])
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

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back — here's what's happening today.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm rounded-lg px-4 py-2">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-4 text-gray-400">Loading metrics...</div>
        ) : (
          metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
            />
          ))
        )}
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