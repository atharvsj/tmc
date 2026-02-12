import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

const WaterSupplyTimeline = ({ timeline }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <WaterDropIcon sx={{ fontSize: 16, color: '#4caf50' }} />;
      case 'completed':
        return <CheckCircleIcon sx={{ fontSize: 16, color: '#2196f3' }} />;
      case 'scheduled':
        return <ScheduleIcon sx={{ fontSize: 16, color: '#9e9e9e' }} />;
      default:
        return <ScheduleIcon sx={{ fontSize: 16, color: '#9e9e9e' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'scheduled':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Today's Water Supply Schedule
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
          Your area water supply timeline
        </Typography>

        <Box sx={{ position: 'relative', pl: 3 }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: 7,
              top: 8,
              bottom: 8,
              width: 2,
              bgcolor: 'divider',
              borderRadius: 1,
            }}
          />

          {timeline.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: index < timeline.length - 1 ? 3 : 0,
                position: 'relative',
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -24,
                  top: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: item.status === 'active' ? '#4caf50' : item.status === 'completed' ? '#2196f3' : '#e0e0e0',
                  border: '3px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: item.status === 'active' ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' },
                  },
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item.time}
                  </Typography>
                  <Chip
                    label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    size="small"
                    color={getStatusColor(item.status)}
                    sx={{ height: 22, fontSize: '0.65rem' }}
                  />
                </Box>
                {item.duration && (
                  <Typography variant="caption" color="text.secondary">
                    Duration: {item.duration}
                  </Typography>
                )}
              </Box>

              {getStatusIcon(item.status)}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WaterSupplyTimeline;
