"use client";
import React, { useState } from "react";
import { Card, Table, Badge, Pagination } from "react-bootstrap";
import { BsEnvelope } from "react-icons/bs";

export default function RawLogs({ logs = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const totalPages = Math.ceil(logs.length / logsPerPage);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPaginationItems = () => {
    const items = [];

    const addPageItem = (number) => {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    };

    if (totalPages <= 7) {
      for (let number = 1; number <= totalPages; number++) {
        addPageItem(number);
      }
    } else {
      // First 2 pages
      addPageItem(1);
      addPageItem(2);

      // Ellipsis before middle
      if (currentPage > 4) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      // Middle page(s)
      const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
        (n) => n > 2 && n < totalPages - 1
      );
      middlePages.forEach(addPageItem);

      // Ellipsis after middle
      if (currentPage < totalPages - 3) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      // Last 2 pages
      addPageItem(totalPages - 1);
      addPageItem(totalPages);
    }

    return items;
  };

  return (
    <Card className="my-4 shadow">
      <Card.Header className="bg-white py-4">
        <h4 className="mb-0">Recent Logs</h4>
      </Card.Header>
      <Table responsive className="text-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Method</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, index) => (
            <tr key={log.id || index}>
              <td className="align-middle">
                <div className="d-flex align-items-center">
                    <div
                      className="icon-shape icon-md border p-1 rounded-1 bg-white"
                      style={{
                        width: 40,
                        height: 40,
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={log.image || './images/avatar/avatar-1.jpg'}
                        alt={log.user || "User"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                  <div className="ms-3 lh-1">
                    <h6 className="mb-1 text-break">{log.user || "N/A"}</h6>
                    <small className="text-muted">
                      {new Date(log.created_at).toLocaleString()}
                    </small>
                  </div>
                </div>
              </td>
              <td className="align-middle">
                <Badge
                  bg={
                    log.method == "GET"
                      ? "success"
                      : log.method == "POST"
                      ? "warning"
                      : log.method == "PUT"
                      ? "info"
                      : log.method == "DELETE"
                      ? "danger"
                      : ""
                  }
                  className="text-uppercase"
                >
                  {log.method}
                </Badge>
              </td>
              <td className="align-middle">
                <Badge
                  bg={
                    log.status_code === 200
                      ? "warning"
                      : log.status_code >= 400
                      ? "danger"
                      : "success"
                  }
                >
                  {log.status_code}
                </Badge>
              </td>
              <td className="align-middle text-break">
                <div className="text-dark">{log.msg.toLowerCase()}</div>
                <div className="text-muted small">
                  {/* {log.path?.split("?")[0]} */}
                  {log.path }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Card.Footer className="bg-white d-flex justify-content-center py-3">
          <Pagination>{getPaginationItems()}</Pagination>
        </Card.Footer>
      )}
    </Card>
  );
}
