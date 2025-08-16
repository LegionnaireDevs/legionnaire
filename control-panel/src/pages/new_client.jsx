import React from 'react';
export default function NewClient() {
    return (
        <div className="p-20 w-screen h-screen justify-center items-center flex flex-col">
            <h1 className="text-white text-lg font-semibold mb-8">New Client</h1>
            <p className="pt-5 text-2xl">This is where you can add a new client.</p>
            <p className="pt-2 text-xl">Use the form below to enter client details.</p>
            {/* Form for adding a new client would go here */}
        </div>
    );
}