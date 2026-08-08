import { useEffect, useState } from 'react'
import { getBookings } from '../api'

function BookingStats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBookings()
      .then((bookings) => {
        const counts = {
          Confirmed: 0,
          Pending: 0,
          Boarded: 0,
          Cancelled: 0,
        }
        bookings.forEach((b) => {
          if (counts[b.status] !== undefined) counts[b.status]++
        })
        setStats([
          { label: 'Confirmed', count: counts.Confirmed, color: 'bg-green-500' },
          { label: 'Pending', count: counts.Pending, color: 'bg-yellow-500' },
          { label: 'Boarded', count: counts.Boarded, color: 'bg-blue-500' },
          { label: 'Cancelled', count: counts.Cancelled, color: 'bg-red-500' },
        ])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="bg-gray-800 rounded-xl p-5 text-gray-400">Loading stats...</div>
  if (error) return <div className="bg-gray-800 rounded-xl p-5 text-red-400">Error: {error}</div>

  const total = stats.reduce((sum, s) => sum + s.count, 0) || 1

  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Bookings by Status</h2>
      <div className="flex rounded-full overflow-hidden h-3 mb-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color}`}
            style={{ width: `${(stat.count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <span className="text-white text-sm font-medium">{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingStats