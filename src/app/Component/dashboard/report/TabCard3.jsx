"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Form, Row, Col } from "react-bootstrap";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TabCard3 = ({ apiData }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [rawLabels, setRawLabels] = useState([]);

  // Default selected report
  const [selectedKeys, setSelectedKeys] = useState(["cumulative_report", "cumulative_count"]);

  useEffect(() => {
    const [reportKey, dataKey] = selectedKeys;
    const filteredData = apiData?.[reportKey]?.[dataKey];

    console.log(apiData)

    if (!filteredData || !Array.isArray(filteredData)) {
      setChartLabels([]);
      setChartSeries([]);
      return;
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (a.day && b.day) return new Date(a.day) - new Date(b.day);
      if (a.month && b.month) return a.month - b.month;
      return 0;
    });

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const labels = sortedData.map((item) => {
      if (item.day) {
        const date = new Date(item.day);
        return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
      } else if (item.month) {
        return monthNames[item.month - 1] || `Month ${item.month}`;
      } else {
        return "Unknown";
      }
    });

    const counts = sortedData.map((item) => item.count);

    setRawLabels(labels);
    setChartLabels(labels);
    setChartSeries([{ name: "Logins", data: counts }]);
  }, [selectedKeys, apiData]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 450,
      toolbar: { show: false },
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
      title: { text: "Datewise / Monthwise" },
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      title: { text: "Active Users" },
    },
    colors: ["#4CAF50"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: { bar: { columnWidth: "70%" } },
          xaxis: { labels: { rotate: -60 } },
        },
      },
    ],
  };

  return (
    <div className="p-3 card border">
      <Row className="justify-content-between">
        <Col lg={6} className="mb-3">
          <h5>Usage Report</h5>
        </Col>
        <Col lg={4} className="mb-3 text-right">
          <Form.Select
            value={JSON.stringify(selectedKeys)}
            onChange={(e) => setSelectedKeys(JSON.parse(e.target.value))}
          >
            <option value={JSON.stringify(["cumulative_report", "cumulative_count"])}>
              Cumulative Report
            </option>
            <option value={JSON.stringify(["page_view_report", "page_visit_count"])}>
              Page View Report
            </option>
            <option value={JSON.stringify(["search_report", "search_query_count"])}>
              Search Report
            </option>
            <option value={JSON.stringify(["download_report", "download_count"])}>
              Download Report
            </option>
          </Form.Select>
        </Col>
      </Row>

      {chartSeries.length > 0 ? (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={450} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default TabCard3;
