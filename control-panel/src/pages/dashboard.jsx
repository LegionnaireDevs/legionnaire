import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import StatCard from "../components/StatCard.jsx";
import Endpoints from "../pages/endpoints.jsx"; 
import Statistics from "../pages/statistics.jsx"; 
import Manage_Client from "../pages/manage_client.jsx"; 
import { auth } from "../firebase"; 
import { signOut } from "firebase/auth";



export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // redirect to login page
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Failed to sign out. Try again.");
        }
    };

    useEffect(() => {
        if (auth.currentUser) {
            setUsername(auth.currentUser.displayName || 'User');
        }
    }, []);


    const menuItems = [
        { id: 'statistics', label: 'Statistics'},
        { id: 'endpoints', label: 'Endpoints'},
        { id: 'manage_client', label: 'Manage Clients'}
    ];
    

    const renderContent = () => {
        switch (activeTab) {
            case 'statistics':
                return <Statistics />;
            case 'endpoints':
                return <Endpoints />;
            case 'manage_client':
                return <Manage_Client/>;
            default:
                return <Statistics />;
        }
        
    };

    return (
        <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
            </div>
            
            
            {/* Main layout */}
            <div className="relative z-10 flex" style={{height: 'calc(100vh - 80px)', marginTop: '80px'}}>
                {/* Left Vertical Toolbar */}
                <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10">
                    <div className="p-6">
                    <h1 className="text-white text-lg font-semibold mb-8">
                    {username} Admin Panel
                </h1>
                        <nav className="space-y-2">
    {menuItems.map((item) => (
        <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
        >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-bold">{item.label}</span>
        </button>
    ))}

            {/* Sign Out button inline with the other menu items */}
            <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:text-red-400 font-bold"
            >
                <span className="mr-3 text-lg"></span>
                <span>Sign Out</span>
            </button>
        </nav>

                    </div>
                </div>

                {/* Right Content Container */}
                <div className="flex-1 p-6">
                    <div className="h-full bg-white/90 backdrop-blur-sm rounded-xl opacity-90 shadow-2xl border border-white/20 overflow-auto">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}