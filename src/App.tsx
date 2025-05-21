<<<<<<< HEAD
=======

>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, UserRole } from "@/contexts/AuthContext";
<<<<<<< HEAD
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import NearbyStations from "./pages/NearbyStations";
import StationRegistration from "./pages/StationRegistration";
import StationDashboard from "./pages/StationDashboard";
=======
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/ChatBot";

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NearbyStations from "./pages/NearbyStations";
import NearbyStationsNew from "./pages/NearbyStationsNew";
import StationRegistration from "./pages/StationRegistration";
import StationDashboard from "./pages/StationDashboard";
import IndependentContractorAgreement from "./pages/IndependentContractorAgreement";
import IndependentContractorAgreementFull from "./pages/IndependentContractorAgreementFull";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShopperTerms from "./pages/ShopperTerms";
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
import ProductsManagement from "./pages/ProductsManagement";
import StationManagement from "./pages/StationManagement";
import OrdersManagement from "./pages/OrdersManagement";
import EarningsTransactions from "./pages/EarningsTransactions";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import SupportHelp from "./pages/SupportHelp";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import AccessControl from "./pages/AccessControl";
<<<<<<< HEAD
import "./index.css";

// Lazy-loaded components for better performance
const FuelCalculator = lazy(() => import('./components/organisms/FuelCalculator'));
const InteractiveMap = lazy(() => import('./components/organisms/InteractiveMap'));
const FuelRequestForm = lazy(() => import('./components/organisms/FuelRequestForm'));
const AnalyticsDashboard = lazy(() => import('./components/organisms/AnalyticsDashboard'));
const ChatBot = lazy(() => import('./components/organisms/ChatBot'));
const GlobalNearbyStations = lazy(() => import('./components/organisms/NearbyStations'));
const PartnerLogin = lazy(() => import('./components/organisms/PartnerLogin'));
=======
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({
<<<<<<< HEAD
  children,
  requiredRole = UserRole.Guest
}: {
  children: React.ReactNode,
  requiredRole?: UserRole
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
=======
  children
}: {
  children: React.ReactNode
}) => {
  const { isAuthenticated, isLoading } = useAuth();
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  if (user && user.role < requiredRole) {
    return <Navigate to="/access-denied" replace />;
  }

=======
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={
                  <>
                    <Index />
                    <Suspense fallback={null}>
                      <ChatBot />
                    </Suspense>
                  </>
                } />
                <Route path="/about-us" element={
                  <>
                    <AboutUs />
                    <Suspense fallback={null}>
                      <ChatBot />
                    </Suspense>
                  </>
                } />
                <Route path="/nearby-stations" element={
                  <>
                    <NearbyStations />
                    <Suspense fallback={null}>
                      <ChatBot />
                    </Suspense>
                  </>
                } />
                <Route path="/global-stations" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Global Stations...</div>}>
                    <GlobalNearbyStations />
                    <ChatBot />
                  </Suspense>
                } />
                <Route path="/station-registration" element={
                  <>
                    <StationRegistration />
                    <Suspense fallback={null}>
                      <ChatBot />
                    </Suspense>
                  </>
                } />
                <Route path="/login" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Login...</div>}>
                    <>
                      <PartnerLogin />
                      <ChatBot />
                    </>
                  </Suspense>
                } />
                <Route path="/partner-login" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Login...</div>}>
                    <>
                      <PartnerLogin />
                      <ChatBot />
                    </>
                  </Suspense>
                } />

                {/* New feature routes */}
                <Route path="/fuel-calculator" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Fuel Calculator...</div>}>
                    <>
                      <FuelCalculator />
                      <ChatBot />
                    </>
                  </Suspense>
                } />
                <Route path="/interactive-map" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Interactive Map...</div>}>
                    <>
                      <InteractiveMap />
                      <ChatBot />
                    </>
                  </Suspense>
                } />
                <Route path="/request-fuel" element={
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Fuel Request Form...</div>}>
                    <>
                      <FuelRequestForm />
                      <ChatBot />
                    </>
                  </Suspense>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute requiredRole={UserRole.Level2}>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Analytics Dashboard...</div>}>
                      <>
                        <AnalyticsDashboard />
                        <ChatBot />
                      </>
                    </Suspense>
                  </ProtectedRoute>
                } />

                {/* Station Dashboard routes - require authentication */}
                <Route path="/station-dashboard" element={
                  <ProtectedRoute>
                    <>
                      <StationDashboard />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/products" element={
                  <ProtectedRoute>
                    <>
                      <ProductsManagement />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/station" element={
                  <ProtectedRoute>
                    <>
                      <StationManagement />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/orders" element={
                  <ProtectedRoute>
                    <>
                      <OrdersManagement />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/earnings" element={
                  <ProtectedRoute>
                    <>
                      <EarningsTransactions />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/customers" element={
                  <ProtectedRoute>
                    <>
                      <Customers />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/reports" element={
                  <ProtectedRoute>
                    <>
                      <Reports />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/messages" element={
                  <ProtectedRoute>
                    <>
                      <Messages />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/notifications" element={
                  <ProtectedRoute>
                    <>
                      <Notifications />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/support" element={
                  <ProtectedRoute>
                    <>
                      <SupportHelp />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/station-dashboard/settings" element={
                  <ProtectedRoute>
                    <>
                      <Settings />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />

                {/* Admin Dashboard routes - require admin role */}
                <Route path="/admin-dashboard" element={
                  <ProtectedRoute requiredRole={UserRole.Level1}>
                    <>
                      <AdminDashboard />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/admin-dashboard/users" element={
                  <ProtectedRoute requiredRole={UserRole.Level2}>
                    <>
                      <UserManagement />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/admin-dashboard/access-control" element={
                  <ProtectedRoute requiredRole={UserRole.SuperiorAdmin}>
                    <>
                      <AccessControl />
                      <Suspense fallback={null}>
                        <ChatBot />
                      </Suspense>
                    </>
                  </ProtectedRoute>
                } />

                {/* Access Denied route */}
                <Route path="/access-denied" element={
                  <div className="flex h-screen flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">You don't have permission to access this page.</p>
                    <button
                      onClick={() => window.history.back()}
                      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Go Back
                    </button>
                  </div>
                } />

                {/* Catch-all route */}
                <Route path="*" element={
                  <>
                    <NotFound />
                    <Suspense fallback={null}>
                      <ChatBot />
                    </Suspense>
                  </>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
=======
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ChatBot />
          <BrowserRouter>
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/nearby-stations" element={<NearbyStationsNew />} />
            <Route path="/station-registration" element={<StationRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/independent-contractor-agreement" element={<IndependentContractorAgreement />} />
            <Route path="/independent-contractor-agreement-full" element={<IndependentContractorAgreementFull />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shopper-terms" element={<ShopperTerms />} />

            {/* Station Dashboard routes - require authentication */}
            <Route path="/station-dashboard" element={
              <ProtectedRoute>
                <StationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/products" element={
              <ProtectedRoute>
                <ProductsManagement />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/station" element={
              <ProtectedRoute>
                <StationManagement />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/orders" element={
              <ProtectedRoute>
                <OrdersManagement />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/earnings" element={
              <ProtectedRoute>
                <EarningsTransactions />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/customers" element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/support" element={
              <ProtectedRoute>
                <SupportHelp />
              </ProtectedRoute>
            } />
            <Route path="/station-dashboard/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />



            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
