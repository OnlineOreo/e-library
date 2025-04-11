"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, Spinner } from "react-bootstrap";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MethodDistributionChart({ logs = [] }) {
  const [methodCounts, setMethodCounts] = useState({});
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  const chartSeries = Object.values(methodCounts);

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(methodCounts),
    colors: ["#FFB200", "#E91E63", "#9C27B0", "#00BCD4", "#8BC34A"],
    legend: {
      position: "right",
      horizontalAlign: "center",
      markers: {
        shape: "rect",
        width: 12,
        height: 6,
        radius: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          const total = chartSeries.reduce((acc, val) => acc + val, 0);
          const percent = (value / total) * 100;
          return `${percent.toFixed(1)}%`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (logs.length === 0) {
      setLoading(false);
      return;
    }

    const counts = logs.reduce((acc, log) => {
      const method = log.method?.toUpperCase();
      if (method) {
        acc[method] = (acc[method] || 0) + 1;
      }
      return acc;
    }, {});

    setMethodCounts(counts);
    setTotalRequests(logs.length);
    setLoading(false);
  }, [logs]);

  return (
    <Card className="my-3 shadow">
      <div className="p-3">
        <h5 className="text-center fw-semibold">Method Distribution</h5>
        <p className="text-center text-muted mb-3">
          {/* Total Requests: <strong>{totalRequests}</strong> */}
        </p>
        {loading ? (
          <div className="text-center"><Spinner /></div>
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width="100%"
            height="350"
          />
        )}
      </div>
    </Card>
  );
}
