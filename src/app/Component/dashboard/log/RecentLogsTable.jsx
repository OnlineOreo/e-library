"use client";
import React, { useState } from "react";
import { Card, Table, ProgressBar, Badge, Button } from "react-bootstrap";

const methodColors = {
  GET: "info",
  POST: "warning",
  PUT: "success",
  PATCH: "secondary",
  DELETE: "danger",
  DEFAULT: "dark",
};

function getPathStats(logs) {
  const stats = {};

  logs.forEach((log) => {
    const method = log.method || "UNKNOWN";
    const fullPath = log.path;
    if (!fullPath) return;

    // Key is full path with method (for counting)
    const key = `${method} ${fullPath}`;
    // const basePath = fullPath.split("?")[0]; // For label
    const basePath = fullPath; // For label
    // if()

    if (!stats[key]) {
      stats[key] = {
        method,
        path: basePath,
        count: 1,
      };
    } else {
      stats[key].count += 1;
    }
  });

  return Object.values(stats).sort((a, b) => b.count - a.count);
}

export default function PathAccessStatsTable({ logs = [] }) {
  const pathStats = getPathStats(logs);
  const maxCount = Math.max(...pathStats.map((p) => p.count), 1);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pathStats.length / itemsPerPage);
  const paginatedData = pathStats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Card className="my-4 shadow">
      <Card.Header className="bg-white py-4 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Path Access Statistics</h4>
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Card.Header>
      <div
        style={{
          minHeight: paginatedData.length < 10 ? "600px" : "auto",
        }}
      >
        <Table responsive className="text-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th></th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const color = methodColors[item.method] || methodColors.DEFAULT;
              return (
                <tr key={index}>
                  <td className="align-middle">
                    <Badge bg={color} className="px-3 py-2 text-uppercase">
                      {item.method}
                    </Badge>
                  </td>
                  <td className="align-middle text-break">{item.path}</td>
                  <td className="align-middle" style={{ minWidth: "200px" }}>
                    <ProgressBar
                      now={(item.count / maxCount) * 100}
                      variant={color}
                      style={{ height: "12px" }}
                    />
                  </td>
                  <td className="align-middle fw-semibold">{item.count}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Card.Footer className="text-center">
        Page {currentPage} of {totalPages}
      </Card.Footer>
    </Card>
  );
}
