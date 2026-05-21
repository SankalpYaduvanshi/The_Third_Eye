import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import StudentLayout from './components/layout/StudentLayout';
import VendorLayout from './components/layout/VendorLayout';

// Student pages
import Landing from './pages/student/Landing';
import Login from './pages/student/Login';
import Signup from './pages/student/Signup';
import Browse from './pages/student/Browse';
import VehicleDetail from './pages/student/VehicleDetail';
import BookingConfirmation from './pages/student/BookingConfirmation';
import ActiveRide from './pages/student/ActiveRide';
import Return from './pages/student/Return';
import TripHistory from './pages/student/TripHistory';
import Profile from './pages/student/Profile';

// Vendor pages
import VendorLogin from './pages/vendor/VendorLogin';
import VendorSignup from './pages/vendor/VendorSignup';
import Dashboard from './pages/vendor/Dashboard';
import Inventory from './pages/vendor/Inventory';
import VehicleForm from './pages/vendor/VehicleForm';
import Bookings from './pages/vendor/Bookings';
import Analytics from './pages/vendor/Analytics';
import GeofenceAlerts from './pages/vendor/GeofenceAlerts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'browse', element: <Browse /> },
      { path: 'vehicle/:id', element: <VehicleDetail /> },
      { path: 'booking/:id', element: <BookingConfirmation /> },
      { path: 'ride', element: <ActiveRide /> },
      { path: 'return', element: <Return /> },
      { path: 'trips', element: <TripHistory /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/vendor',
    element: <VendorLayout />,
    children: [
      { path: 'login', element: <VendorLogin /> },
      { path: 'signup', element: <VendorSignup /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'vehicle/new', element: <VehicleForm /> },
      { path: 'vehicle/:id/edit', element: <VehicleForm /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'geofence', element: <GeofenceAlerts /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
