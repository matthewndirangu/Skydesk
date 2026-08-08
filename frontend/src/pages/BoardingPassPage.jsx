import { useState } from 'react'
import BoardingPass from '../components/BoardingPass'

const confirmedBookings = [
  {
    id: 1,
    ref: 'SKY-2841',
    passenger: 'James Carter',
    flight: 'BA 115',
    origin: 'LHR',
    originCity: 'London Heathrow',
    destination: 'JFK',
    destinationCity: 'New York JFK',
    date: '08 May 2026',
    departureTime: '09:00',
    duration: '7h 55m',
    gate: 'B22',
    seat: '12A',
    travelClass: 'Economy',
    status: 'Confirmed',
  },
  {
    id: 2,
    ref: 'SKY-2837',
    passenger: 'Noah Williams',
    flight: 'DL 402',
    origin: 'LAX',
    originCity: 'Los Angeles',
    destination: 'ORD',
    destinationCity: 'Chicago O\'Hare',
    date: '06 May 2026',
    departureTime: '18:45',
    duration: '4h 10m',
    gate: 'D07',
    seat: '19F',
    travelClass: 'Economy',
    status: 'Confirmed',
  },
  {
    id: 3,
    ref: 'SKY-2836',
    passenger: 'Emma Johnson',
    flight: 'LH 757',
    origin: 'FRA',
    originCity: 'Frankfurt',
    destination: 'SIN',
    destinationCity: 'Singapore Changi',
    date: '06 May 2026',
    departureTime: '13:20',
    duration: '12h 40m',
    gate: 'A14',
    seat: '5A',
    travelClass: 'Business',
    status: 'Confirmed',
  },
]

function BoardingPassPage() {
  const [selectedId, setSelectedId] = useState('')

  const selectedBooking = confirmedBookings.find(
    (b) => b.id === parseInt(selectedId)
  )

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Boarding Pass</h1>
        <p className="text-gray-400 mt-1">
          Generate a boarding pass for any confirmed booking.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-gray-400 text-sm">Select Booking</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a confirmed booking --</option>
            {confirmedBookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.ref} — {b.passenger} ({b.origin} → {b.destination})
              </option>
            ))}
          </select>
        </div>

        {selectedBooking && (
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            🖨 Print Pass
          </button>
        )}
      </div>

      {!selectedBooking && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-5xl mb-4">🎫</p>
          <p className="text-gray-400">Select a confirmed booking above to generate its boarding pass.</p>
        </div>
      )}

      {selectedBooking && (
        <BoardingPass booking={selectedBooking} />
      )}

    </div>
  )
}

export default BoardingPassPage