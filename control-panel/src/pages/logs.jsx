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

    return (
        <div className="min-h-screen max-h-screen w-full max-w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="p-6 h-full flex flex-col">
                <div className="w-full max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
                    <p className="text-xl text-gray-300">Analysis of system logs, suspicious logs will be shown here.</p>
                </div>
                
                <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
                    <div className="overflow-x-auto h-full">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Suspicious Log
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        OS
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
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                                    {log.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.suspicious}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                {log.os}
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