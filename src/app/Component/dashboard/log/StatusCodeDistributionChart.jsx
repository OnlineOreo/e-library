"use client";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatusCodeDistributionChart({ logs = [], status_key = "status_code" }) {
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const chartSeries = Object.values(statusCounts);

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(statusCounts),
    colors: [
      "#008000",
      "#43A047",
      "#FB8C00",
      "#E53935",
      "#8E24AA",
      "#00ACC1",
      "#FDD835",
      "#5E35B1",
      "#6D4C41",
      "#789262",
    ],
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
      formatter: (val) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (value) => {
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
      const status = log[status_key];
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {});

    setStatusCounts(counts);
    setLoading(false);
  }, [logs, status_key]);

  return (
    <Card className="my-3 shadow">
      <div className="p-3">
        <h5 className="text-center fw-semibold">Status Code Distribution</h5>
        {loading ? (
          <div className="text-center"><Spinner /></div>
        ) : chartSeries.length === 0 ? (
          <p className="text-center text-muted">No status code data available</p>
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            width="100%"
            height="340"
          />
        )}
      </div>
    </Card>
  );
}
