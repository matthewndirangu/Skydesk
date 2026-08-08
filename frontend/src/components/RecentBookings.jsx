import { useEffect, useState } from 'react'
import { getBookings, getFlights } from '../api'

const statusColors = {
  Confirmed: 'bg-green-500/20 text-green-400',
  Pending: 'bg-yellow-500/20 text-yellow-400',
  Boarded: 'bg-blue-500/20 text-blue-400',
  Cancelled: 'bg-red-500/20 text-red-400',
}

function RecentBookings() {
  const [bookings, setBookings] = useState([])
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getBookings(), getFlights()])
      .then(([bookingsData, flightsData]) => {
        setBookings(bookingsData)
        setFlights(flightsData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function getRoute(flightId) {
    const flight = flights.find((f) => f.id === flightId)
    return flight ? `${flight.origin} → ${flight.destination}` : 'Unknown'
  }

  if (loading) return <div className="bg-gray-800 rounded-xl p-5 text-gray-400">Loading bookings...</div>
  if (error) return <div className="bg-gray-800 rounded-xl p-5 text-red-400">Error: {error}</div>

  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Recent Bookings</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left pb-3">Reference</th>
            <th className="text-left pb-3">Passenger</th>
            <th className="text-left pb-3">Route</th>
            <th className="text-left pb-3">Status</th>
            <th className="text-left pb-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.ref} className="border-b border-gray-700/50 hover:bg-gray-700/30">
              <td className="py-3 text-blue-400 font-mono">{booking.ref}</td>
              <td className="py-3 text-white">{booking.passenger}</td>
              <td className="py-3 text-gray-300">{getRoute(booking.flightId)}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </td>
              <td className="py-3 text-gray-400">{booking.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentBookings