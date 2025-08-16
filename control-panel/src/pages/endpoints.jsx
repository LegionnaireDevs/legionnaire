import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Endpoints() {
    const navigate = useNavigate();
    
    const handleManageClient = (clientID) => {
        navigate(`/manage_client/${clientID}`);
    }
    
    const handleNewClient = () => {
        navigate('/new_client');
    }

    // Call api to get endpoints list. This is a placeholder for the actual API call.
    const [clients, setClients] = useState([
        { id: 1, name: 'ENV-Lap01', ip: '192.168.0.1', reports: '100' },
        { id: 2, name: 'WKS-02', ip: '192.168.0.2', reports: '25' },
    ]);

    return (
        <div className="min-h-screen max-h-screen w-full max-w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

            <div className="p-6 h-full flex flex-col">
                {/* Header and Button Container */}
                <div className="flex justify-between items-center w-full max-w-7xl mx-auto mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Endpoints List</h1>
                        <p className="text-xl text-gray-300">Manage and monitor your system endpoints.</p>
                    </div>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        onClick={handleNewClient}
                    >
                        Add Endpoint
                    </button>
                </div>

                {/* Endpoints Table */}
                <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
                    <div className="overflow-x-auto h-full">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Endpoint ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Endpoint Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Endpoint IP
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Reports
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {clients.map((client, index) => (
                                    <tr 
                                        key={client.id} 
                                        className="hover:bg-white/5 transition-colors duration-200 group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                                                {client.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                
                                                <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                                                    {client.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                {client.ip}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                                                <span className="text-white font-medium">
                                                    {client.reports}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                onClick={() => handleManageClient(client.id)}
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}