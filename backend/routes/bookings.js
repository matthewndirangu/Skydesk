import express from 'express'

const router = express.Router()

let bookings = [
  {
    id: 1,
    ref: 'SKY-2841',
    flightId: 1,
    passenger: 'James Carter',
    seat: '12A',
    status: 'Confirmed',
    createdAt: '2026-05-08',
  },
  {
    id: 2,
    ref: 'SKY-2840',
    flightId: 2,
    passenger: 'Sofia Mendes',
    seat: '24C',
    status: 'Pending',
    createdAt: '2026-05-08',
  },
  {
    id: 3,
    ref: 'SKY-2839',
    flightId: 3,
    passenger: 'Liam Chen',
    seat: '8B',
    status: 'Boarded',
    createdAt: '2026-05-07',
  },
]

router.get('/', (req, res) => {
  const { status } = req.query

  let results = bookings

  if (status && status !== 'All') {
    results = results.filter((b) => b.status === status)
  }

  res.json(results)
})

router.get('/:id', (req, res) => {
  const booking = bookings.find((b) => b.id === parseInt(req.params.id))

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' })
  }

  res.json(booking)
})

router.post('/', (req, res) => {
  const { passenger, flightId, seat, status } = req.body

  if (!passenger || !flightId || !seat) {
    return res.status(400).json({ error: 'passenger, flightId and seat are required' })
  }

  const newBooking = {
    id: bookings.length + 1,
    ref: `SKY-${2842 + bookings.length}`,
    flightId: parseInt(flightId),
    passenger,
    seat,
    status: status || 'Pending',
    createdAt: new Date().toISOString().split('T')[0],
  }

  bookings.push(newBooking)
  res.status(201).json(newBooking)
})

router.patch('/:id', (req, res) => {
  const index = bookings.findIndex((b) => b.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' })
  }

  bookings[index] = { ...bookings[index], ...req.body }
  res.json(bookings[index])
})

router.delete('/:id', (req, res) => {
  const index = bookings.findIndex((b) => b.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' })
  }

  const deleted = bookings[index]
  bookings = bookings.filter((b) => b.id !== parseInt(req.params.id))
  res.json({ message: 'Booking cancelled', booking: deleted })
})

export default router