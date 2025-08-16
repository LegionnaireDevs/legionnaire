import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 10, label: 'OK', color: 'green'},
    { id: 1, value: 3, label: 'Moderate', color: 'Yellow' },
    { id: 2, value: 1, label: 'Critical', color: 'red'},
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

    return (
        <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <h1 className="text-white text-lg font-semibold mb-8">Statistics</h1>
            
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

            <div className = "pt-20 grid grid-cols-2 gap-8 justify-center justify-items-center">
                <div className='flex flex-col items-center'>
                    <p className="text-2xl font-bold">Software Issues</p>
                    <PieChart
                        series={[
                        {
                            paddingAngle: 5,
                            innerRadius: 80,
                            outerRadius: 150,
                            data,
                        },
                        ]}
                        width={400}
                        height={400}
                        hideLegend
                    />
                </div>
                
                <div className='flex flex-col items-center'>
                    <p className="text-2xl font-bold">Network Issues</p>

                    <PieChart
                        series={[
                        {
                            paddingAngle: 5,
                            innerRadius: 80,
                            outerRadius: 150,
                            data,
                        },
                        ]}
                        width={400}
                        height={400}
                        hideLegend
                    />
                </div>
            </div>
        </div>
    );
}