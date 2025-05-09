'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TabCard1 = ({ apiData }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  const [rawLabels, setRawLabels] = useState([]);

  useEffect(() => {
    if (apiData?.date_wise_counts) {
      const sortedData = [...apiData.date_wise_counts].sort((a, b) => a.day - b.day);

      const labels = sortedData.map(item => `Day ${item.day}`);
      const counts = sortedData.map(item => item.count);

      setRawLabels(labels);
      setChartLabels(labels);
      setChartSeries([{ name: "Logins", data: counts }]);
    }
  }, [apiData]);

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
          return `${fullLabel}: ${value} logins`;
        },
      },
    },
    xaxis: {
      categories: chartLabels,
      title: {
        text: "Datewise",
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
        text: "Active Users",
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
    <div className="p-3 card border">
      <h5>Tab 1 Data</h5>
      {chartSeries.length > 0 ? (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={450} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TabCard1;
