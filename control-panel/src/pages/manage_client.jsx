import  React from "react";
import { useParams } from 'react-router-dom';

export default function Manage_Client() {
    let params  = useParams(); // Correctly destructure the 'clientId' parameter
    
    console.log(params.clientID); // Log the clientId for debugging
    const client_id = params.clientID; // Use the clientId in your component logic
    return (
        <div>
            <div className="p-20 w-screen h-screen justify-start items-center flex flex-col"> 
                <h1 className="pb-5 text-3xl font-bold underline"> Manage Endpoint for client {client_id}</h1>
            </div>
        </div>
    );
}