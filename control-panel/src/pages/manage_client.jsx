import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Manage_Client() {
    const params = useParams();
    const client_id = params.clientID;
    const [activeTab, setActiveTab] = useState("clients"); 

    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);

    const navigate = useNavigate();

    const handleBackToEndpoints = () => {
        // Navigate back to dashboard with endpoints tab active
        navigate('/dashboard', { state: { activeTab: 'endpoints' } });
      };

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

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Layout */}
            <div className="relative z-10 flex" style={{height: 'calc(100vh - 80px)', marginTop: '65px'}}>
                {/* Left Toolbar */}
                <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10">
                    <div className="w-full max-w-7xl mx-auto mb-8">
                        <h1 className="text-white text-lg font-semibold mb-8 px-8 py-3">
                            Manage Client
                        </h1>
                        <nav className="space-y-2">
                            <button
                                onClick={handleBackToEndpoints}
                                className="w-full flex items-center px-2 py-3 rounded-lg text-left transition-all duration-200 text-gray-300 hover:bg-white/10 hover:text-white font-bold"
                            >
                                ← Back to EndPoints
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-6">
                    <div className="h-full backdrop-blur-sm rounded-xl opacity-90 shadow-2xl border border-white/20 overflow-auto p-8">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Manage Client: {client.name}
                                </h1>
                                <div className="flex items-center">
                                    <p className="text-lg text-white">IP Address:</p>
                                    <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-300">
                                        {client.ip}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Reports */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Detected Reports</h2>
                            <p className="text-lg text-white-900 mb-6">Security incidents and threat detections for this endpoint.</p>
                        </div>

                        {/* Reports Table */}
                        <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
                            <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Report ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Timestamp</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {reports.length > 0 ? (
                                        reports.map((report) => (
                                            <tr key={report.id} className="hover:bg-blue transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                                        {report.id % 100}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 flex items-center">
                                                    <span className="text-lg mr-2">{getTypeIcon(report.type)}</span>
                                                    <span className="text-white font-medium">{report.type}</span>
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
                                                    <button
                                                        onClick={() => handleBlock(report.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition text-xs"
                                                    >
                                                        Block Network
                                                    </button>
                                                    <button
                                                        onClick={() => handleKillProcess(report.id)}
                                                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg transition text-xs"
                                                    >
                                                        Kill Process
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                <div className="text-4xl mb-2">📋</div>
                                                No reports found for this client.
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