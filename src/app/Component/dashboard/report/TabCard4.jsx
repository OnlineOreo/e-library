'use client';
import { useEffect, useState } from "react";
import axios from "axios";

const TabCard4 = ({apiData}) => {
  
  return (
    <div className="p-3 bg-light border">
      <h5>Tab 4 Data</h5>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TabCard4;
