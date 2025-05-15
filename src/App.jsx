import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import PlatformFeatures from './components/PlatformFeatures';
import IntegrationsSection from './components/IntegrationsSection';
import MetricsShowcase from './components/MetricsShowcase';
import EnterpriseLanding from './components/EnterpriseLanding';
import SolveXAgent from './agent/App';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <PlatformFeatures />
            <IntegrationsSection />
            <MetricsShowcase />
            <EnterpriseLanding />
          </>
        } />
        <Route path="/interface" element={<SolveXAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
