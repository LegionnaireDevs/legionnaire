import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Manage_Client() {
    const params = useParams();
    const client_id = params.clientID;

    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);

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
        return <div className="p-20 text-center">Loading client data...</div>;
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

    return (
        <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

            <div className="p-20 w-screen h-screen flex flex-col items-center">
                <h1 className="pb-5 text-3xl font-bold underline">Manage Client: {client.name}</h1>
                <p className="mb-8 text-lg text-white">IP Address: {client.ip}</p>
                
                {/* Reports Table Section */}
                <h2 className="text-2xl font-semibold mb-4">Detected Reports</h2>
                <table className="table-auto w-full max-w-4xl bg-white border border-gray-300">
                    <thead className="bg-blue-200 text-black">
                        <tr>
                            <th className="p-4 border-b">Report ID</th>
                            <th className="p-4 border-b">Type</th>
                            <th className="p-4 border-b">Timestamp</th>
                            <th className="p-4 border-b">Actions</th> 
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {reports.length > 0 ? (
                            reports.map(report => (
                                <tr key={report.id}>
                                    <td className="p-4 text-center">{report.id}</td>
                                    <td className="p-4 text-center">{report.type}</td>
                                    <td className="p-4 text-center">{report.timestamp}</td>
                                    <td className="p-4 text-center">
                                        {/* Action buttons for each report */}
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleBlock(report.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                            >
                                                Block Network
                                            </button>
                                            <button
                                                onClick={() => handleKillProcess(report.id)}
                                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded text-sm"
                                            >
                                                Kill Process
                                            </button>
                                        
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">No reports found for this client.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}