"use client";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LogLevelDistributionChart({ logs = [] }) {
  const [levelCounts, setLevelCounts] = useState({ info: 0, warning: 0 });
  const [loading, setLoading] = useState(true);

  const chartSeries = [levelCounts.info, levelCounts.warning];

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["info", "warning"],
    colors: ["#4CAF50", "#FFC107"],
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
          const total = chartSeries.reduce((a, b) => a + b, 0);
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
    if (logs && Array.isArray(logs)) {
      const counts = logs.reduce(
        (acc, log) => {
          if (log.error_trace) {
            acc.warning += 1;
          } else {
            acc.info += 1;
          }
          return acc;
        },
        { info: 0, warning: 0 }
      );

      setLevelCounts(counts);
    }
    setLoading(false);
  }, [logs]);

  return (
    <Card className="my-3 shadow">
      <div className="p-3">
        <h5 className="text-center fw-semibold">Log Level Distribution</h5>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : chartSeries.reduce((a, b) => a + b, 0) === 0 ? (
          <p className="text-center text-muted">No log level data available</p>
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
