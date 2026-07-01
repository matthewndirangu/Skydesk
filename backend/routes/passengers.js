import express from 'express'

const router = express.Router()

let passengers = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'Carter',
    email: 'james.carter@email.com',
    passport: 'GB1234567',
    nationality: 'British',
  },
  {
    id: 2,
    firstName: 'Sofia',
    lastName: 'Mendes',
    email: 'sofia.mendes@email.com',
    passport: 'PT9876543',
    nationality: 'Portuguese',
  },
  {
    id: 3,
    firstName: 'Liam',
    lastName: 'Chen',
    email: 'liam.chen@email.com',
    passport: 'US4567891',
    nationality: 'American',
  },
]

router.get('/', (req, res) => {
  res.json(passengers)
})

router.post('/', (req, res) => {
  const { firstName, lastName, email, passport, nationality } = req.body

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'firstName, lastName and email are required' })
  }

  const newPassenger = {
    id: passengers.length + 1,
    firstName,
    lastName,
    email,
    passport,
    nationality,
  }

  passengers.push(newPassenger)
  res.status(201).json(newPassenger)
})

router.delete('/:id', (req, res) => {
  const index = passengers.findIndex((p) => p.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ error: 'Passenger not found' })
  }

  const deleted = passengers[index]
  passengers = passengers.filter((p) => p.id !== parseInt(req.params.id))
  res.json({ message: 'Passenger removed', passenger: deleted })
})

export default router