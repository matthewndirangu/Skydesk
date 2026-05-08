function FlightCard({ flight }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5 flex items-center justify-between hover:bg-gray-750 transition-colors">
      
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-white text-xl font-bold">{flight.departureTime}</p>
          <p className="text-gray-400 text-sm">{flight.origin}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-500 text-xs">{flight.duration}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full border border-gray-500" />
            <div className="w-16 h-px bg-gray-500" />
            <span className="text-gray-400 text-xs">✈</span>
            <div className="w-16 h-px bg-gray-500" />
            <div className="w-2 h-2 rounded-full border border-gray-500" />
          </div>
          <p className="text-gray-500 text-xs">Direct</p>
        </div>

        <div className="text-center">
          <p className="text-white text-xl font-bold">{flight.arrivalTime}</p>
          <p className="text-gray-400 text-sm">{flight.destination}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-xs">{flight.airline}</p>
        <p className="text-gray-500 text-xs">{flight.flightNumber}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-xs">{flight.seatsAvailable} seats left</p>
      </div>

      <div className="text-right">
        <p className="text-white text-2xl font-bold">£{flight.price}</p>
        <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          Book Now
        </button>
      </div>

    </div>
  )
}

export default FlightCard