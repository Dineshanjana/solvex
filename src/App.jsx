import React from 'react';
import SproutSocialHomepage from './SproutSocialHomepage';
import PlatformFeatures from './PlatformFeatures';
import IntegrationsSection from './IntegrationsSection';
import MetricsShowcase from './MetricsShowcase';
import EnterpriseLanding from './EnterpriseLanding';

function App() {
  return (
    <div className="App">
      {/* Other components */}
      <SproutSocialHomepage />
      <PlatformFeatures />
      <IntegrationsSection />
      <MetricsShowcase />
      <EnterpriseLanding />
      {/* Other components */}
    </div>
  );
}

export default App;