import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCompass, FaVideo, FaGamepad, FaEnvelope, FaUser } from 'react-icons/fa';
import { useUserStore } from '../store/userStore';

function Sidebar() {
  const location = useLocation();
  const { user } = useUserStore();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Home', path: '/', icon: FaHome },
    { label: 'Explore', path: '/explore', icon: FaCompass },
    { label: 'Streams', path: '/stream', icon: FaVideo },
    { label: 'Games', path: '/games', icon: FaGamepad },
    { label: 'Messages', path: '/messages', icon: FaEnvelope },
    { label: 'Profile', path: `/profile/${user?.id}`, icon: FaUser }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 hidden md:block sticky top-0 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-blue-500 mb-8">🦕 Dinosaur</h1>
      
      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                isActive(item.path)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;