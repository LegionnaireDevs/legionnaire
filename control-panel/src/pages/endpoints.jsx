import { React, useState } from "react";
export default function Endpoints() {

    // Call api to get endpoints list. This is a placeholder for the actual API call.
    const [clients, setClients] = useState([
        { id: 1, name: 'ENV-Lap01', ip : '192.168.0.1', reports: '100' },
        { id: 2, name: 'WKS-02', ip : '192.168.0.2', reports: '25' },
    
    ]);

    return (
        <div class="p-20 w-screen h-screen justify-start items-center flex flex-col"> 
        <h1 class="pb-5 -3xl font-bold underline"> Endpoints List </h1>

        <table class="table table-auto w-full bg-white border border-gray-300">
                <thead class='bg-blue-300 text-black'>
                    <tr>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50"> Endpoint Name </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Endpoint IP</th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Reports</th>
                    </tr>
                </thead>
                <tbody class = 'text-black'>
                    {clients && clients.map(client =>
                        <tr key={client.id}>
                            <td class = 'text-center'>{client.name}</td>
                            <td class = 'text-center'>{client.ip}</td>
                            <td class = 'text-center'>
                                <div class="flex justify-between items-center px-4">
                                    {client.reports}
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded">Manage</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}