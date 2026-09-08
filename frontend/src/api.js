const BASE_URL = 'http://localhost:5000/api'

export async function getFlights() {
  const res = await fetch(`${BASE_URL}/flights`)
  if (!res.ok) throw new Error('Failed to fetch flights')
  return res.json()
}

export async function getBookings(status = '') {
  const url = status
    ? `${BASE_URL}/bookings?status=${status}`
    : `${BASE_URL}/bookings`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

export async function createBooking(data) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create booking')
  return res.json()
}

export async function updateBooking(id, data) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update booking')
  return res.json()
}

export async function deleteBooking(id) {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete booking')
  return res.json()
}
export async function getPassengers() {
  const res = await fetch(`${BASE_URL}/passengers`)
  if (!res.ok) throw new Error('Failed to fetch passengers')
  return res.json()
}
export async function createPassenger(data) {
  const res = await fetch(`${BASE_URL}/passengers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create passenger')
  return res.json()
}

export async function deletePassenger(id) {
  const res = await fetch(`${BASE_URL}/passengers/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete passenger')
  return res.json()
}
export async function getAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics/summary`)
  if (!res.ok) throw new Error('Failed to fetch analytics')
  return res.json()
}