import { Link, useLocation } from 'react-router-dom';
import {
  imgMdiBellNotification,
  imgCarbonUserAvatarFilled,
} from './Icons';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Performance', path: '/my-performance' },
  { label: 'Team Management', path: '/team-management' },
  { label: 'Review Cycles', path: '/review-cycles' },
  { label: 'System Admin', path: '/system-admin' },
];

export function Navbar() {
  const location = useLocation();
  
  // Determine active index based on current path
  const getActiveIndex = () => {
    const index = navItems.findIndex(item => location.pathname === item.path);
    return index >= 0 ? index : 0;
  };
  
  const activeIndex = getActiveIndex();

  return (
    <div className="sticky top-0 z-50 flex gap-[10px] items-center justify-between py-[10px] bg-inherit" style={{ width: '1419px' }} data-node-id="1:8">
      {/* Logo Section */}
     
        <img src='/profile-img/logo.svg' ></img>
  

      {/* Navigation Container */}
      <div className="flex gap-[10px] items-center">
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
        <img alt="Notification" className="w-[25px] h-[25px]" src={imgMdiBellNotification} />
      </button>
      
      {/* User Avatar Button */}
      <button className="bg-white/20 backdrop-blur-md border border-solid border-white/30 rounded-[45px] size-[45px] shadow-inner flex items-center justify-center hover:opacity-90 transition-opacity" data-name="Navbar" data-node-id="1:23">
        <img alt="User Avatar" className="w-[30px] h-[30px]" src={imgCarbonUserAvatarFilled} />
      </button>
      </div>
    </div>
  );
}
