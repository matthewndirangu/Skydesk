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

export default router