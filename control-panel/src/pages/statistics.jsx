import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 5, label: 'A' },
  { id: 1, value: 10, label: 'B' },
  { id: 2, value: 15, label: 'C' },
  { id: 3, value: 20, label: 'D' },
];


export default function Statistics () {
    return (
        <div class="p-20 w-screen h-screen justify-center items-center flex flex-col">  
            
            <h1 className="text-3xl font-bold underline"> Statistics Page </h1>

            <PieChart
                series={[
                {
                    paddingAngle: 5,
                    innerRadius: 60,
                    outerRadius: 80,
                    data,
                },
                ]}
                width={200}
                height={200}
                hideLegend
            />
        </div>

            

        
    )
}

