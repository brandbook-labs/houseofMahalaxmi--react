import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  // ଲୋକାଲ୍ ଷ୍ଟୋରେଜ୍ ରୁ ଆଡମିନ୍ ଟୋକେନ୍ ଚେକ୍ କରିବା
  const adminToken = localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('userRole') === 'Admin';

  if (!adminToken || !isAdmin) {
    // ଯଦି ଟୋକେନ୍ ନାହିଁ ବା ସେ ଆଡମିନ୍ ନୁହନ୍ତି, ଲଗିନ୍ କୁ ପଠାନ୍ତୁ
    return <Navigate to="/admin/login" replace />;
  }

  // ଯଦି ସବୁ ଠିକ୍ ଅଛି, ତେବେ ଭିତରକୁ ଛାଡନ୍ତୁ (Outlet ମାନେ ଚାଇଲ୍ଡ୍ କମ୍ପୋନେଣ୍ଟ୍)
  return <Outlet />;
}