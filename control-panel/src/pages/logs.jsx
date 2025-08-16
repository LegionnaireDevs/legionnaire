import React from "react";

export default function Logs() {
    const logData = [
        { id: 1, suspicious: "Failed login attempt from IP 192.168.1.100", os: "Windows 11" },
        { id: 2, suspicious: "Unusual network traffic detected on port 443", os: "Ubuntu 22.04" },
        { id: 3, suspicious: "Unauthorized file access in /etc/passwd", os: "CentOS 8" },
        { id: 4, suspicious: "Multiple authentication failures", os: "macOS Ventura" },
        { id: 5, suspicious: "Suspicious process spawning: cmd.exe", os: "Windows Server 2022" },
        { id: 6, suspicious: "Elevated privilege escalation attempt", os: "RHEL 9" },
        { id: 7, suspicious: "Anomalous database query patterns", os: "Ubuntu 20.04" },
        { id: 8, suspicious: "Unexpected outbound connection to unknown host", os: "Windows 10" }
    ];

    const getOSInfo = (os) => {
        if (os.toLowerCase().includes('windows')) {
            return { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '🪟' };
        } else if (os.toLowerCase().includes('ubuntu') || os.toLowerCase().includes('centos') || os.toLowerCase().includes('rhel')) {
            return { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', icon: '🐧' };
        } else if (os.toLowerCase().includes('macos')) {
            return { color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: '🍎' };
        }
        return { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '💻' };
    };

    const getSeverityLevel = (suspicious) => {
        if (suspicious.toLowerCase().includes('failed login') || suspicious.toLowerCase().includes('authentication')) {
            return { level: 'Medium', color: 'text-yellow-300' };
        } else if (suspicious.toLowerCase().includes('unauthorized') || suspicious.toLowerCase().includes('privilege escalation')) {
            return { level: 'High', color: 'text-red-300' };
        } else if (suspicious.toLowerCase().includes('suspicious') || suspicious.toLowerCase().includes('anomalous')) {
            return { level: 'High', color: 'text-red-300' };
        }
        return { level: 'Low', color: 'text-green-300' };
    };

    return (
        <div className="min-h-screen w-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

            <div className="p-6 pb-8 min-h-screen flex flex-col">
                {/* Header Container */}
                <div className="w-full max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
                    <p className="text-xl text-gray-300">Analysis of system logs, suspicious logs will be shown here.</p>
                </div>

                {/* Logs Table */}
                <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
                    <div className="overflow-auto h-full">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Suspicious Activity
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Operating System
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Severity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {logData.map((log, index) => (
                                    <tr 
                                        key={log.id} 
                                        className="hover:bg-white/5 transition-colors duration-200 group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                                                    {log.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`text-white font-medium group-hover:text-amber-300 transition-colors ${getSeverityLevel(log.suspicious).color}`}>
                                                {log.suspicious}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getOSInfo(log.os).color}`}>
                                                <span className="mr-1">{getOSInfo(log.os).icon}</span>
                                                {log.os}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                                                getSeverityLevel(log.suspicious).level === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                                getSeverityLevel(log.suspicious).level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                                'bg-green-500/20 text-green-300 border-green-500/30'
                                            }`}>
                                                {getSeverityLevel(log.suspicious).level}
                                            </span>
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