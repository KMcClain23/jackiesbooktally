import React from 'react';

interface UpdateItem {
  id: number;
  contactName: string;
  activityType: 'email' | 'phone call' | 'task' | 'meeting';
  reference: string;
  timestamp: string;
}

const recentUpdatesData: UpdateItem[] = [
  {
    id: 1,
    contactName: 'Emily Johnson',
    activityType: 'email',
    reference: 'on Project Alpha',
    timestamp: '2m ago',
  },
  {
    id: 2,
    contactName: 'John Smith',
    activityType: 'phone call',
    reference: 'with Acme Corp',
    timestamp: '35m ago',
  },
  {
    id: 3,
    contactName: 'Alice Brown',
    activityType: 'meeting',
    reference: 're: New Proposal',
    timestamp: '1h ago',
  },
  {
    id: 4,
    contactName: 'Bob Williams',
    activityType: 'task',
    reference: 'Follow up on Q3 budget',
    timestamp: '3h ago',
  },
];

const tagColors = {
  email: 'bg-blue-100 text-blue-700',
  'phone call': 'bg-green-100 text-green-700',
  meeting: 'bg-purple-100 text-purple-700',
  task: 'bg-yellow-100 text-yellow-700',
};

const RecentContactUpdates = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Contact Updates</h3>
      <ul>
        {recentUpdatesData.map((item) => (
          <li key={item.id} className="py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">{item.contactName}</span>
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
            <div className="mt-1 flex items-center">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${
                  tagColors[item.activityType]
                }`}
              >
                {item.activityType}
              </span>
              <span className="text-sm text-gray-600">{item.reference}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentContactUpdates;
