import React, { useState, useEffect } from "react";

export default function Network() {
    const [networkData, setNetworkData] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "http://127.0.0.1:5000/api/flows";
    const DATA_LIMIT = 50; 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}?page=${page}&limit=${DATA_LIMIT}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched network data:", data);

                const formattedData = data.flows.map((item, index) => ({
                    id: (page - 1) * DATA_LIMIT + index,
                    src_ip: item.src_ip,
                    dest_ip: item.dst_ip,
                    src_port: item.src_port,
                    dest_port: item.dst_port,
                    protocol: item.Label.toString()
                }));

                setNetworkData(prevData => [...prevData, ...formattedData]);
                setTotalPages(data.total_pages);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch network data:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const getProtocolInfo = (protocol) => {
        const protocolNum = parseInt(protocol);
        if (protocolNum === 0) return { name: "HOPOPT", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
        if (protocolNum === 6) return { name: "TCP", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
        if (protocolNum === 17) return { name: "UDP", color: "bg-green-500/20 text-green-300 border-green-500/30" };
        if (protocolNum === 1) return { name: "ICMP", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" };
        return { name: `Type-${protocol}`, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
    };

    const isPrivateIP = (ip) => {
        return typeof ip === 'string' && (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.'));
    };

    if (page === 1 && loading) {
        return (
             <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-900 to-purple-900">
                <p className="text-white text-xl">Loading initial network data...</p>
            </div>
        );
    }
    
    // if (error) {
    //     return (
    //          <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-900 to-purple-900">
    //             <p className="text-red-400 text-xl">Error: Failed to load data. {error}</p>
    //         </div>
    //     );
    // }

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
                <h1 className="text-3xl font-bold text-white mb-2">Network Analysis</h1>
                <p className="text-xl text-gray-300">Live monitoring of potentially malicious network traffic.</p>
            </div>
    
            <div className="w-full max-w-7xl mx-auto px-6 pb-6 flex-1 flex flex-col min-h-0">
              <div className="flex-shrink-0 bg-black/20 backdrop-blur-lg rounded-t-xl border border-b-0 border-white/10">
                <table className="w-full table-fixed">
                  <thead className="bg-gradient-to-r from-purple-600/30 to-blue-600/30">
                    <tr>
                      <th className="w-3/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Source IP
                      </th>
                      <th className="w-3/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Destination IP
                      </th>
                      <th className="w-2/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Source Port
                      </th>
                      <th className="w-2/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Destination Port
                      </th>
                      <th className="w-2/12 px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Detected Type
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
    
              <div className="overflow-y-auto flex-grow bg-black/20 backdrop-blur-lg rounded-b-xl border border-t-0 border-white/10">
                <table className="w-full table-fixed">
                  <tbody className="divide-y divide-white/10">
                    {networkData.length > 0 ? (
                      networkData.map((log, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors duration-200 group">
                          <td className="w-3/12 px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono border ${isPrivateIP(log.src_ip) ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-orange-500/20 text-orange-300 border-orange-500/30'}`}>
                              {log.src_ip}
                            </span>
                          </td>
                          <td className="w-3/12 px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono border ${isPrivateIP(log.dest_ip) ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-orange-500/20 text-orange-300 border-orange-500/30'}`}>
                              {log.dest_ip}
                            </span>
                          </td>
                          <td className="w-2/12 px-6 py-4 whitespace-nowrap">
                            <div className="text-white font-medium group-hover:text-blue-300 transition-colors font-mono">
                              {log.src_port}
                            </div>
                          </td>
                          <td className="w-2/12 px-6 py-4 whitespace-nowrap">
                            <div className="text-white font-medium group-hover:text-blue-300 transition-colors font-mono">
                              {log.dest_port}
                            </div>
                          </td>
                          <td className="w-2/12 px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getProtocolInfo(log.protocol).color}`}>
                              {getProtocolInfo(log.protocol).name}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                          Loading network data or no malicious activity currently detected...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {/* Load More Footer inside the scrollable area */}
                {(page < totalPages || (page >= totalPages && networkData.length > 0)) && (
                  <div className="p-4 border-t border-white/10 text-center">
                    {page < totalPages && (
                      <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Loading...' : 'Load More'}
                      </button>
                    )}
                    {page >= totalPages && networkData.length > 0 && (
                      <p className="text-gray-400">End of results.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
      );
    }