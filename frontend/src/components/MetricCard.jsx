function MetricCard({ title, value, icon, color}) {
    return (
        <div className="bg-gray-800 rounded-xl p-5 flex items-center gap-4">
            <div className={`text-3xl p-3 rounded-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-400 text-sm">{title}</p>
                <p className="text-white text-2xl font-bold">{value}</p>
            </div>
        </div>
    )
}

export default MetricCard;