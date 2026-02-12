'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material';
import theme from './utils/theme';
import AppHeader from './components/AppHeader';
import CitizenDashboard from './dashboards/CitizensDashboard';
import EmployeeDashboard from './dashboards/EmployeesDashboard';
import LeadershipDashboard from './dashboards/LeadershipDashboard';
import { getCitizenData, getEmployeeData, getLeadershipData } from './data/mockData';

const DRAWER_WIDTH = 260;

const App = () => {
  const [role, setRole] = useState('citizen');
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citizenData, setCitizenData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [leadershipData, setLeadershipData] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [mounted, setMounted] = useState(false);

  const refreshData = useCallback(() => {
    try {
      console.log('[App] refreshData called');
      setCitizenData(getCitizenData());
      setEmployeeData(getEmployeeData());
      setLeadershipData(getLeadershipData());
      setLastRefresh(new Date());
    } catch (err) {
      console.error('[App] refreshData error', err);
    }
  }, []);

  useEffect(() => {
    try {
      // expose for manual testing in the browser console
      // call `window.__refreshData()` to trigger programmatic refresh
      window.__refreshData = refreshData;
      console.log('[App] refreshData exposed at window.__refreshData');
    } catch (err) {
      // ignore in environments where window is not available
    }
    return () => {
      try {
        delete window.__refreshData;
      } catch (e) {}
    };
  }, [refreshData]);

  useEffect(() => {
    setMounted(true);
    refreshData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setActiveSection('overview');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderDashboard = () => {
    if (!citizenData || !employeeData || !leadershipData) {
      return null;
    }

    switch (role) {
      case 'citizen':
        return <CitizenDashboard data={citizenData} />;
      case 'employee':
        return <EmployeeDashboard data={employeeData} />;
      case 'leadership':
        return <LeadershipDashboard data={leadershipData} />;
      default:
        return <CitizenDashboard data={citizenData} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppHeader
          role={role}
          onRoleChange={handleRoleChange}
          onMenuClick={handleDrawerToggle}
          onRefresh={refreshData}
        />
        
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            mt: 6,
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          {renderDashboard()}
          
          {/* Footer */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <Box sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              © 2025 Thane Municipal Corporation. Smart City Governance Platform v2.4
            </Box>
            <Box sx={{ color: 'text.secondary', fontSize: '0.7rem', mt: 0.5 }}>
              Last refreshed: {mounted && lastRefresh ? lastRefresh.toLocaleTimeString() : '--:--:--'}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
