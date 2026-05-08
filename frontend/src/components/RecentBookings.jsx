const bookings = [
  { ref: 'SKY-2841', passenger: 'James Carter', route: 'LHR → JFK', status: 'Confirmed', date: '08 May 2026' },
  { ref: 'SKY-2840', passenger: 'Sofia Mendes', route: 'CDG → DXB', status: 'Pending', date: '08 May 2026' },
  { ref: 'SKY-2839', passenger: 'Liam Chen', route: 'JFK → LAX', status: 'Boarded', date: '07 May 2026' },
  { ref: 'SKY-2838', passenger: 'Aisha Patel', route: 'DXB → LHR', status: 'Cancelled', date: '07 May 2026' },
  { ref: 'SKY-2837', passenger: 'Noah Williams', route: 'LAX → ORD', status: 'Confirmed', date: '06 May 2026' },
]

const statusColors = {
  Confirmed: 'bg-green-500/20 text-green-400',
  Pending: 'bg-yellow-500/20 text-yellow-400',
  Boarded: 'bg-blue-500/20 text-blue-400',
  Cancelled: 'bg-red-500/20 text-red-400',
}

function RecentBookings() {
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
              <td className="py-3 text-gray-300">{booking.route}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                  {booking.status}
                </span>
              </td>
              <td className="py-3 text-gray-400">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentBookings