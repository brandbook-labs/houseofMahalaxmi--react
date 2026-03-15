import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { loginAdmin } from '../services/apiService'; // ଆପଣଙ୍କ API ସର୍ଭିସ୍

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please enter both email and password.");
    }

    setIsLoading(true);
    try {
      // API କଲ୍
      const response = await loginAdmin({ email, password });

      const actualToken = response.token || response.data?.token;
      const actualUser = response.user || response.data?.user;

      if (actualToken) {
        // ସଫଳ ହେଲେ ଟୋକେନ୍ ସେଭ୍ କରନ୍ତୁ
        localStorage.setItem('adminToken', actualToken);
        localStorage.setItem('userRole', actualUser?.role || 'Admin');
        
        toast.success("Welcome back, Admin!");
        
        // ରିଡାଇରେକ୍ଟ କରନ୍ତୁ
        navigate('/admin/products', { replace: true });
      } else {
        toast.error(response.msg || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      toast.error("Server error! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 font-sans relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#800020] rounded-b-[20%] shadow-lg"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#800020]/10 rounded-full flex items-center justify-center text-[#800020]">
            <ShieldCheck size={36} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-sm text-gray-500">Sign in to manage House of Mahalaxmi</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mahalaxmi.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-colors"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-colors"
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#800020] hover:bg-[#600018] text-white font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Secure Login'}
          </button>
        </form>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 relative z-10">
        &copy; {new Date().getFullYear()} House of Mahalaxmi. Restricted Access.
      </div>
    </div>
  );
}