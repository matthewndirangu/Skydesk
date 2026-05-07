import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import SearchPage from './pages/SearchPage'
import BookingsPage from './pages/BookingsPage'
import BoardingPassPage from './pages/BoardingPassPage'
import PassengersPage from './pages/PassengersPage'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="boarding-pass" element={<BoardingPassPage />} />
          <Route path="passengers" element={<PassengersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;