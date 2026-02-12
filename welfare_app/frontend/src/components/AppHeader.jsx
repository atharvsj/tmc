'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RefreshIcon from '@mui/icons-material/Refresh';

const AppHeader = ({ role, onRoleChange, onMenuClick, onRefresh }) => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [systemStatus, setSystemStatus] = useState('operational');

  const statusColor = systemStatus === 'operational'
    ? '#4caf50'
    : systemStatus === 'degraded'
    ? '#ff9800'
    : '#9e9e9e';

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const statusTimer = setInterval(() => {
      const statuses = ['operational', 'operational', 'operational', 'degraded'];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return '--';
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getRoleIcon = (r) => {
    switch (r) {
      case 'citizen':
        return <PersonIcon sx={{ fontSize: 18 }} />;
      case 'employee':
        return <EngineeringIcon sx={{ fontSize: 18 }} />;
      case 'leadership':
        return <AccountBalanceIcon sx={{ fontSize: 18 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 18 }} />;
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: 'primary.main',
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 26, color: theme.palette.primary.contrastText }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}
              >
                Thane Municipal Corporation
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'white', letterSpacing: '0.02em' }}
              >
                Smart City Governance Platform
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center Section - Role Switcher */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newRole) => newRole && onRoleChange(newRole)}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.contrastText, 0.08),
              borderRadius: 2,
              '& .MuiToggleButton-root': {
                color: alpha(theme.palette.primary.contrastText, 0.85),
                border: 'none',
                px: 2,
                py: 0.75,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.contrastText, 0.18),
                  color: theme.palette.primary.main,
                },
                
              },
            }}
          >
            <ToggleButton value="citizen">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                {getRoleIcon('citizen')}
                <span>Citizen</span>
              </Box>
            </ToggleButton>
            <ToggleButton value="employee">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                {getRoleIcon('employee')}
                <span>Employee</span>
              </Box>
            </ToggleButton>
            <ToggleButton value="leadership">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                {getRoleIcon('leadership')}
                <span>Leadership</span>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* System Status */}
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{
                  fontSize: 12,
                  color: statusColor,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            }
            label={systemStatus === 'operational' ? 'All Systems Operational' : 'Degraded'}
            size="small"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              bgcolor: 'rgba(252, 252, 252, 0.1)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 500,
              height: 28,
              '& .MuiChip-icon': {
                ml: 1,
              },
            }}
          />

          {/* Date & Time */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
              px: 1.5,
              py: 0.5,
              bgcolor: 'rgba(218, 210, 210, 0.08)',
              borderRadius: 1.5,
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem' }}>
              {formatDate(currentTime)}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace', color: 'white' }}>
              {formatTime(currentTime)}
            </Typography>
          </Box>

          {/* Refresh Button */}
          <Tooltip title="Refresh Data">
            <IconButton
              color="inherit"
              onClick={() => {
                console.log('[AppHeader] refresh clicked');
                if (typeof onRefresh === 'function') {
                  try {
                    onRefresh();
                  } catch (err) {
                    console.error('[AppHeader] onRefresh threw', err);
                  }
                } else {
                  console.warn('[AppHeader] onRefresh is not a function', onRefresh);
                }
              }}
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              <RefreshIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton >
          </Tooltip>

          {/* User Avatar */}
          <Tooltip title="Profile">
            <IconButton 
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}            
                sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: alpha(theme.palette.secondary.main, 0.8),
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {role === 'citizen' ? 'C' : role === 'employee' ? 'E' : 'L'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: { mt: 1, minWidth: 180 },
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>My Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Account Settings</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
