import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';

const VendorLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <VendorSidebar />
      <main className="lg:ml-64 pb-20 lg:pb-0 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
