import React, { useState, useEffect } from "react";

export default function ProgramAnalysis() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchResults() {
          try {
            const res = await fetch("http://localhost:5000/api/malware-results");
            const data = await res.json();
            setResults(data || []);
          } catch (err) {
            console.error("Error fetching malware results:", err);
          }
        }
    
        fetchResults();
        const interval = setInterval(fetchResults, 5000); // optional: refresh every 5s
        return () => clearInterval(interval);
      }, []);
    

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
                    <h1 className="text-3xl font-bold text-white mb-2">Program Analysis</h1>
                    <p className="text-xl text-gray-300">Hashes all running executables on client endpoints. Malicious hashes will be displayed here.</p>
                </div>

                {/* Analysis Table */}
                <div className="w-full max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden flex-1">
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Hash
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Results
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Received At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {results.map((log, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center text-white text-sm font-bold mr-3">
                          {log.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-blue-300 transition-colors">
                      {log.hash}
                    </td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-blue-300 transition-colors">
                    <div>{log.results.description}</div>
                    <div className="capitalize">{log.results.threat_level}</div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium group-hover:text-blue-300 transition-colors">
                    {new Date(log.received_at).toLocaleString()}
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