import React from 'react';

interface ActionItem {
  id: number;
  action: string;
  type: 'Email' | 'Task' | 'Call' | 'Meeting';
  contact: string;
  due: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const todaysActionsData: ActionItem[] = [
  {
    id: 1,
    action: 'Follow up with Project Titan',
    type: 'Email',
    contact: 'Jane Doe',
    due: '2024-07-28',
    status: 'Pending',
  },
  {
    id: 2,
    action: 'Prepare presentation for Crestview Inc.',
    type: 'Task',
    contact: 'John Smith',
    due: '2024-07-29',
    status: 'In Progress',
  },
  {
    id: 3,
    action: 'Call back potential client X',
    type: 'Call',
    contact: 'Alice Brown',
    due: '2024-07-28',
    status: 'Pending',
  },
];

const TodaysActionsTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Today’s Actions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Due
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {todaysActionsData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.due}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaysActionsTable;
