import { NavLink } from 'react-router-dom';
import { LuHouse, LuUsers, LuCalendarDays } from "react-icons/lu";

export function Navbar() {
  const navItems = [
    { path: '/', label: 'Home', icon: <LuHouse size={20} /> },
    { path: '/registrations', label: 'Registrations', icon: <LuUsers size={20} /> },
    { path: '/events', label: 'Events', icon: <LuCalendarDays size={20} /> },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Logo Placeholder</h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span 
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive ? 'dark:text-green-400 opacity-100 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] filter brightness-125' : 'opacity-60'
                      }`} 
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
