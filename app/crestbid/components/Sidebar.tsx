import React from 'react';

const Sidebar = () => {
  const navLinks = [
    { name: 'Dashboard', icon: '[icon]' },
    { name: 'Opportunities', icon: '[icon]' },
    { name: 'Action Center', icon: '[icon]' },
    { name: 'Contacts', icon: '[icon]' },
    { name: 'Email', icon: '[icon]' },
    { name: 'Documents', icon: '[icon]' },
    { name: 'Projects', icon: '[icon]' },
    { name: 'Reports', icon: '[icon]' },
    { name: 'Relationship Map', icon: '[icon]' },
    { name: 'Admin Settings', icon: '[icon]' },
  ];

  return (
    <div className="bg-white w-64 h-screen p-4 border-r border-gray-200">
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name} className="mb-2">
              <a
                href="#"
                className={`flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                  link.name === 'Dashboard' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
