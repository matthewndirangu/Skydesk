import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: '📊 Dashboard'},
    { to: '/search', label: '🔍 Flight Search'},
    { to: '/bookings', label: '📋 Bookings'},
    { to: '/boarding-pass', label: '🎫 Boarding Pass'},
    { to: '/passengers', label: '👥 Passengers'},
    { to: '/analytics', label: '📈Analytics'},
]

function Sidebar(){
    return(
        <aside className="w-64 bg-gray-800 min-h-screen p-4">
            <div className="mb-6">
                <h1 className= "text-xl font-bold text-blue-400">✈ SkyDesk</h1>
                <p className ="text-gray-500 text-xs mt-1">Ticket Management</p>
            </div>
            <nav className="flex flex-col gap-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive}) =>
                        `px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        
                        }`
                    }
                >
                    {link.label}
                </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar