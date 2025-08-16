import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 10, label: 'OK', color: 'green'},
    { id: 1, value: 3, label: 'Moderate', color: 'Yellow' },
    { id: 2, value: 1, label: 'Critical', color: 'red'},

];


export default function Statistics () {
    return (
        <div class="p-20 w-screen h-screen justify-center items-center flex flex-col">  
            <h1 class="text-3xl font-bold underline"> Statistics Page </h1>

            <div class = "pt-20 grid grid-cols-2 gap-8 justify-center justify-items-center">
                <div class='flex flex-col items-center'>
                    <p class="text-2xl font-bold">Software Issues</p>
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
                
                <div class='flex flex-col items-center'>
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

            

        
    )
}

