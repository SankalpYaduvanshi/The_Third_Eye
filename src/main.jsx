import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import StudentLayout from './components/layout/StudentLayout';
import VendorLayout from './components/layout/VendorLayout';

// Import placeholder pages (will be replaced with real pages in later tasks)
import {
  Landing, Login, Signup, Browse, VehicleDetail,
  BookingConfirmation, ActiveRide, Return, TripHistory, Profile,
  VendorLogin, VendorSignup, VendorDashboard, Inventory,
  VehicleForm, VendorBookings, Analytics, GeofenceAlerts,
} from './pages/Placeholders';

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
      { path: 'dashboard', element: <VendorDashboard /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'vehicle/new', element: <VehicleForm /> },
      { path: 'vehicle/:id/edit', element: <VehicleForm /> },
      { path: 'bookings', element: <VendorBookings /> },
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
