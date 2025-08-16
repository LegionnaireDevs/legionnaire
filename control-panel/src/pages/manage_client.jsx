
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Manage_Client() {
    let params  = useParams(); // Correctly destructure the 'clientId' parameter
    const client_id = params.clientID; // Use the clientId in your component logic

    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);

    // Placeholder data for demonstration. To be replaced with actual API calls.
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
        // Replace this with an actual API call to fetch client data
        setClient(clientData[client_id]);
        setReports(clientReports[client_id] || []);
    }, [client_id]);

    if (!client) {
        return <div className="p-20 text-center">Loading client data...</div>;
    }
    
    // Action handler functions
    const handleBlockNetwork = () => {
        console.log(`Blocking network actions for client ${client.name}`);
        // Implement API call to block network actions
    };

    const handleKillProcesses = () => {
        console.log(`Killing processes on client ${client.name}`);
        // Implement API call to kill processes
    };

    const handleDeleteFiles = () => {
        console.log(`Deleting harmful files on client ${client.name}`);
        // Implement API call to delete files
    };

    return (
        <div className="p-20 w-screen h-screen flex flex-col items-center">
            <h1 className="pb-5 text-3xl font-bold underline">Manage Client: {client.name}</h1>
            <p className="mb-8 text-lg text-gray-600">IP Address: {client.ip}</p>
            
            {/* Action Buttons Section */}
            <div className="flex gap-4 mb-12">
                <button
                    onClick={handleBlockNetwork}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Block Network Actions
                </button>
                <button
                    onClick={handleKillProcesses}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                    Kill Processes
                </button>
                <button
                    onClick={handleDeleteFiles}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" // Ensure text-white is used
                >
                    Delete Harmful Files
                </button>
            </div>
            
            {/* Reports Table Section */}
            <h2 className="text-2xl font-semibold mb-4">Detected Reports</h2>
            <table className="table-auto w-full max-w-4xl bg-white border border-gray-300">
                <thead className="bg-blue-200 text-black">
                    <tr>
                        <th className="p-4 border-b">Report ID</th>
                        <th className="p-4 border-b">Type</th>
                        <th className="p-4 border-b">Timestamp</th>
                        <th className="p-4 border-b">Status</th>
                    </tr>
                </thead>
                <tbody className="text-black">
                    {reports.length > 0 ? (
                        reports.map(report => (
                            <tr key={report.id}>
                                <td className="p-4 text-center">{report.id}</td>
                                <td className="p-4 text-center">{report.type}</td>
                                <td className="p-4 text-center">{report.timestamp}</td>
                                <td className="p-4 text-center">{report.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-4 text-center text-gray-500">No reports found for this client.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}