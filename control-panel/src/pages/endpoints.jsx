import { React, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Endpoints() {

    const navigate = useNavigate(); // Initialize navigate function 
    const handleManageClient = (clientID) => {
        navigate(`/manage_client/${clientID}`);
    }
    const handleNewClient = () => {
        navigate('/new_client'); // Navigate to the new client page
    }

    // Call api to get endpoints list. This is a placeholder for the actual API call.
    const [clients, setClients] = useState([
        { id: 1, name: 'ENV-Lap01', ip: '192.168.0.1', reports: '100' },
        { id: 2, name: 'WKS-02', ip: '192.168.0.2', reports: '25' },

    ]);

    return (
        <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Floating particles */}
            <div className="absolute top-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-1200"></div>
            <div className="absolute top-1/3 left-16 w-1 h-1 bg-white rounded-full animate-ping delay-800"></div>
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-400"></div>
            <div className="absolute top-2/3 right-16 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-900"></div>
            <div className="absolute top-20 right-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-600"></div>
            <div className="absolute bottom-16 left-1/5 w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-1100"></div>
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></div>
            <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white rounded-full animate-ping delay-1300"></div>
            <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-20 right-2/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-40 left-3/4 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-40 left-1/2 w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-400"></div>
            <div className="absolute top-1/6 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-800"></div>
            <div className="absolute bottom-1/6 left-3/5 w-1 h-1 bg-white rounded-full animate-ping delay-600"></div>
            {/* Header and Button Container */}
            <div className="flex justify-between items-center w-full max-w-4xl mb-8">
                <h1 className="text-white text-lg font-semibold mb-8">Endpoints List</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNewClient}
                >
                    Add
                </button>
            </div>

            {/* Endpoints Table */}
            <table className="table-auto w-full max-w-4xl bg-white border border-gray-300">
                <thead className='bg-blue-300 text-black'>
                    <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Endpoint Name</th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Endpoint IP</th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Reports</th>
                    </tr>
                </thead>
                <tbody className='text-black'>
                    {clients.map(client =>
                        <tr key={client.id}>
                            <td className='text-center'>{client.name}</td>
                            <td className='text-center'>{client.ip}</td>
                            <td className='text-center'>
                                <div className="flex justify-between items-center px-4">
                                    {client.reports}
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleManageClient(client.id)}
                                    >Manage</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}