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
        <div className="p-15 w-screen h-screen flex">  
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-black mb-8">Statistics</h1>
                
                <div className="flex flex-col gap-8">
                    <div className='flex flex-col items-center'>
                        <p className="text-xl font-bold text-black mb-4">Software Issues</p>
                        {showCharts ? (
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
                        ) : (
                            <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            </div>
                        )}
                    </div>
                    
                    <div className='flex flex-col items-center'>
                        <p className="text-xl font-bold text-black mb-4">Network Issues</p>
                        {showCharts ? (
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
                        ) : (
                            <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}