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
            {/* Header and Button Container */}
            <div className="flex justify-between items-center w-full max-w-4xl mb-8">
                <h1 className="text-3xl font-bold underline">Endpoints List</h1>
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