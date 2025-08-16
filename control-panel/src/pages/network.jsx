import React from "react";

export default function Network() {
    const networkData = [
        { id: 1, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "600", dest_port: "600", protocol: "568" },
        { id: 2, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "658", dest_port: "600", protocol: "0" },
        { id: 3, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "40", dest_port: "600", protocol: "199" },
        { id: 4, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "359", dest_port: "600", protocol: "52" },
        { id: 5, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "40", dest_port: "600", protocol: "51" }
    ];

    const getProtocolInfo = (protocol) => {
        const protocolNum = parseInt(protocol);
        if (protocolNum === 0) return { name: "HOPOPT", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
        if (protocolNum === 6) return { name: "TCP", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
        if (protocolNum === 17) return { name: "UDP", color: "bg-green-500/20 text-green-300 border-green-500/30" };
        if (protocolNum === 1) return { name: "ICMP", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" };
        return { name: `PROTO-${protocol}`, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
    };

    const isPrivateIP = (ip) => {
        return ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.');
    };

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
                {/* Header Container */}
                <div className="w-full max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Network Analysis</h1>
                    <p className="text-xl text-gray-300">Captures network traffic monitoring for attacks.</p>
                </div>

                {/* Network Traffic Table */}
                <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
                    <div className="overflow-x-auto h-full">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Source IP
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Destination IP
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Source Port
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Destination Port
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Protocol
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {networkData.map((log, index) => (
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono border ${isPrivateIP(log.src_ip) ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-orange-500/20 text-orange-300 border-orange-500/30'}`}>
                                                {log.src_ip}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono border ${isPrivateIP(log.dest_ip) ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-orange-500/20 text-orange-300 border-orange-500/30'}`}>
                                                {log.dest_ip}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-white font-medium group-hover:text-blue-300 transition-colors font-mono">
                                                {log.src_port}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-white font-medium group-hover:text-blue-300 transition-colors font-mono">
                                                {log.dest_port}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getProtocolInfo(log.protocol).color}`}>
                                                {getProtocolInfo(log.protocol).name}
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