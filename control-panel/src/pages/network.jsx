import React from "react";
export default function Network() {
    const networkData = [
        { id: 1, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "600", dest_port: "600", protocol: "568" },
        { id: 2, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "658", dest_port: "600", protocol: "0" },
        { id: 3, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "40", dest_port: "600", protocol: "199" },
        { id: 4, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "359", dest_port: "600", protocol: "52" },
        { id: 5, src_ip: "128.192.0.0", dest_ip: "1.1.1.1", src_port: "40", dest_port: "600", protocol: "51" }
        
    ];
    return (
            <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="p-6 w-screen h-screen flex flex-col items-start justify-start">
                    <h1 className="text-3xl font-bold"> Network Analysis </h1>
                    <p className="pt-2 text-xl mb-8">Captures network traffic monitoring for attacks.</p>
                

                    <div className="w-full max-w-7xl bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10">
                                <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Id
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
                                        Destionation Port
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
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                                    {log.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.src_ip}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.dest_ip}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.src_port}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.dest_port}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.protocol}
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