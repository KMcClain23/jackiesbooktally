import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SummaryCard from '../components/SummaryCard';
import MonthlyActionsGraph from '../components/MonthlyActionsGraph';
import RecentContactUpdates from '../components/RecentContactUpdates';
import TodaysActionsTable from '../components/TodaysActionsTable';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto"> {/* Added overflow-y-auto here for the main content column */}
        <TopBar />
        <main className="flex-1 p-6 bg-gray-200">
          {/* Greeting Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Good morning, Admin User! 👋</h1>
            <p className="text-gray-600 mt-1">
              Here’s what’s happening with your business today.
            </p>
          </div>

          {/* Summary Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <SummaryCard
              title="Bid Hit Rate"
              value="9%"
              progressBarPercentage={9}
              subtext="9% of bids won this quarter"
            />
            <SummaryCard
              title="Backlog by Contract Value"
              value="$178.9M"
              progressBarPercentage={100}
              fullWidthProgressBar={true}
            />
            <SummaryCard title="Contracts Won" value="2" />
            <SummaryCard title="Contracts in Progress" value="2" />
          </div>

          {/* Graph and Feed Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MonthlyActionsGraph />
            </div>
            <div className="lg:col-span-1">
              <RecentContactUpdates />
            </div>
          </div>

          {/* Today's Actions Table Section */}
          <div>
            <TodaysActionsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
