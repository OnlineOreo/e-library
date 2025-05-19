"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IoFastFood } from "react-icons/io5";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TabCard1 = ({ apiData }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  const [rawLabels, setRawLabels] = useState([]);

  useEffect(() => {
    if (apiData?.date_wise_counts) {
      const sortedData = [...apiData.date_wise_counts].sort(
        (a, b) => new Date(a.day) - new Date(b.day)
      );
  
      let labels = [];
  
      if (apiData?.day_wise_or_months === "day") {
        labels = sortedData.map((item) => {
          const date = new Date(item.day);
          const dd = String(date.getDate()).padStart(2, "0");
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          const yyyy = date.getFullYear();
          return `${dd}-${mm}-${yyyy}`;
        });
      }
  
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      if (apiData?.day_wise_or_months === "month") {
        labels = sortedData.map((item) => {
          return monthNames[item.month - 1];
        });
      }
  
      const counts = sortedData.map((item) => item.count);
  
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

  // console.log(apiData)
  return (
    <div className="p-3 card border">
      {chartSeries.length > 0 ? (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={450}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TabCard1;
