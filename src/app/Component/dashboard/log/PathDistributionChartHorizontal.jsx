"use client";
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PathDistributionChartHorizontal({ logs = [] }) {
  const [pathCounts, setPathCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [rawLabels, setRawLabels] = useState([]);
  const [finalSeries, setFinalSeries] = useState([]);

  useEffect(() => {
    if (logs.length === 0) {
      setLoading(false);
      return;
    }

    const counts = {};

    logs.forEach((log) => {
      const fullPath = log.path;
      if (fullPath) {
        counts[fullPath] = (counts[fullPath] || 0) + 1;
      }
    });

    const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top15 = sortedEntries.slice(0, 15);
    const rest = sortedEntries.slice(15);

    let othersCount = 0;
    if (rest.length > 0) {
      othersCount = rest.reduce((acc, [, count]) => acc + count, 0);
    }

    const finalLabels = top15.map(([fullPath]) => fullPath.split("?")[0]);
    const finalData = top15.map(([, value]) => value);

    if (othersCount > 0) {
      finalLabels.push("Others");
      finalData.push(othersCount);
    }

    setRawLabels(finalLabels);
    setFinalSeries([
      {
        name: "Requests",
        data: finalData,
      },
    ]);
    setLoading(false);
  }, [logs]);

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
        formatter: (value, { dataPointIndex }) => {
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

  return (
    <Card className="my-3 shadow w-100">
      <div className="p-4">
        <h5 className="text-center fw-semibold mb-3">Path Distribution</h5>
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : finalSeries?.[0]?.data?.length === 0 ? (
          <p className="text-center text-muted">No path data available</p>
        ) : (
          <div style={{ width: "100%" }}>
            <Chart
              options={chartOptions}
              series={finalSeries}
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
