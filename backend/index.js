import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import flightsRouter from './routes/flights.js';
import bookingsRouter from './routes/bookings.js';
import passengersRouter from './routes/passengers.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/flights', flightsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/passengers', passengersRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'SkyDesk API is running' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`SkyDesk API running on http://localhost:${PORT}`)
})