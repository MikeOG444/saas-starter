import React from "react";
import "./../styles/global.css";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import PricingPage from "./pricing";
import DashboardPage from "./dashboard";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import { Router, Routes, Route } from "./../util/router";
import PurchasePage from "./purchase";
import NotFoundPage from "./404";
import Footer from "./../components/Footer";
import "./../util/analytics";
import Chat from "./../components/Chat";
import { AuthProvider } from "./../util/auth";
import { QueryClientProvider } from "./../util/db";

function App(props) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <Chat />
        <Router>
          <Navbar bgColor="bg-white" />

          <Routes>
            <Route path="/" element={<IndexPage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route path="/faq" element={<FaqPage />} />

            <Route path="/contact" element={<ContactPage />} />

            <Route path="/pricing" element={<PricingPage />} />

            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/auth/:type" element={<AuthPage />} />

            <Route path="/settings/:section" element={<SettingsPage />} />

            <Route path="/legal/:section" element={<LegalPage />} />

            <Route path="/purchase/:plan" element={<PurchasePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer
            size="md"
            bgColor="bg-white"
            bgImage=""
            bgImageOpacity={1}
            textColor=""
            sticky={true}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
