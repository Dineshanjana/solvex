import React, { useState, useEffect, useRef } from 'react';
import '../css/MetricsShowcase.css';
import {
  Clock10Icon,
  ViewIcon,
  WindIcon
} from 'lucide-react';

const MetricsShowcase = () => {
  const [counts, setCounts] = useState({ response: 0, engagement: 0, retainer: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const metricsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          startCountAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, [hasAnimated]);

  const startCountAnimation = () => {
    const duration = 2000;
    const frames = 60;
    const interval = duration / frames;

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);

      setCounts({
        response: Math.min(Math.floor(80 * easeOutQuad), 80),
        engagement: Math.min(Math.floor(99 * easeOutQuad), 99),
        retainer: Math.min(Math.floor(2 * easeOutQuad), 2)
      });

      if (frame === frames) clearInterval(timer);
    }, interval);
  };

  return (
    <div className="metrics-container" ref={metricsRef}>
      <div className="metrics-wrapper">
        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">{counts.response}%+</h2>
            <p className="metric-description">
              reduction in average <span className="highlight">time to</span><br />
              <span className="highlight">first response</span>
            </p>
            <div className="integration-logo">
              <Clock10Icon size={40} />
            </div>
          </div>
        </div>

        <div className="vertical-divider"></div>

        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">{counts.engagement}%</h2>
            <p className="metric-description">
              increase in total <span className="highlight">social</span><br />
              <span className="highlight">engagements</span>
            </p>
            <div className="integration-logo">
              <ViewIcon size={40} />
            </div>
          </div>
        </div>

        <div className="vertical-divider"></div>

        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">{counts.retainer}x</h2>
            <p className="metric-description">
              increase in <span className="highlight">average client</span><br />
              <span className="highlight">retainer</span>
            </p>
            <div className="integration-logo">
              <WindIcon size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsShowcase;
