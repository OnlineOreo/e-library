"use client";
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { BsEnvelope } from "react-icons/bs";

export default function RawLogs({ logs = [] }) {
  return (
    <Card className="my-4 shadow-sm">
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
          {logs.map((log, index) => (
            <tr key={log.id || index}>
              <td className="align-middle">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon-shape icon-md border p-3 rounded-1 bg-primary text-white">
                      <BsEnvelope size={18} />
                    </div>
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
                <Badge bg={log.method == "GET" ? 'success' : log.method == "POST" ? "warning" : log.method == "PUT" ? 'info' : log.method == "DELETE" ? 'danger' : ''} className="text-uppercase">
                  {log.method}
                </Badge>
              </td>
              <td className="align-middle">
                <Badge
                  bg={
                    log.status_code === 200
                      ? "success"
                      : log.status_code >= 400
                      ? "danger"
                      : "warning"
                  }
                >
                  {log.status_code}
                </Badge>
              </td>
              <td className="align-middle text-break">
                <div className="text-dark">{log.msg}</div>
                <div className="text-muted small">{log.path}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
