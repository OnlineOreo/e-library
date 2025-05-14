'use client'
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import Report from '@/app/Component/dashboard/report/Report';

// Format to YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};


const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [appliedRange, setAppliedRange] = useState(null);

  // Set default range on initial load
  useEffect(() => {
    if (!startDate && !endDate) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      setAppliedRange({
        start: formatDate(start),
        end: formatDate(end),
      });
      setDateRange([start, end]);
    }
  }, []);

  const handleApply = () => {
    let start = startDate;
    let end = endDate;

    if (!start || !end) {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 30);
    }

    setAppliedRange({
      start: formatDate(start),
      end: formatDate(end),
    });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-end align-items-center gap-3 flex-wrap">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText="Select date range"
            className="form-control"
          />
          <Button variant="primary" size="sm" onClick={handleApply} className="me-1">
            Apply
          </Button>
        </div>
      </div>
      <Report selectedDate={appliedRange} />
    </>
  );
};

export default Reports;
