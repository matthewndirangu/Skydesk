import { useState } from 'react'
import FlightCard from '../components/FlightCard'

const mockFlights = [
  {
    id: 1,
    airline: 'British Airways',
    flightNumber: 'BA 115',
    origin: 'LHR',
    destination: 'JFK',
    departureTime: '09:00',
    arrivalTime: '11:55',
    duration: '7h 55m',
    seatsAvailable: 14,
    price: 420,
  },
  {
    id: 2,
    airline: 'Virgin Atlantic',
    flightNumber: 'VS 003',
    origin: 'LHR',
    destination: 'JFK',
    departureTime: '11:30',
    arrivalTime: '14:20',
    duration: '7h 50m',
    seatsAvailable: 6,
    price: 389,
  },
  {
    id: 3,
    airline: 'American Airlines',
    flightNumber: 'AA 106',
    origin: 'LHR',
    destination: 'JFK',
    departureTime: '14:15',
    arrivalTime: '17:10',
    duration: '7h 55m',
    seatsAvailable: 23,
    price: 355,
  },
  {
    id: 4,
    airline: 'Delta Airlines',
    flightNumber: 'DL 402',
    origin: 'LHR',
    destination: 'JFK',
    departureTime: '18:45',
    arrivalTime: '21:40',
    duration: '7h 55m',
    seatsAvailable: 2,
    price: 512,
  },
]

function SearchPage() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  function handleSearch() {
    setResults(mockFlights)
    setHasSearched(true)
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Flight Search</h1>
        <p className="text-gray-400 mt-1">Search available flights by route and date.</p>
      </div>

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