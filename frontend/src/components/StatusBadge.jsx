const styles = {
    Confirmed: 'bg-green-500/20 text-green-400',
    Pending: 'bg-yellow-500/20 text-yellow-400',
    Boarded: 'bg-blue-500/20 text-blue-400',
    Cancelled: 'bg-red-500/20 text-red-400',
}

function StatusBadge({ status }) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    )
}

export default StatusBadge
