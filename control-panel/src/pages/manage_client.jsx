import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClientById } from '../components/ApiService';

export default function Manage_Client() {
    const params = useParams();
    const client_id = params.clientID;
    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    const handleBackToEndpoints = () => {
        navigate('/dashboard', { state: { activeTab: 'endpoints' } });
    };

    // Placeholder data to be replaced with actual API calls.
    const clientReports = {
        '1': [
            { id: 101, type: 'Malware Detected', timestamp: '2025-08-16 10:00:00', status: 'Blocked' },
            { id: 102, type: 'Suspicious Activity', timestamp: '2025-08-16 10:15:00', status: 'Investigating' },
        ],
        '2': [
            { id: 201, type: 'Unauthorized Access Attempt', timestamp: '2025-08-16 11:30:00', status: 'Closed' },
        ],
    };

    // Fetches the client data
    useEffect(() => {
        fetchClientById(client_id)
            .then(response => {
                setClient(response || null);
            })
            .catch(error => console.error("Failed to fetch client:", error));
    }, [client_id]);

    // Sets the reports based on the fetched client ID
    useEffect(() => {
        if (client) {
            const clientReportsKey = String(client.id);
            const fetchedReports = clientReports[clientReportsKey] || [];
            setReports(fetchedReports);
        }
    }, [client]);

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
    
    const handleBlock = (reportId) => {
        alert(`Blocking network for report ID: ${reportId}`);
    };

    const handleKillProcess = (reportId) => {
        alert(`Killing process for report ID: ${reportId}`);
    };

    const handleDeleteSoftware = (reportId) => {
        alert(`Deleting software for report ID: ${reportId}`);
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
            {/* Background elements */}
            <div className="absolute top-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-1200"></div>
            <div className="absolute top-1/3 left-16 w-1 h-1 bg-white rounded-full animate-ping delay-800"></div>
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-400"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Layout */}
            <div className="relative z-10 flex" style={{height: 'calc(100vh - 80px)', marginTop: '65px'}}>
                
                {/* Left Toolbar */}
                <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10">
                    <div className="w-full max-w-7xl mx-auto">
                        <h1 className="text-white text-lg font-semibold mb-8 px-8 py-3">
                            Manage Client
                        </h1>
                        <nav className="space-y-2 px-4">
                            <button
                                onClick={handleBackToEndpoints}
                                className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 text-gray-300 hover:bg-white/10 hover:text-white font-bold"
                            >
                                ← Back to EndPoints
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-6 overflow-auto" style={{height: 'calc(100vh - 80px)'}}>
                    
                    {/* Header */}
                    <div className="w-full max-w-7xl mx-auto mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Manage Client: {client.name}
                        </h1>
                        <div className="flex items-center">
                            <p className="text-lg text-gray-300">IP Address:</p>
                            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {client.ip}
                            </span>
                        </div>
                    </div>

                    {/* Reports Table */}
                    <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Report ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Timestamp</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {reports.length > 0 ? (
                                        reports.map((report) => (
                                            <tr key={report.id} className="hover:bg-white/5 transition-colors duration-200 group">
                                                <td className="px-6 py-4 whitespace-nowrap text-white text-sm font-medium">
                                                    {report.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="text-lg mr-2">{getTypeIcon(report.type)}</span>
                                                        <span className="text-white font-medium">{report.type}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                    {report.timestamp}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                    <button onClick={() => handleBlock(report.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition text-xs">
                                                        Block Network
                                                    </button>
                                                    <button onClick={() => handleKillProcess(report.id)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg transition text-xs">
                                                        Kill Process
                                                    </button>
                                                    <button onClick={() => handleDeleteSoftware(report.id)} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg transition text-xs">
                                                        Delete Software
                                                    </button>
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
        </div>
    );
}
