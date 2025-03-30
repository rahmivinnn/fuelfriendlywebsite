
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
