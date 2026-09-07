import { useEffect, useState } from 'react'
import PassengerModal from '../components/PassengerModal'
import { getPassengers, getBookings, createPassenger, deletePassenger } from '../api'

function PassengersPage() {
  const [passengers, setPassengers] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const [passengersData, bookingsData] = await Promise.all([getPassengers(), getBookings()])
        if (cancelled) return
        setPassengers(passengersData)
        setBookings(bookingsData)
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
      const [passengersData, bookingsData] = await Promise.all([getPassengers(), getBookings()])
      setPassengers(passengersData)
      setBookings(bookingsData)
    } catch (err) {
      setError(err.message)
    }
  }

  function getBookingCount(passengerId) {
    return bookings.filter((b) => b.passengerId === passengerId).length
  }

  const filtered = passengers.filter((p) => {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase()
    return (
      full.includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.nationality.toLowerCase().includes(search.toLowerCase())
    )
  })

  async function handleSave(form) {
    try {
      await createPassenger(form)
      refreshData()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deletePassenger(id)
      refreshData()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading passengers...</div>
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Passengers</h1>
          <p className="text-gray-400 mt-1">View and manage all registered passengers.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Passenger
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm rounded-lg px-4 py-2">
          Error: {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, email or nationality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <p className="text-gray-500 text-sm whitespace-nowrap">
          {filtered.length} passenger{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-20 text-gray-500">
            No passengers found.
          </div>
        ) : (
          filtered.map((p) => {
            const bookingCount = getBookingCount(p.id)
            return (
              <div
                key={p.id}
                className="bg-gray-800 rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {p.firstName} {p.lastName}
                      </p>
                      <p className="text-gray-400 text-xs">{p.nationality}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-300 text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex flex-col gap-1 border-t border-gray-700 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-gray-300 text-xs">{p.email}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs">Passport</p>
                    <p className="text-gray-300 text-xs font-mono">{p.passport}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs">Bookings</p>
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                      {bookingCount} booking{bookingCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

              </div>
            )
          })
        )}
      </div>

      {showModal && (
        <PassengerModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default PassengersPage