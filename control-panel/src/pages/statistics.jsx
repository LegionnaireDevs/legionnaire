import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Statistics() {
  const [showCharts, setShowCharts] = useState(false);
  const [softwareData, setSoftwareData] = useState([
    { id: 0, value: 0, label: "OK", color: "#053626ff" },
    { id: 1, value: 0, label: "Critical", color: "#900606ff" },
  ]);
  const [networkData, setNetworkData] = useState([
    { id: 0, value: 0, label: "OK", color: "#053626ff" },
    { id: 1, value: 0, label: "Suspicious", color: "#900606ff" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharts(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchSoftwareResults() {
      try {
        const res = await fetch("http://localhost:5000/api/malware-results");
        const items = await res.json();
        const arr = Array.isArray(items) ? items : [];

        let ok = 0;
        let flagged = 0;

        for (const item of arr) {
          const r = item?.results;
          const isNotFound =
            (typeof r === "string" &&
              r.toLowerCase().includes("hash_not_found")) ||
            (r &&
              typeof r === "object" &&
              r.query_status === "hash_not_found") ||
            (r && typeof r === "object" && Object.keys(r).length === 0);

          if (isNotFound) ok += 1;
          else flagged += 1;
        }

        setSoftwareData([
          { id: 0, value: ok, label: "OK", color: "#053626ff" },
          { id: 1, value: flagged, label: "Critical", color: "#900606ff" },
        ]);
      } catch (err) {
        console.error("Error fetching malware results:", err);
      }
    }

    fetchSoftwareResults();
    const interval = setInterval(fetchSoftwareResults, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchNetworkStats() {
      try {
        const res = await fetch("http://localhost:5000/api/network-stats");
        const stats = await res.json();
        setNetworkData([
          { id: 0, value: stats.ok_logs, label: "OK", color: "#053626ff" },
          {
            id: 1,
            value: stats.suspicious_logs,
            label: "Suspicious",
            color: "#900606ff",
          },
        ]);
      } catch (err) {
        console.error("Error fetching network stats:", err);
      }
    }

    fetchNetworkStats();
    const interval = setInterval(fetchNetworkStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, children }) => (
    <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      {children}
    </div>
  );

  const LegendItem = ({ color, label, value }) => (
    <div className="flex items-center justify-between w-full mb-2">
      <div className="flex items-center">
        <div
          className="w-4 h-4 rounded-full mr-3"
          style={{ backgroundColor: color }}
        />
        <span className="text-white font-medium">{label}</span>
      </div>
      <span className="text-gray-300 font-semibold">{value}</span>
    </div>
  );

  const ChartSpinner = () => (
    <div className="w-[300px] h-[300px] flex items-center justify-center mb-6">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
    </div>
  );

  return (
    <div className="min-h-screen max-h-screen w-full max-w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="p-6 h-full flex flex-col">
        <div className="w-full max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Statistics Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            System health and security metrics overview.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
          <StatCard title="Software Issues">
            {showCharts ? (
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <PieChart
                    skipAnimation
                    series={[
                      {
                        paddingAngle: 1,
                        innerRadius: 60,
                        outerRadius: 120,
                        data: softwareData,
                      },
                    ]}
                    width={300}
                    height={300}
                    sx={{
                      "& .MuiPieArc-root, & .MuiChartsArc-root": {
                        stroke: "none",
                      },
                    }}
                  />
                </div>
                <div className="w-full max-w-xs">
                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    {softwareData.map((item) => (
                      <LegendItem key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ChartSpinner />
            )}
          </StatCard>

          <StatCard title="Suspicious Logs">
            {showCharts ? (
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <PieChart
                    skipAnimation
                    series={[
                      {
                        paddingAngle: 1,
                        innerRadius: 60,
                        outerRadius: 120,
                        data: networkData,
                      },
                    ]}
                    width={300}
                    height={300}
                    sx={{
                      "& .MuiPieArc-root, & .MuiChartsArc-root": {
                        stroke: "none",
                      },
                    }}
                  />
                </div>
                <div className="w-full max-w-xs">
                  <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                    {networkData.map((item) => (
                      <LegendItem key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ChartSpinner />
            )}
          </StatCard>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
          <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {softwareData[0].value}
            </div>
            <div className="text-sm text-gray-300">Total OK</div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {softwareData[1].value}
            </div>
            <div className="text-sm text-gray-300">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
}
