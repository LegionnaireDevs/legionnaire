import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Manage_Client() {
    const params = useParams();
    const client_id = params.clientID;

    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard'); 
    }

    // Placeholder data to be replaced with actual API calls.
    const clientData = {
        '1': { id: 1, name: 'ENV-Lap01', ip: '192.168.0.1' },
        '2': { id: 2, name: 'WKS-02', ip: '192.168.0.2' },
    };

    const clientReports = {
        '1': [
            { id: 101, type: 'Malware Detected', timestamp: '2025-08-16 10:00:00', status: 'Blocked' },
            { id: 102, type: 'Suspicious Activity', timestamp: '2025-08-16 10:15:00', status: 'Investigating' },
        ],
        '2': [
            { id: 201, type: 'Unauthorized Access Attempt', timestamp: '2025-08-16 11:30:00', status: 'Closed' },
        ],
    };

    useEffect(() => {
        setClient(clientData[client_id]);
        setReports(clientReports[client_id] || []);
    }, [client_id]);

    if (!client) {
        return (
            <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="flex items-center justify-center h-full">
                    <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-8">
                        <div className="text-white text-xl font-medium">Loading client data...</div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Updated action handlers to accept a report ID
    const handleBlock = (reportId) => {
        alert(`Blocking network for report ID: ${reportId}`);
        // Implement API call to block the specific report
    };

    const handleKillProcess = (reportId) => {
        alert(`Killing process for report ID: ${reportId}`);
        // Implement API call to change the report status to 'Investigating'
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Blocked':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'Investigating':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'Closed':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const getTypeIcon = (type) => {
        if (type.includes('Malware')) return '🛡️';
        if (type.includes('Suspicious')) return '⚠️';
        if (type.includes('Unauthorized')) return '🚫';
        return '📊';
    };

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

            <div className="p-6 w-screen h-screen flex flex-col items-start justify-start">
                {/* Header Section */}
                <div className="flex justify-between items-start w-full max-w-7xl mb-8">
                    <div>
                        
                        <h1 className="pt-20 pb-5 text-3xl font-bold text-white mb-2">Manage Client: {client.name}</h1>
                        <div className="flex items-center">
                            <p className="text-xl text-gray-300">IP Address: </p>
                            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {client.ip}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold">
                            {client.id}
                        </div>
                    </div>
                </div>

                {/* Reports Section */}
                <div className="w-full max-w-7xl mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Detected Reports</h2>
                    <p className="text-lg text-gray-300 mb-6">Security incidents and threat detections for this endpoint.</p>
                </div>

                {/* Reports Table */}
                <div className="w-full max-w-7xl bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Report ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Timestamp
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {reports.length > 0 ? (
                                    reports.map((report, index) => (
                                        <tr 
                                            key={report.id} 
                                            className="hover:bg-white/5 transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                                        {report.id % 100}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2">{getTypeIcon(report.type)}</span>
                                                    <div className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                        {report.type}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-300 font-mono text-sm">
                                                    {report.timestamp}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleBlock(report.id)}
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-xs"
                                                    >
                                                        Block Network
                                                    </button>
                                                    <button
                                                        onClick={() => handleKillProcess(report.id)}
                                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-xs"
                                                    >
                                                        Kill Process
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center">
                                            <div className="text-gray-400 text-lg">
                                                <div className="text-4xl mb-2">📋</div>
                                                No reports found for this client.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}