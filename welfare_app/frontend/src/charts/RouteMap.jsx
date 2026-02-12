'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar, alpha, useTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PlaceIcon from '@mui/icons-material/Place';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RouteMap = () => {
  const theme = useTheme();

  const routes = [
    {
      id: 'R-001',
      vehicle: 'TN-04-AB-1234',
      driver: 'Ramesh K.',
      status: 'active',
      stops: 12,
      completed: 8,
      eta: '45 min',
      zone: 'Zone A',
    },
    {
      id: 'R-002',
      vehicle: 'TN-04-CD-5678',
      driver: 'Suresh M.',
      status: 'active',
      stops: 15,
      completed: 6,
      eta: '1h 20min',
      zone: 'Zone B',
    },
    {
      id: 'R-003',
      vehicle: 'TN-04-EF-9012',
      driver: 'Ganesh P.',
      status: 'completed',
      stops: 10,
      completed: 10,
      eta: 'Done',
      zone: 'Zone C',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'delayed':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Route Optimization
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Live vehicle tracking and route status
            </Typography>
          </Box>
          <Chip
            icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
            label="3 Active"
            size="small"
            color="success"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Mock Map Area */}
        <Box
          sx={{
            height: 180,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            mb: 3,
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Grid lines to simulate map */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px),
                linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
          
          {/* Mock route lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <path
              d="M 30 140 Q 80 100, 120 80 T 200 60 T 280 90"
              fill="none"
              stroke={theme.palette.success.main}
              strokeWidth="3"
              strokeDasharray="8,4"
            />
            <path
              d="M 50 30 Q 100 70, 150 100 T 250 130"
              fill="none"
              stroke={theme.palette.info.main}
              strokeWidth="3"
              strokeDasharray="8,4"
            />
          </svg>

          {/* Vehicle markers */}
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              left: 180,
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.4)' },
                '70%': { boxShadow: '0 0 0 10px rgba(46, 125, 50, 0)' },
                '100%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0)' },
              },
            }}
          >
            <LocalShippingIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 110,
              left: 220,
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: 'info.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <LocalShippingIcon sx={{ fontSize: 16 }} />
          </Box>

          {/* Zone labels */}
          <Chip
            label="Zone A"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontSize: '0.65rem',
              height: 20,
              bgcolor: alpha(theme.palette.success.main, 0.2),
              color: 'success.dark',
            }}
          />
          <Chip
            label="Zone B"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize: '0.65rem',
              height: 20,
              bgcolor: alpha(theme.palette.info.main, 0.2),
              color: 'info.dark',
            }}
          />
        </Box>

        {/* Route List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {routes.map((route) => (
            <Box
              key={route.id}
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: `${getStatusColor(route.status)}.main`,
                }}
              >
                <LocalShippingIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {route.vehicle}
                  </Typography>
                  <Chip
                    label={route.status}
                    size="small"
                    color={getStatusColor(route.status)}
                    sx={{ height: 18, fontSize: '0.6rem' }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {route.driver} • {route.zone}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PlaceIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption">
                    {route.completed}/{route.stops}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" fontWeight={500}>
                    {route.eta}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteMap;
