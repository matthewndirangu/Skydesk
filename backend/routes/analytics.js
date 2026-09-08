import express from 'express'
import { bookings } from './bookings.js'
import { flights } from './flights.js'

const router = express.Router()

router.get('/summary', (req, res) => {
  const activeBookings = bookings.filter((b) => b.status !== 'Cancelled')

  function getFlight(flightId) {
    return flights.find((f) => f.id === flightId)
  }

  const totalRevenue = activeBookings.reduce((sum, b) => {
    const flight = getFlight(b.flightId)
    return sum + (flight ? flight.price : 0)
  }, 0)

  const totalBookings = bookings.length
  const avgTicketPrice = activeBookings.length > 0
    ? Math.round(totalRevenue / activeBookings.length)
    : 0

  const bookingsByStatus = {
    Confirmed: 0,
    Pending: 0,
    Boarded: 0,
    Cancelled: 0,
  }
  bookings.forEach((b) => {
    if (bookingsByStatus[b.status] !== undefined) bookingsByStatus[b.status]++
  })

  const routeMap = {}
  activeBookings.forEach((b) => {
    const flight = getFlight(b.flightId)
    if (!flight) return
    const key = `${flight.origin} → ${flight.destination}`
    if (!routeMap[key]) {
      routeMap[key] = { route: key, bookings: 0, revenue: 0 }
    }
    routeMap[key].bookings++
    routeMap[key].revenue += flight.price
  })
  const topRoutes = Object.values(routeMap).sort((a, b) => b.bookings - a.bookings)
  const busiestRoute = topRoutes.length > 0 ? topRoutes[0].route : 'N/A'

  const monthMap = {}
  activeBookings.forEach((b) => {
    const flight = getFlight(b.flightId)
    if (!flight) return
    const date = new Date(b.createdAt)
    const monthLabel = date.toLocaleDateString('en-GB', { month: 'short' })
    if (!monthMap[monthLabel]) monthMap[monthLabel] = 0
    monthMap[monthLabel] += flight.price
  })
  const revenueByMonth = Object.entries(monthMap).map(([month, revenue]) => ({
    month,
    revenue,
  }))

  res.json({
    totalRevenue,
    totalBookings,
    avgTicketPrice,
    busiestRoute,
    bookingsByStatus,
    topRoutes,
    revenueByMonth,
  })
})

export default router
