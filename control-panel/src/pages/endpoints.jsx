import { React, useState } from "react";
export default function Endpoints() {

    // Call api to get endpoints list. This is a placeholder for the actual API call.
    const [clients, setClients] = useState([
        { id: 1, name: 'ENV-Lap01', ip : '192.168.0.1', reports: '100' },
        { id: 2, name: 'WKS-02', ip : '192.168.0.2', reports: '25' },
    
    ]);

    return (
    <div class="p-20 w-screen h-screen justify-top items-center flex flex-col">  
        <h1 class="text-3xl font-bold underline"> Endpoints List </h1>

        <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Endpoint Name</th>
                        <th>Endpoint ID</th>
                        <th>Number of Reports</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.map(client =>
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.ip}</td>
                            <td>{client.reports}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    </div>

    );
}