import React from "react";
export default function ProgramAnalysis() {
    const programData = [
        { id: 1, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Trojan" },
        { id: 2, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Backdoor" },
        { id: 3, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Rat" },
        { id: 4, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Remote execution" },
        { id: 5, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "AnyDesk Backdoor" },
        { id: 6, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Crypto Drainer" },
        { id: 7, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Trojan" },
        { id: 8, hash: "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e", timestamp: "16/08/25 18:42", result: "Trojan" }
    ];
    return (
            <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                 <div className="p-6 w-screen h-screen flex flex-col items-start justify-start">
                    <h1 className="text-3xl font-bold"> Program Analysis </h1>
                    <p className="pt-2 text-xl mb-8">Hashes all running executables on client endpoints. Malicious hashes will be displayed here.</p>
                    
                    
                    <div className="w-full max-w-7xl bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Hash
                                    </th>
                                    <th className="px-30 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        TimeStamp
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Result
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {programData.map((log, index) => (
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
                                                {log.hash}
                                            </div>
                                        </td>
                                        <td className="px-30 py-4">
                                            <div className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.timestamp}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-white font-medium group-hover:text-red-300 transition-colors">
                                                {log.result}
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