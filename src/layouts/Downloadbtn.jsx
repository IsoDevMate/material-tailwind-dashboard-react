import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';

export const DownloadOrdersReport = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [limit, setLimit] = useState('');

  const handleDownload = () => {
    setIsDownloading(true);

    const url = `http://localhost:3000/ordersreport?startDate=${startDate}&endDate=${endDate}&limit=${limit}`;
    window.open(url);

    setIsDownloading(false);
    alert('Orders report downloaded successfully!');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-2 font-bold">
          Start Date:
        </label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="mr-2 font-bold">
          End Date:
        </label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="limit" className="mr-2 font-bold">
          Limit:
        </label>
        <Input
          id="limit"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="bg-black-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isDownloading ? 'Downloading...' : 'Download Orders Report'}
      </Button>
    </div>
  );
};

