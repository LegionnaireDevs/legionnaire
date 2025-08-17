import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Statistics() {
  const [showCharts, setShowCharts] = useState(false);
  const [data, setData] = useState([
    { id: 0, value: 0, label: "OK",       color: "#053626ff" },
    { id: 1, value: 0, label: "Moderate", color: "#8d5b05ff" },
    { id: 2, value: 0, label: "Critical", color: "#900606ff" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharts(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("http://localhost:5000/api/malware-results");
        const items = await res.json(); // expected: [{ hash, results, received_at }, ...]
        const arr = Array.isArray(items) ? items : [];

        // Count OK when query_status === 'hash_not_found' OR results is empty.
        let ok = 0;
        let flagged = 0;

        for (const item of arr) {
          const r = item?.results;

          const isNotFound =
            // results is a string that mentions 'hash_not_found'
            (typeof r === "string" && r.toLowerCase().includes("hash_not_found")) ||
            // results has explicit query_status
            (r && typeof r === "object" && r.query_status === "hash_not_found") ||
            // or results is an empty object (no vendor hits)
            (r && typeof r === "object" && Object.keys(r).length === 0);

          if (isNotFound) ok += 1;
          else flagged += 1;
        }

        setData([
          { id: 0, value: ok,      label: "OK",       color: "#053626ff" },
          { id: 1, value: 0,       label: "Moderate", color: "#8d5b05ff" }, // placeholder
          { id: 2, value: flagged, label: "Critical", color: "#900606ff" },
        ]);
      } catch (err) {
        console.error("Error fetching malware results:", err);
      }
    }

    fetchResults();
    const interval = setInterval(fetchResults, 5000);
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
        <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: color }} />
        <span className="text-white font-medium">{label}</span>
      </div>
      <span className="text-gray-300 font-semibold">{value}</span>
    </div>
  );

  const chartData = data.filter(d => d.value > 0);      // only draw non-zero slices
  const nonZero = chartData.length;
  const pad = nonZero <= 1 ? 0 : 5;          

  return (
    <div className="min-h-screen max-h-screen w-full max-w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* ... your floating particles / header can stay the same ... */}

      <div className="p-6 h-full flex flex-col">
        <div className="w-full max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Statistics Dashboard</h1>
          <p className="text-xl text-gray-300">System health and security metrics overview.</p>
        </div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
          <StatCard title="Software Issues">
            <div className="flex flex-col items-center">
              {showCharts ? (
                <div className="mb-6">
                  <PieChart
                    skipAnimation
                    series={[
                      {
                        paddingAngle: 1,
                        innerRadius: 60,
                        outerRadius: 120,
                        data,
                      },
                    ]}
                    startAngle={0}
                    endAngle={360}
                    width={300}
                    height={300}
                    hideLegend
                    sx={{
                      "& .MuiPieArc-root": { stroke: "none" },
                      "& .MuiChartsArc-root": { stroke: "none" },
                    }}
                  />
                </div>
              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
              )}

              <div className="w-full max-w-xs">
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  {data.map((item) => (
                    <LegendItem key={item.id} color={item.color} label={item.label} value={item.value} />
                  ))}
                </div>
              </div>
            </div>
          </StatCard>

          <StatCard title="Network Issues">
            {/* Duplicate chart for now; plug in different API later if desired */}
            <div className="flex flex-col items-center">
              {showCharts ? (
                <div className="mb-6">
                  <PieChart
                    skipAnimation
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
                    sx={{
                      "& .MuiPieArc-root": { stroke: "none" },
                      "& .MuiChartsArc-root": { stroke: "none" },
                    }}
                  />
                </div>
              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
              )}

              <div className="w-full max-w-xs">
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  {data.map((item) => (
                    <LegendItem key={item.id} color={item.color} label={item.label} value={item.value} />
                  ))}
                </div>
              </div>
            </div>
          </StatCard>
        </div>

        {/* Summary cards – optional: derive from data */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
          <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{data[0].value}</div>
            <div className="text-sm text-gray-300">Total OK</div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{data[1].value}</div>
            <div className="text-sm text-gray-300">Moderate</div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">{data[2].value}</div>
            <div className="text-sm text-gray-300">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
}
