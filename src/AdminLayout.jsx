import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ଲଗଆଉଟ୍ ବେଳେ ଟୋକେନ୍ କ୍ଲିୟର୍ କରିବା
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    toast.success("Logged out successfully 👋");
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* ───────────── TOP NAVIGATION TABS ───────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-16">
          
          {/* TABS */}
          <div className="flex space-x-8 h-full">
            <NavLink
              to="/admin/products"
              // NavLink ନିଜେ ଜାଣିପାରେ ଯେ ସେ ଆକ୍ଟିଭ୍ ଅଛି କି ନାହିଁ (isActive)
              className={({ isActive }) => `flex items-center gap-2 h-full px-4 border-b-2 font-bold transition-colors duration-300 ${
                isActive 
                  ? 'border-[#800020] text-[#800020]' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Package size={18} /> Products
            </NavLink>
            
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `flex items-center gap-2 h-full px-4 border-b-2 font-bold transition-colors duration-300 ${
                isActive 
                  ? 'border-[#800020] text-[#800020]' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <ShoppingCart size={18} /> Orders
            </NavLink>
          </div>

          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-bold bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>

        </div>
      </div>

      {/* ───────────── DYNAMIC PAGE RENDER ───────────── */}
      {/* Outlet ଦ୍ୱାରା Products କିମ୍ବା Orders ପେଜ୍ ଏହି ଜାଗାରେ ଲୋଡ୍ ହେବ */}
      <main className="pb-12">
          <Outlet />
      </main>

    </div>
  );
}