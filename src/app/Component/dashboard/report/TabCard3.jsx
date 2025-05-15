'use client';
import { useEffect, useState } from "react";
import axios from "axios";

const TabCard3 = ({apiData}) => {

  return (
    <div className="p-3 bg-light border">
      <h5>Tab 3 Data</h5>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TabCard3;
