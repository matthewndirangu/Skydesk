import express from 'express'
const router = express.Router()

const flights = [
  {
    id: 1,
    flightNumber: 'BA 115',
    airline: 'British Airways',
    origin: 'LHR',
    destination: 'JFK',
    departsAt: '2026-05-20T09:00:00',
    arrivesAt: '2026-05-20T11:55:00',
    seatsTotal: 180,
    seatsAvailable: 14,
    price: 420,
  },
  {
    id: 2,
    flightNumber: 'VS 003',
    airline: 'Virgin Atlantic',
    origin: 'LHR',
    destination: 'JFK',
    departsAt: '2026-05-20T11:30:00',
    arrivesAt: '2026-05-20T14:20:00',
    seatsTotal: 200,
    seatsAvailable: 6,
    price: 389,
  },
  {
    id: 3,
    flightNumber: 'AA 106',
    airline: 'American Airlines',
    origin: 'LHR',
    destination: 'JFK',
    departsAt: '2026-05-20T14:15:00',
    arrivesAt: '2026-05-20T17:10:00',
    seatsTotal: 160,
    seatsAvailable: 23,
    price: 355,
  },
  {
    id: 4,
    flightNumber: 'EK 007',
    airline: 'Emirates',
    origin: 'DXB',
    destination: 'LHR',
    departsAt: '2026-05-21T02:00:00',
    arrivesAt: '2026-05-21T06:30:00',
    seatsTotal: 220,
    seatsAvailable: 40,
    price: 350,
  },
  {
    id: 5,
    flightNumber: 'AF 218',
    airline: 'Air France',
    origin: 'CDG',
    destination: 'DXB',
    departsAt: '2026-05-19T10:00:00',
    arrivesAt: '2026-05-19T19:20:00',
    seatsTotal: 210,
    seatsAvailable: 55,
    price: 310,
  },
  {
    id: 6,
    flightNumber: 'AA 12',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departsAt: '2026-05-18T08:00:00',
    arrivesAt: '2026-05-18T11:15:00',
    seatsTotal: 170,
    seatsAvailable: 20,
    price: 270,
  },
  {
    id: 7,
    flightNumber: 'LH 757',
    airline: 'Lufthansa',
    origin: 'FRA',
    destination: 'SIN',
    departsAt: '2026-05-17T13:20:00',
    arrivesAt: '2026-05-18T07:00:00',
    seatsTotal: 250,
    seatsAvailable: 15,
    price: 540,
  },
]

router.get('/', (req, res) => {
  const { origin, destination } = req.query
  let results = flights
  if (origin) {
    results = results.filter(
      (f) => f.origin.toLowerCase() === origin.toLowerCase()
    )
  }
  if (destination) {
    results = results.filter(
      (f) => f.destination.toLowerCase() === destination.toLowerCase()
    )
  }
  res.json(results)
})

router.get('/:id', (req, res) => {
  const flight = flights.find((f) => f.id === parseInt(req.params.id))
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' })
  }
  res.json(flight)
})

export { flights }
export default router