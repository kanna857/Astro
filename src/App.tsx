import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AnalyzePage from "./pages/AnalyzePage";
import DashboardPage from "./pages/DashboardPage";
import CompareFieldsPage from "./pages/CompareFieldsPage";
import AboutPage from "./pages/AboutPage";
import FuturePage from "./pages/FuturePage";
import AuthPage from "./pages/AuthPage";
import DiagnosePage from "./pages/DiagnosePage";
import ChatbotPage from "./pages/ChatbotPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/sky-crop-health">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/compare" element={<CompareFieldsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/diagnose" element={<DiagnosePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
