"use client";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PathDistributionChart({ logs = [] }) {
  const [pathCounts, setPathCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const rawLabels = Object.keys(pathCounts);
  const chartSeries = Object.values(pathCounts);

  const chartLabels = rawLabels.map((label) =>
    label.length > 25 ? `${label.slice(0, 22)}...` : label
  );

  const chartOptions = {
    chart: {
      type: "pie",
      width: "100%",
    },
    labels: chartLabels,
    legend: {
      position: "bottom",
      fontSize: "14px",
      horizontalAlign: "center",
      floating: false,
      formatter: (seriesName, opts) => rawLabels[opts.seriesIndex],
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
      itemMargin: {
        vertical: 6,
        horizontal: 10,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          const total = chartSeries.reduce((acc, val) => acc + val, 0);
          const percent = (value / total) * 100;
          const fullLabel = rawLabels[seriesIndex];
          return `${fullLabel}<br/>${percent.toFixed(1)}%`;
        },
      },
    },
    colors: [
      "#2196F3", "#00BCD4", "#4CAF50", "#FF9800", "#F44336",
      "#9C27B0", "#3F51B5", "#009688", "#E91E63", "#795548",
    ],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "800px",
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
      const fullPath = log.path;
      if (fullPath) {
        const path = fullPath.split("?")[0];
        acc[path] = (acc[path] || 0) + 1;
      }
      return acc;
    }, {});

    setPathCounts(counts);
    setLoading(false);
  }, [logs]);

  return (
    <Card className="my-3 shadow" style={{ width: "100%" }}>
      <div className="p-4">
        <h5 className="text-center fw-semibold mb-3">Path Distribution</h5>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : chartSeries.length === 0 ? (
          <p className="text-center text-muted">No path data available</p>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              width="500px"
              height={450}
            />
          </div>
        )}
      </div>
    </Card>
  );
}