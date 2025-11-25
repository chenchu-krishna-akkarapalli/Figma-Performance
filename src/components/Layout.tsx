import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { type LoginUser } from './LoginModal';

interface LayoutProps {
  user: LoginUser | null;
  onLogout: () => void;
}

export function Layout({ user, onLogout }: LayoutProps) {
  return (
    <div className="h-screen bg-[#EDEFF1] flex flex-col overflow-hidden">
      {/* Navbar - renders in all routes */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Page content - different for each route */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
}
