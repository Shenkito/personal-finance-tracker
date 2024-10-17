const UpcomingBillsCard = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Bills</h2>
            <div className="flex-1 overflow-auto">
                <ul className="space-y-2">
                    <li className="text-sm text-gray-500">Rent</li>
                    <li className="text-sm text-gray-500">Utilities</li>
                    {/* Add more bills here */}
                </ul>
            </div>
        </div>
    );
};

export default UpcomingBillsCard;
