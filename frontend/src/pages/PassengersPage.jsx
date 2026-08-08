import { useState } from 'react'
import PassengerModal from '../components/PassengerModal'

const initialPassengers = [
  { id: 1, firstName: 'James', lastName: 'Carter', email: 'james.carter@email.com', passport: 'GB1234567', nationality: 'British', bookings: 3 },
  { id: 2, firstName: 'Sofia', lastName: 'Mendes', email: 'sofia.mendes@email.com', passport: 'PT9876543', nationality: 'Portuguese', bookings: 1 },
  { id: 3, firstName: 'Liam', lastName: 'Chen', email: 'liam.chen@email.com', passport: 'US4567891', nationality: 'American', bookings: 2 },
  { id: 4, firstName: 'Aisha', lastName: 'Patel', email: 'aisha.patel@email.com', passport: 'IN7654321', nationality: 'Indian', bookings: 1 },
  { id: 5, firstName: 'Noah', lastName: 'Williams', email: 'noah.williams@email.com', passport: 'US1239876', nationality: 'American', bookings: 4 },
  { id: 6, firstName: 'Emma', lastName: 'Johnson', email: 'emma.johnson@email.com', passport: 'GB9871234', nationality: 'British', bookings: 2 },
]

function PassengersPage() {
  const [passengers, setPassengers] = useState(initialPassengers)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = passengers.filter((p) => {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase()
    return (
      full.includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.nationality.toLowerCase().includes(search.toLowerCase())
    )
  })

  function handleSave(form) {
    const newPassenger = {
      id: passengers.length + 1,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      passport: form.passport,
      nationality: form.nationality,
      bookings: 0,
    }
    setPassengers([newPassenger, ...passengers])
  }

  function handleDelete(id) {
    setPassengers(passengers.filter((p) => p.id !== id))
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
          filtered.map((p) => (
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
                    {p.bookings} booking{p.bookings !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

            </div>
          ))
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
