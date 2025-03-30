
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NearbyStations from "./pages/NearbyStations";
import StationDashboard from "./pages/StationDashboard";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nearby-stations" element={<NearbyStations />} />
          <Route path="/station-dashboard" element={<StationDashboard />} />
          <Route path="/station-dashboard/products" element={<ProductsManagement />} />
          <Route path="/station-dashboard/station" element={<StationManagement />} />
          <Route path="/station-dashboard/orders" element={<OrdersManagement />} />
          <Route path="/station-dashboard/earnings" element={<EarningsTransactions />} />
          <Route path="/station-dashboard/customers" element={<Customers />} />
          <Route path="/station-dashboard/reports" element={<Reports />} />
          <Route path="/station-dashboard/messages" element={<Messages />} />
          <Route path="/station-dashboard/notifications" element={<Notifications />} />
          <Route path="/station-dashboard/support" element={<SupportHelp />} />
          <Route path="/station-dashboard/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
