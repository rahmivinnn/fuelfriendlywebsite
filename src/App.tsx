
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, UserRole } from "@/contexts/AuthContext";
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
  children
}: {
  children: React.ReactNode
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
