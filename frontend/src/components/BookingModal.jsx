import { useEffect, useState } from 'react'
import { getFlights } from '../api'

function BookingModal({ onClose, onSave }) {
  const [flights, setFlights] = useState([])
  const [form, setForm] = useState({
    passenger: '',
    flightId: '',
    seat: '',
  })

  useEffect(() => {
    getFlights().then(setFlights).catch(() => setFlights([]))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.passenger || !form.flightId || !form.seat) return
    onSave({ ...form, flightId: Number(form.flightId) })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">New Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Passenger Name</label>
            <input
              name="passenger"
              value={form.passenger}
              onChange={handleChange}
              placeholder="e.g. James Carter"
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Flight</label>
            <select
              name="flightId"
              value={form.flightId}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a flight</option>
              {flights.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.flightNumber} — {f.origin} → {f.destination}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-sm">Seat Number</label>
            <input
              name="seat"
              value={form.seat}
              onChange={handleChange}
              placeholder="e.g. 14A"
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
          >
            Create Booking
          </button>
        </div>

      </div>
    </div>
  )
}

export default BookingModal