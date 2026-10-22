import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { MusicProvider } from "@/context/MusicContext";
import EventWidget from "@/components/common/EventWidget";
import { ENABLED_PAGES } from "@/config/navigation";

// Lazy loaded page components
const Home = lazy(() => import("@/pages/Home"));
const ProgramsHub = lazy(() => import("@/pages/ProgramsHub"));
const Friends = lazy(() => import("@/pages/Friends"));
const Mbaise = lazy(() => import("@/pages/Mbaise"));
const Projects = lazy(() => import("@/pages/Projects"));
const Games = lazy(() => import("@/pages/Games"));
const ExperienceGallery = lazy(() => import("@/pages/ExperienceGallery"));

const suspenseFallback = (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MusicProvider>
        <div className="flex flex-col min-h-screen bg-gray-950 text-white selection:bg-amber-500 selection:text-black">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={suspenseFallback}>
              <Routes>
                <Route
                  path="/"
                  element={ENABLED_PAGES.home?.enabled ? <Home /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/programs-hub"
                  element={ENABLED_PAGES.programsHub?.enabled ? <ProgramsHub /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/friends"
                  element={ENABLED_PAGES.friends?.enabled ? <Friends /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/mbaise"
                  element={ENABLED_PAGES.mbaise?.enabled ? <Mbaise /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/projects"
                  element={ENABLED_PAGES.projects?.enabled ? <Projects /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/games"
                  element={ENABLED_PAGES.games?.enabled ? <Games /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/experience-gallery"
                  element={
                    ENABLED_PAGES.experienceGallery?.enabled ? (
                      <ExperienceGallery />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <EventWidget />
          <Footer />
        </div>
      </MusicProvider>
    </Router>
  );
}