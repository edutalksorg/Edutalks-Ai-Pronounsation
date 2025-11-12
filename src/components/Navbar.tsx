import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, LogOut, User, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'superadmin') return '/superadmin';
    if (user?.role === 'admin') return '/admin';
    return '/dashboard';
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ---------- LOGO ---------- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 gradient-hero rounded-lg transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              EduLearnDevelop
            </span>
          </Link>

          {/* ---------- RIGHT SIDE NAV ---------- */}
          {!user ? (
            // ✅ FIXED: Get Started now navigates to /register
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')} className="gradient-hero">
                Get Started
              </Button>
            </div>
          ) : (
            // ---------- LOGGED IN DROPDOWN ----------
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="capitalize">{user.name || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                {user.role === 'user' && (
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};
