import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import type { LoginUser } from './LoginModal';
 
const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Performance', path: '/my-performance' },
  { label: 'Team Management', path: '/team-management' },
  { label: 'Review Cycles', path: '/review-cycles' },
  { label: 'System Admin', path: '/system-admin' },
];
 
interface NavbarProps {
  user: LoginUser | null;
  onLogout: () => void;
}
 
export function Navbar({ user, onLogout }: NavbarProps) {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  // Determine active index based on current path
  const getActiveIndex = () => {
    const index = navItems.findIndex(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
    return index >= 0 ? index : 0;
  };
 
  const activeIndex = getActiveIndex();
 
  return (
    <div className="sticky top-0 z-50 flex gap-[10px] items-center justify-between py-[10px] bg-inherit px-6 mx-auto" style={{ width: '1398px' }} data-node-id="1:8">
      {/* Logo Section */}
      <img
  src="/profile-img/logo.png"
  alt="logo"
  className="h-17 w-auto"
/>
 
 
      {/* Navigation Container */}
      <div className="flex gap-[10px] items-center ml-auto">
        {/* Main Navigation Bar */}
        <div className="bg-white/20 backdrop-blur-md border border-solid border-white/30 h-[45px] rounded-[30px] px-[20px] shadow-inner relative flex items-center" data-name="Navbar" data-node-id="1:9">
          {/* Navigation Items */}
          <div className="flex gap-[25px] items-center leading-[20px] text-[15px] text-black text-nowrap" data-node-id="1:11">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`relative shrink-0 cursor-pointer hover:opacity-80 px-[12px] py-[10px] rounded-[30px] transition-all duration-300 ${activeIndex === idx ? 'font-semibold bg-white' : ''}`}
                data-node-id={`1:${12+idx}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
     
        {/* Settings Button */}
        <div className="bg-white/20 backdrop-blur-md border border-solid border-white/30 h-[45px] rounded-[30px] w-[113px] shadow-inner flex items-center justify-center cursor-pointer hover:opacity-90" data-name="Navbar" data-node-id="1:17">
          <p className="text-[15px] text-black text-center leading-[45px]" data-node-id="1:19">Settings</p>
        </div>
       
        {/* Notification Button */}
        <button className="bg-white/20 backdrop-blur-md border border-solid border-white/30 rounded-[45px] size-[45px] shadow-inner flex items-center justify-center hover:opacity-90 transition-opacity" data-name="Navbar" data-node-id="1:20">
          <Bell className="w-6 h-6 text-black" />
        </button>
       
        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white/20 backdrop-blur-md border border-solid border-white/30 rounded-[45px] size-[45px] shadow-inner flex items-center justify-center hover:opacity-90 transition-opacity flex-col gap-1"
            data-name="Navbar"
            data-node-id="1:23"
          >
            <img
              alt="User Profile"
              className="w-full h-full object-cover rounded-full"
              src="/profile-img/profile.jpg"
            />
          </button>
 
          {/* Dropdown Menu */}
          {isDropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl shadow-2xl p-4 z-50">
              {/* User Info */}
              <div className="pb-4 border-b border-purple-200">
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-xs font-semibold text-purple-700 capitalize">{user.role}</span>
                </div>
              </div>
 
              {/* Logout Button */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  onLogout();
                }}
                className="w-full mt-4 flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}