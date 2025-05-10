
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, UserRole } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/organisms/ChatBot";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NearbyStations from "./pages/NearbyStations";
import StationRegistration from "./pages/StationRegistration";
import StationDashboard from "./pages/StationDashboard";
import IndependentContractorAgreement from "./pages/IndependentContractorAgreement";
import IndependentContractorAgreementFull from "./pages/IndependentContractorAgreementFull";
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

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({
  children,
  requiredRole = UserRole.Guest
}: {
  children: React.ReactNode,
  requiredRole?: UserRole
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.role < requiredRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ChatBot />
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/nearby-stations" element={<NearbyStations />} />
            <Route path="/station-registration" element={<StationRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/independent-contractor-agreement" element={<IndependentContractorAgreement />} />
            <Route path="/independent-contractor-agreement-full" element={<IndependentContractorAgreementFull />} />

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

            {/* Admin Dashboard routes - require admin role */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRole={UserRole.Level1}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard/users" element={
              <ProtectedRoute requiredRole={UserRole.Level2}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard/access-control" element={
              <ProtectedRoute requiredRole={UserRole.SuperiorAdmin}>
                <AccessControl />
              </ProtectedRoute>
            } />

            {/* Access Denied route */}
            <Route path="/access-denied" element={
              <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
                <button
                  onClick={() => window.history.back()}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Go Back
                </button>
              </div>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
