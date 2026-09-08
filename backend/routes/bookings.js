import express from 'express'
const router = express.Router()

let bookings = [
  { id: 1, ref: 'SKY-2841', flightId: 1, passengerId: 1, seat: '12A', status: 'Confirmed', createdAt: '2026-05-08' },
  { id: 2, ref: 'SKY-2840', flightId: 2, passengerId: 2, seat: '24C', status: 'Pending', createdAt: '2026-05-08' },
  { id: 3, ref: 'SKY-2839', flightId: 3, passengerId: 3, seat: '8B', status: 'Boarded', createdAt: '2026-05-07' },
  { id: 4, ref: 'SKY-2842', flightId: 1, passengerId: 2, seat: '16A', status: 'Confirmed', createdAt: '2025-11-10' },
  { id: 5, ref: 'SKY-2843', flightId: 2, passengerId: 3, seat: '9B', status: 'Boarded', createdAt: '2025-11-22' },
  { id: 6, ref: 'SKY-2844', flightId: 4, passengerId: 1, seat: '20C', status: 'Confirmed', createdAt: '2025-11-28' },
  { id: 7, ref: 'SKY-2845', flightId: 5, passengerId: 2, seat: '14D', status: 'Pending', createdAt: '2025-12-05' },
  { id: 8, ref: 'SKY-2846', flightId: 6, passengerId: 3, seat: '8A', status: 'Confirmed', createdAt: '2025-12-18' },
  { id: 9, ref: 'SKY-2847', flightId: 7, passengerId: 1, seat: '30B', status: 'Boarded', createdAt: '2026-01-08' },
  { id: 10, ref: 'SKY-2848', flightId: 1, passengerId: 3, seat: '11C', status: 'Confirmed', createdAt: '2026-01-22' },
  { id: 11, ref: 'SKY-2849', flightId: 4, passengerId: 2, seat: '25A', status: 'Cancelled', createdAt: '2026-02-02' },
  { id: 12, ref: 'SKY-2850', flightId: 2, passengerId: 1, seat: '6B', status: 'Confirmed', createdAt: '2026-02-14' },
  { id: 13, ref: 'SKY-2851', flightId: 5, passengerId: 3, seat: '19D', status: 'Boarded', createdAt: '2026-02-27' },
  { id: 14, ref: 'SKY-2852', flightId: 6, passengerId: 2, seat: '3A', status: 'Confirmed', createdAt: '2026-03-10' },
  { id: 15, ref: 'SKY-2853', flightId: 7, passengerId: 1, seat: '12B', status: 'Pending', createdAt: '2026-03-24' },
  { id: 16, ref: 'SKY-2854', flightId: 1, passengerId: 2, seat: '17A', status: 'Confirmed', createdAt: '2026-04-05' },
  { id: 17, ref: 'SKY-2855', flightId: 4, passengerId: 3, seat: '9C', status: 'Boarded', createdAt: '2026-04-19' },
  { id: 18, ref: 'SKY-2856', flightId: 2, passengerId: 1, seat: '21B', status: 'Confirmed', createdAt: '2026-05-02' },
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
  const { passengerId, flightId, seat, status } = req.body
  if (!passengerId || !flightId || !seat) {
    return res.status(400).json({ error: 'passengerId, flightId and seat are required' })
  }
  const newBooking = {
    id: bookings.length + 1,
    ref: `SKY-${2842 + bookings.length}`,
    flightId: parseInt(flightId),
    passengerId: parseInt(passengerId),
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

export { bookings }
export default router