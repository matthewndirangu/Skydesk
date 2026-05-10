function BoardingPass({ booking }) {
  return (
    <div className="bg-white text-gray-900 rounded-2xl overflow-hidden w-full max-w-2xl mx-auto shadow-2xl">

      <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
        <div>
          <p className="text-blue-200 text-xs font-medium uppercase tracking-widest">SkyDesk</p>
          <p className="text-white font-bold text-lg">Boarding Pass</p>
        </div>
        <span className="text-white text-3xl">✈</span>
      </div>

      <div className="px-8 py-6 flex items-center justify-between border-b border-dashed border-gray-300">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">From</p>
          <p className="text-5xl font-black text-gray-900">{booking.origin}</p>
          <p className="text-gray-500 text-sm mt-1">{booking.originCity}</p>
        </div>

        <div className="flex flex-col items-center gap-1 text-gray-400">
          <p className="text-xs">{booking.duration}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full border-2 border-gray-400" />
            <div className="w-20 h-px bg-gray-300" />
            <span className="text-gray-400 text-lg">✈</span>
            <div className="w-20 h-px bg-gray-300" />
            <div className="w-2 h-2 rounded-full border-2 border-gray-400" />
          </div>
          <p className="text-xs">Direct</p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-xs uppercase tracking-widest">To</p>
          <p className="text-5xl font-black text-gray-900">{booking.destination}</p>
          <p className="text-gray-500 text-sm mt-1">{booking.destinationCity}</p>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-3 gap-6 border-b border-dashed border-gray-300">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Passenger</p>
          <p className="text-gray-900 font-bold mt-1">{booking.passenger}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Flight</p>
          <p className="text-gray-900 font-bold mt-1">{booking.flight}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Date</p>
          <p className="text-gray-900 font-bold mt-1">{booking.date}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Departure</p>
          <p className="text-gray-900 font-bold mt-1">{booking.departureTime}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Gate</p>
          <p className="text-gray-900 font-bold mt-1">{booking.gate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Seat</p>
          <p className="text-blue-600 font-black text-xl mt-1">{booking.seat}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Class</p>
          <p className="text-gray-900 font-bold mt-1">{booking.travelClass}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Booking Ref</p>
          <p className="text-gray-900 font-bold font-mono mt-1">{booking.ref}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Status</p>
          <p className="text-green-600 font-bold mt-1">{booking.status}</p>
        </div>
      </div>

      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-sm"
              style={{
                height: '40px',
                width: `${[3, 5, 2, 4, 3, 6, 2, 4][i]}px`,
                marginRight: i % 2 === 0 ? '2px' : '4px',
                display: 'inline-block',
              }}
            />
          ))}
          <p className="text-gray-400 text-xs font-mono mt-1">{booking.ref}</p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-xs">Have a great flight!</p>
          <p className="text-blue-600 font-bold text-sm">✈ SkyDesk Airways</p>
        </div>
      </div>

    </div>
  )
}

export default BoardingPass