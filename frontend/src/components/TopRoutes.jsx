const routes = [
  { route: 'LHR → JFK', bookings: 48, revenue: 20160 },
  { route: 'DXB → LHR', bookings: 35, revenue: 12250 },
  { route: 'CDG → DXB', bookings: 29, revenue: 8990 },
  { route: 'JFK → LAX', bookings: 24, revenue: 6480 },
  { route: 'FRA → SIN', bookings: 18, revenue: 9720 },
]

const maxBookings = Math.max(...routes.map((r) => r.bookings))

function TopRoutes() {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-1">Top Routes</h2>
      <p className="text-gray-400 text-xs mb-5">By booking volume</p>

      <div className="flex flex-col gap-4">
        {routes.map((r) => (
          <div key={r.route}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-white text-sm font-medium">{r.route}</p>
              <div className="flex items-center gap-3">
                <p className="text-gray-400 text-xs">
                  £{r.revenue.toLocaleString()}
                </p>
                <p className="text-blue-400 text-xs font-medium">
                  {r.bookings} bookings
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{ width: `${(r.bookings / maxBookings) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRoutes