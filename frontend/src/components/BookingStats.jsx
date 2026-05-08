const stats = [
  { label: 'Confirmed', count: 142, color: 'bg-green-500' },
  { label: 'Pending', count: 38, color: 'bg-yellow-500' },
  { label: 'Boarded', count: 89, color: 'bg-blue-500' },
  { label: 'Cancelled', count: 21, color: 'bg-red-500' },
]

const total = stats.reduce((sum, s) => sum + s.count, 0)

function BookingStats() {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Bookings by Status</h2>

      <div className="flex rounded-full overflow-hidden h-3 mb-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color}`}
            style={{ width: `${(stat.count / total) * 100}%` }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stat.color}`} />
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <span className="text-white text-sm font-medium">{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingStats