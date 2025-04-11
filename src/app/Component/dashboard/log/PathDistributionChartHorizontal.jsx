"use client";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PathDistributionChart({ logs = [] }) {
  const [pathCounts, setPathCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const rawLabels = Object.keys(pathCounts);
  const chartSeries = [
    {
      name: "Requests",
      data: Object.values(pathCounts),
    },
  ];

  const chartLabels = rawLabels.map((label) =>
    label.length > 25 ? `${label.slice(0, 22)}...` : label
  );

  const chartOptions = {
    chart: {
      type: "bar",
      height: 450,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "60%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`,
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          const fullLabel = rawLabels[dataPointIndex];
          return `${fullLabel}: ${value} requests`;
        },
      },
    },
    xaxis: {
      categories: chartLabels,
      title: {
        text: "Paths",
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Requests",
      },
    },
    colors: ["#4CAF50"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
          xaxis: {
            labels: {
              rotate: -60,
            },
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
    <Card className="my-3 shadow w-100">
      <div className="p-4">
        <h5 className="text-center fw-semibold mb-3">Path Distribution</h5>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : chartSeries[0].data.length === 0 ? (
          <p className="text-center text-muted">No path data available</p>
        ) : (
          <div style={{ width: "100%" }}>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={450}
              width="100%"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
