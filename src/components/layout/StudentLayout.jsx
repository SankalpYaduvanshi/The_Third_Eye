import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentNavbar />
      <main className="animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
