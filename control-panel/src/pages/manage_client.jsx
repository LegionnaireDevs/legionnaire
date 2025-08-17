import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// --- API Functions ---
// (These remain the same as before)
const API_BASE_URL = 'http://127.0.0.1:5000';

const postActionToClient = async (clientId, action, body) => {
    const response = await fetch(`${API_BASE_URL}/api/clients/${clientId}/actions/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred.' }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    return response.json();
};

export const killProcess = (clientId, processName) => postActionToClient(clientId, 'kill-process', { processName });
export const deleteFile = (clientId, location, recurse) => postActionToClient(clientId, 'delete-file', { location, recurse });
export const createFirewallRule = (clientId, ruleDetails) => postActionToClient(clientId, 'create-firewall-rule', ruleDetails);

const fetchClientById = (clientId) => {
    return fetch(`${API_BASE_URL}/api/clients/${clientId}`).then(response => {
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Network response was not ok for fetching client.');
        }
        return response.json();
    });
};

const fetchReportsByClientId = (clientId) => {
    return fetch(`${API_BASE_URL}/api/clients/${clientId}/reports`).then(response => {
        if (!response.ok) throw new Error('Network response was not ok for fetching reports.');
        return response.json();
    });
};


function ActionForm({ report, actionType, client_id, onExecute, onCancel }) {
    const [params, setParams] = useState({});

    useEffect(() => {
        if (actionType === 'block') {
            setParams({
                direction: "out",
                action: "block",
                protocol: "tcp",
                source: report.details.src_ip || 'any',
                dest: report.details.dst_ip || '',
                port: report.details.dst_port || '',
            });
        } else {
            setParams({});
        }
    }, [actionType, report]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onExecute(actionType, params);
    };

    const renderFormFields = () => {
        switch (actionType) {
            case 'kill':
                return (
                    <input
                        type="text"
                        placeholder="Process Name (e.g., malware.exe)"
                        className="w-full bg-slate-800/50 text-white rounded-md p-2 border border-white/20 focus:ring-purple-500 focus:border-purple-500"
                        onChange={(e) => setParams({ processName: e.target.value })}
                        required
                    />
                );
            case 'delete':
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Full File Path (e.g., C:\Users\Public\bad.dll)"
                            className="w-full bg-slate-800/50 text-white rounded-md p-2 border border-white/20 focus:ring-purple-500 focus:border-purple-500"
                            onChange={(e) => setParams(p => ({ ...p, location: e.target.value }))}
                            required
                        />
                        <label className="flex items-center gap-2 text-gray-300 mt-2">
                            <input
                                type="checkbox"
                                className="rounded bg-slate-800/50 border-white/20 text-purple-500 focus:ring-purple-500"
                                onChange={(e) => setParams(p => ({ ...p, recurse: e.target.checked }))}
                            />
                            Delete Recursively?
                        </label>
                    </>
                );
            case 'block':
                return <p className="text-gray-300">Block network traffic from <strong>{params.source}:{params.port}</strong> to <strong>{params.dest}</strong>?</p>;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-black/30 p-4 mx-4 rounded-lg text-white space-y-4">
            <h4 className="font-bold text-lg text-purple-300">Confirm Action:</h4>
            <div>{renderFormFields()}</div>
            <div className="flex gap-4">
                <button type="submit" className="flex-1 !border-0 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Execute
                </button>
                <button type="button" onClick={onCancel} className="flex-1 !border-0 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Cancel
                </button>
            </div>
        </form>
    );
}


export default function Manage_Client() {
    const params = useParams();
    const client_id = params.clientID;
    const [client, setClient] = useState(null);
    const [reports, setReports] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [activeAction, setActiveAction] = useState(null); 
    const navigate = useNavigate();

    const handleBackToEndpoints = () => navigate('/dashboard', { state: { activeTab: 'endpoints' } });

    useEffect(() => {
        fetchClientById(client_id)
            .then(clientData => {
                setClient(clientData);
                if (clientData) return fetchReportsByClientId(clientData.id);
            })
            .then(reportsData => {
                if (reportsData) setReports(reportsData);
            })
            .catch(error => console.error("Failed to fetch data:", error));
    }, [client_id]);

    const handleRowClick = (reportId) => setExpandedRowId(expandedRowId === reportId ? null : reportId);

    const handleActionClick = (reportId, actionType) => {
        if (activeAction && activeAction.reportId === reportId && activeAction.actionType === actionType) {
            setActiveAction(null);
        } else {
            setActiveAction({ reportId, actionType });
        }
    };

    const handleExecuteAction = async (actionType, params) => {
        try {
            let result;
            if (actionType === 'kill') {
                result = await killProcess(client_id, params.processName);
            } else if (actionType === 'delete') {
                result = await deleteFile(client_id, params.location, !!params.recurse);
            } else if (actionType === 'block') {
                result = await createFirewallRule(client_id, params);
            }
            alert(`Success! Client response: ${result.response}`);
        } catch (error) {
            alert(`Failed to execute action: ${error.message}`);
        } finally {
            setActiveAction(null); 
        }
    };

    const getTypeIcon = (type) => {
        if (type.includes('Malware')) return '🛡️';
        if (type.includes('Suspicious')) return '⚠️';
        if (type.includes('Network')) return '🌐';
        return '📊';
    };

    const renderActions = (report) => {
        const baseButtonClass = "!border-0 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";
        const gradientClass = "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700";

        if (report.type.includes('Network')) {
            return <button onClick={() => handleActionClick(report.id, 'block')} className={`${baseButtonClass} ${gradientClass}`}>Block Network</button>;
        }
        if (report.type.includes('Malware')) {
            return (
                <>
                    <button onClick={() => handleActionClick(report.id, 'kill')} className={`${baseButtonClass} ${gradientClass}`}>Kill Process</button>
                    <button onClick={() => handleActionClick(report.id, 'delete')} className={`${baseButtonClass} ${gradientClass}`}>Delete Software</button>
                </>
            );
        }
        return null;
    };

    if (!client) {
        return <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"><div className="bg-black/20 backdrop-blur-lg rounded-xl p-8 text-white text-xl font-medium">Loading client data...</div></div>;
    }

    return (
        <div className="w-screen h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background elements */}
            <div className="absolute top-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-1200"></div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 flex" style={{ height: 'calc(100vh - 80px)', marginTop: '65px' }}>
                {/* Sidebar */}
                <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10">
                    <div className="p-4"><h1 className="text-white text-lg font-semibold mb-8 px-4 py-3">Manage Client</h1><nav><button onClick={handleBackToEndpoints} className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-white/10 hover:text-white font-bold">← Back to Dashboard</button></nav></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="w-full max-w-7xl mx-auto mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Manage Client: {client.hostname}</h1>
                        <div className="flex items-center"><p className="text-lg text-gray-300">IP Address:</p><span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">{client.ip}</span></div>
                    </div>

                    <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-y-auto">
                        <table className="w-full">
                            <thead className="sticky top-0 bg-slate-900/50 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {reports.length > 0 ? reports.map((report) => (
                                    <React.Fragment key={report.id}>
                                        <tr className="hover:bg-white/5 transition-colors duration-200 group cursor-pointer" onClick={() => handleRowClick(report.id)}>
                                            <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><span className="text-lg mr-2">{getTypeIcon(report.type)}</span><span className="text-white font-medium">{report.type}</span></div></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{new Date(report.timestamp).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 h-full justify-center" onClick={(e) => e.stopPropagation()}>{renderActions(report)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className={`p-0 transition-all duration-300 ease-in-out`}>
                                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedRowId === report.id ? 'max-h-96' : 'max-h-0'}`}>
                                                    <div className="bg-black/30 p-4 mx-4 my-2 rounded-lg text-white"><h4 className="font-bold text-lg mb-2 text-purple-300">Event Details:</h4><pre className="text-sm whitespace-pre-wrap font-mono">{JSON.stringify(report.details, null, 2)}</pre></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className={`p-0 transition-all duration-300 ease-in-out`}>
                                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAction?.reportId === report.id ? 'max-h-96' : 'max-h-0'}`}>
                                                    {activeAction?.reportId === report.id && (
                                                        <ActionForm
                                                            report={report}
                                                            actionType={activeAction.actionType}
                                                            client_id={client_id}
                                                            onExecute={handleExecuteAction}
                                                            onCancel={() => setActiveAction(null)}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-400"><div className="text-4xl mb-2">📋</div>No reports found.</td>
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
