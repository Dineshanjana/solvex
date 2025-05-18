import React, { useState } from 'react';
import './Analytics.css';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';

const Analytics = () => {
  // Demo data for summary cards
  const summaryData = [
    { title: 'Total Connections', value: '1,243', change: '+8.7%', icon: '📈' },
    { title: 'Engagement Rate', value: '24.6%', change: '+2.3%', icon: '👥' },
    { title: 'Response Time', value: '1.2h', change: '-14%', icon: '⏱️' },
    { title: 'Conversion Rate', value: '7.8%', change: '+1.5%', icon: '🎯' }
  ];

  // Demo data for charts
  const engagementData = [
    { name: 'Jan', twitter: 4000, instagram: 2400, linkedin: 1800 },
    { name: 'Feb', twitter: 3000, instagram: 1398, linkedin: 2210 },
    { name: 'Mar', twitter: 2000, instagram: 3800, linkedin: 2290 },
    { name: 'Apr', twitter: 2780, instagram: 3908, linkedin: 3000 },
    { name: 'May', twitter: 1890, instagram: 4800, linkedin: 2181 },
    { name: 'Jun', twitter: 2390, instagram: 3800, linkedin: 2500 },
    { name: 'Jul', twitter: 3490, instagram: 4300, linkedin: 2100 }
  ];

  const topContent = [
    { title: 'The Future of AI in Marketing', platform: 'LinkedIn', engagement: 847 },
    { title: 'How to Optimize Your Social Media Strategy', platform: 'Twitter', engagement: 752 },
    { title: '10 Tips for Growing Your Audience', platform: 'Instagram', engagement: 683 },
    { title: 'Case Study: AI Transformation Success', platform: 'LinkedIn', engagement: 592 }
  ];

  const audienceData = [
    { name: 'Technology', value: 35 },
    { name: 'Marketing', value: 25 },
    { name: 'Finance', value: 15 },
    { name: 'Education', value: 12 },
    { name: 'Healthcare', value: 8 },
    { name: 'Other', value: 5 }
  ];

  const COLORS = ['#41e8b3', '#2cd5fb', '#ff9a9e', '#f5a623', '#9013fe', '#4a90e2'];

  return (
    <div className="analytics-wrapper">
      <div className="analytics-container">
        <h1 className="page-title">Analytics Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="summary-cards">
          {summaryData.map((item, index) => (
            <div className="summary-card" key={index}>
              <div className="card-icon">{item.icon}</div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="card-value">{item.value}</p>
                <div className={`card-change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Engagement Trends */}
        <div className="analytics-row">
          <div className="analytics-col full">
            <div className="analytics-panel">
              <h2 className="panel-title">Engagement Trends</h2>
              <div className="panel-content">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="twitter" stroke="#2cd5fb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="instagram" stroke="#ff9a9e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="linkedin" stroke="#41e8b3" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="analytics-row">
          {/* Top Performing Content */}
          <div className="analytics-col">
            <div className="analytics-panel">
              <h2 className="panel-title">Top Performing Content</h2>
              <div className="panel-content">
                <div className="content-table">
                  {topContent.map((item, index) => (
                    <div className="content-item" key={index}>
                      <div className="content-info">
                        <h4>{item.title}</h4>
                        <div className="platform-badge">{item.platform}</div>
                      </div>
                      <div className="content-engagement">
                        <div className="engagement-score">{item.engagement}</div>
                        <div className="engagement-bar">
                          <div className="bar-fill" style={{ width: `${(item.engagement / 1000) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Audience Analysis */}
          <div className="analytics-col">
            <div className="analytics-panel">
              <h2 className="panel-title">Audience Analysis</h2>
              <div className="panel-content pie-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;