import { useEffect, useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import BookingModal from '../components/BookingModal'
import { getBookings, getFlights, createBooking, deleteBooking } from '../api'

const filters = ['All', 'Confirmed', 'Pending', 'Boarded', 'Cancelled']

function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const [bookingsData, flightsData] = await Promise.all([getBookings(), getFlights()])
        if (cancelled) return
        setBookings(bookingsData)
        setFlights(flightsData)
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

  async function refreshData() {
    try {
      const [bookingsData, flightsData] = await Promise.all([getBookings(), getFlights()])
      setBookings(bookingsData)
      setFlights(flightsData)
    } catch (err) {
      setError(err.message)
    }
  }

  function getFlight(flightId) {
    return flights.find((f) => f.id === flightId)
  }

  const filtered = bookings.filter((b) => {
    const flight = getFlight(b.flightId)
    const flightNumber = flight ? flight.flightNumber : ''
    const matchesFilter = activeFilter === 'All' || b.status === activeFilter
    const matchesSearch =
      b.passenger.toLowerCase().includes(search.toLowerCase()) ||
      b.ref.toLowerCase().includes(search.toLowerCase()) ||
      flightNumber.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  async function handleDelete(id) {
    try {
      await deleteBooking(id)
      refreshData()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleSave(form) {
    try {
      await createBooking({
        passenger: form.passenger,
        flightId: form.flightId,
        seat: form.seat,
      })
      refreshData()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading bookings...</div>
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400 mt-1">Manage all flight bookings.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Booking
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm rounded-lg px-4 py-2">
          Error: {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, reference or flight..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left px-5 py-3">Reference</th>
              <th className="text-left px-5 py-3">Passenger</th>
              <th className="text-left px-5 py-3">Flight</th>
              <th className="text-left px-5 py-3">Route</th>
              <th className="text-left px-5 py-3">Seat</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Date</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-10">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map((booking) => {
                const flight = getFlight(booking.flightId)
                return (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-blue-400 font-mono">{booking.ref}</td>
                    <td className="px-5 py-3 text-white">{booking.passenger}</td>
                    <td className="px-5 py-3 text-gray-300">{flight ? flight.flightNumber : 'Unknown'}</td>
                    <td className="px-5 py-3 text-gray-300">
                      {flight ? `${flight.origin} → ${flight.destination}` : 'Unknown'}
                    </td>
                    <td className="px-5 py-3 text-gray-300">{booking.seat}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-5 py-3 text-gray-400">{booking.createdAt}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-400 hover:text-red-300 text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default BookingsPage