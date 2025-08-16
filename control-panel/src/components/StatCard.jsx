import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="border border-gray-800 rounded-md p-6 bg-gray-900">
      <h2 className="text-center text-5xl">{title}</h2>
      <p className="text-center text-4xl font-bold p-6">{value}</p>
    </div>
  );
}
