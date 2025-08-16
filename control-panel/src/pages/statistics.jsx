import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 10, label: 'OK', color: '#10b981' },
    { id: 1, value: 3, label: 'Moderate', color: '#f59e0b' },
    { id: 2, value: 1, label: 'Critical', color: '#ef4444' },
];

export default function Statistics() {
    const [showCharts, setShowCharts] = useState(false);

    useEffect(() => {
        // Delay the chart loading by 1.5 seconds
        const timer = setTimeout(() => {
            setShowCharts(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const StatCard = ({ title, children }) => (
        <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
            {children}
        </div>
    );

    const LegendItem = ({ color, label, value }) => (
        <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center">
                <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: color }}
                ></div>
                <span className="text-white font-medium">{label}</span>
            </div>
            <span className="text-gray-300 font-semibold">{value}</span>
        </div>
    );

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
                {/* Header Section */}
                <div className="w-full max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Statistics Dashboard</h1>
                    <p className="text-xl text-gray-300">System health and security metrics overview.</p>
                </div>

                {/* Charts Section */}
                <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
                    <StatCard title="Software Issues">
                        <div className="flex flex-col items-center">
                            {showCharts ? (
                                <div className="mb-6">
                                    <PieChart
                                        series={[
                                            {
                                                paddingAngle: 5,
                                                innerRadius: 60,
                                                outerRadius: 120,
                                                data,
                                            },
                                        ]}
                                        width={300}
                                        height={300}
                                        hideLegend
                                    />
                                </div>
                            ) : (
                                <div className="w-[300px] h-[300px] flex items-center justify-center mb-6">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                                </div>
                            )}
                            
                            {/* Custom Legend */}
                            <div className="w-full max-w-xs">
                                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                                    {data.map((item) => (
                                        <LegendItem 
                                            key={item.id}
                                            color={item.color}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </StatCard>
                    
                    <StatCard title="Network Issues">
                        <div className="flex flex-col items-center">
                            {showCharts ? (
                                <div className="mb-6">
                                    <PieChart
                                        series={[
                                            {
                                                paddingAngle: 5,
                                                innerRadius: 60,
                                                outerRadius: 120,
                                                data,
                                            },
                                        ]}
                                        width={300}
                                        height={300}
                                        hideLegend
                                    />
                                </div>
                            ) : (
                                <div className="w-[300px] h-[300px] flex items-center justify-center mb-6">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                                </div>
                            )}
                            
                            {/* Custom Legend */}
                            <div className="w-full max-w-xs">
                                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                                    {data.map((item) => (
                                        <LegendItem 
                                            key={item.id}
                                            color={item.color}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </StatCard>
                </div>

                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
                    <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">14</div>
                        <div className="text-sm text-gray-300">Total OK Systems</div>
                    </div>
                    <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">6</div>
                        <div className="text-sm text-gray-300">Moderate Issues</div>
                    </div>
                    <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">2</div>
                        <div className="text-sm text-gray-300">Critical Issues</div>
                    </div>
                </div>
            </div>
        </div>
    );
}