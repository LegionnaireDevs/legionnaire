import React, { useEffect, useState } from "react";

export default function Logs() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("http://localhost:5000/api/logs");
        const data = await res.json();
        console.log(data);
        setResults(data || []);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    }

    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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

      <div className="w-full max-w-7xl mx-auto p-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
        <p className="text-xl text-gray-300">
          Analysis of system logs, suspicious logs will be shown here.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 pb-6 flex-1 flex flex-col min-h-0">
        
        <div className="flex-shrink-0 bg-black/20 backdrop-blur-lg rounded-t-xl border border-b-0 border-white/10">
          <table className="w-full table-fixed">
            <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30">
              <tr>
                <th className="w-2/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="w-7/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Suspicious Activity
                </th>
                <th className="w-3/12 text-center px-6 py-4 text-sm font-semibold text-white uppercase tracking-wider">
                  Operating System
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-y-auto flex-grow bg-black/20 backdrop-blur-lg rounded-b-xl border border-t-0 border-white/10">
          <table className="w-full table-fixed">
            <tbody className="divide-y divide-white/10">
              {results.length > 0 ? (
                results.map((log, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="w-2/12 px-6 py-4 align-top">
                      <div className="text-white text-sm font-bold">
                        {log.id}
                      </div>
                    </td>

                    <td className="w-7/12 px-6 py-4 align-top">
                      <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                        {log.msg}
                      </div>
                    </td>

                    <td className="w-3/12 px-6 py-4 align-top text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getOSColor(log.os)}`}>
                        {log.os}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
                    Loading system logs or no suspicious activity detected...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}