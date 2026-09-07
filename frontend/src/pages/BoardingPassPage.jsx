import { useEffect, useState } from 'react'
import BoardingPass from '../components/BoardingPass'
import { getBookings, getFlights, getPassengers } from '../api'

function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function formatDuration(departsAt, arrivesAt) {
  const ms = new Date(arrivesAt) - new Date(departsAt)
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function BoardingPassPage() {
  const [bookings, setBookings] = useState([])
  const [flights, setFlights] = useState([])
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const [bookingsData, flightsData, passengersData] = await Promise.all([
          getBookings(),
          getFlights(),
          getPassengers(),
        ])
        if (cancelled) return
        setBookings(bookingsData)
        setFlights(flightsData)
        setPassengers(passengersData)
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

  function getPassengerName(passengerId) {
    const p = passengers.find((p) => p.id === passengerId)
    return p ? `${p.firstName} ${p.lastName}` : 'Unknown'
  }

  const eligibleBookings = bookings.filter(
    (b) => b.status === 'Confirmed' || b.status === 'Boarded'
  )

  function buildPass(booking) {
    const flight = flights.find((f) => f.id === booking.flightId)
    if (!flight) return null

    return {
      id: booking.id,
      ref: booking.ref,
      passenger: getPassengerName(booking.passengerId),
      flight: flight.flightNumber,
      origin: flight.origin,
      originCity: flight.origin,
      destination: flight.destination,
      destinationCity: flight.destination,
      date: formatDate(flight.departsAt),
      departureTime: formatTime(flight.departsAt),
      duration: formatDuration(flight.departsAt, flight.arrivesAt),
      gate: 'TBC',
      seat: booking.seat,
      travelClass: 'Economy',
      status: booking.status,
    }
  }

  const selectedBooking = eligibleBookings.find((b) => b.id === parseInt(selectedId))
  const pass = selectedBooking ? buildPass(selectedBooking) : null

  if (loading) {
    return <div className="text-gray-400">Loading bookings...</div>
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Boarding Pass</h1>
        <p className="text-gray-400 mt-1">
          Generate a boarding pass for any confirmed or boarded booking.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm rounded-lg px-4 py-2">
          Error: {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-gray-400 text-sm">Select Booking</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a confirmed or boarded booking --</option>
            {eligibleBookings.map((b) => {
              const flight = flights.find((f) => f.id === b.flightId)
              return (
                <option key={b.id} value={b.id}>
                  {b.ref} — {getPassengerName(b.passengerId)} {flight ? `(${flight.origin} → ${flight.destination})` : ''}
                </option>
              )
            })}
          </select>
        </div>

        {pass && (
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            🖨 Print Pass
          </button>
        )}
      </div>

      {!pass && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-5xl mb-4">🎫</p>
          <p className="text-gray-400">Select a confirmed or boarded booking above to generate its boarding pass.</p>
        </div>
      )}

      {pass && (
        <BoardingPass booking={pass} />
      )}

    </div>
  )
}

export default BoardingPassPage