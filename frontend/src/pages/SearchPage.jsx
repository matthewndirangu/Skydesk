import { useEffect, useState } from 'react'
import FlightCard from '../components/FlightCard'
import { getFlights } from '../api'

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

function SearchPage() {
  const [allFlights, setAllFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchFlights() {
      setLoading(true)
      try {
        const data = await getFlights()
        if (cancelled) return
        setAllFlights(data)
        setLoading(false)
      } catch (err) {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      }
    }

    fetchFlights()

    return () => {
      cancelled = true
    }
  }, [])

  function handleSearch() {
    const filtered = allFlights.filter((f) => {
      const matchesOrigin = !origin || f.origin.toLowerCase().includes(origin.toLowerCase())
      const matchesDestination = !destination || f.destination.toLowerCase().includes(destination.toLowerCase())
      return matchesOrigin && matchesDestination
    })

    const withDisplayFields = filtered.map((f) => ({
      ...f,
      departureTime: formatTime(f.departsAt),
      arrivalTime: formatTime(f.arrivesAt),
      duration: formatDuration(f.departsAt, f.arrivesAt),
    }))

    setResults(withDisplayFields)
    setHasSearched(true)
  }

  if (loading) {
    return <div className="text-gray-400">Loading flights...</div>
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Flight Search</h1>
        <p className="text-gray-400 mt-1">Search available flights by route and date.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm rounded-lg px-4 py-2">
          Error: {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">From</label>
            <input
              type="text"
              placeholder="e.g. LHR"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">To</label>
            <input
              type="text"
              placeholder="e.g. JFK"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Passengers</label>
            <input
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Search Flights
        </button>
      </div>

      {hasSearched && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 text-sm">{results.length} flights found</p>
          {results.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}

    </div>
  )
}

export default SearchPage