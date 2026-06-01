
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import MapPage from './pages/Map';
import Dashboard from './pages/Dashboard';
import Impact from './pages/Impact';
import Solutions from './pages/Solutions';
import Education from './pages/Education';
import ProjectContext from './pages/ProjectContext';
import TrustLegal from './pages/TrustLegal';
import ScrollToTop from './components/common/ScrollToTop';
import IntroVideo from './components/common/IntroVideo';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Check session storage if we only want to show it once per session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) setShowIntro(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroVideo onComplete={handleIntroComplete} />}
      </AnimatePresence>
      
      {!showIntro && (
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<Report />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/education" element={<Education />} />
              <Route path="/context" element={<ProjectContext />} />
              <Route path="/legal" element={<TrustLegal />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
