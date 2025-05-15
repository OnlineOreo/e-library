'use client';
import { useEffect, useState } from "react";
import axios from "axios";

const TabCard2 = ({apiData}) => {
  
  return (
    <div className="p-3 bg-light border">
      <h5>Tab 2 Data</h5>
      <pre>{JSON.stringify(apiData, null, 2)}</pre>
    </div>
  );
};

export default TabCard2;
