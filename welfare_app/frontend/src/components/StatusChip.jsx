import React from 'react';
import { Chip, Box } from '@mui/material';

const StatusChip = ({ status, label, size = 'small', variant = 'filled' }) => {
  const getStatusConfig = () => {
    const statusLower = status?.toLowerCase() || 'default';
    
    switch (statusLower) {
      case 'active':
      case 'completed':
      case 'good':
      case 'safe':
      case 'success':
      case 'operational':
        return {
          color: 'success',
          pulseColor: '#4caf50',
        };
      case 'warning':
      case 'delayed':
      case 'pending':
      case 'in-progress':
      case 'inprogress':
      case 'degraded':
        return {
          color: 'warning',
          pulseColor: '#ff9800',
        };
      case 'error':
      case 'critical':
      case 'offline':
      case 'failed':
        return {
          color: 'error',
          pulseColor: '#f44336',
        };
      case 'scheduled':
      case 'info':
      case 'upcoming':
        return {
          color: 'info',
          pulseColor: '#2196f3',
        };
      default:
        return {
          color: 'default',
          pulseColor: '#9e9e9e',
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || status;

  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: config.pulseColor,
              animation: status === 'active' || status === 'operational' 
                ? 'pulse 2s infinite' 
                : 'none',
              '@keyframes pulse': {
                '0%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.6, transform: 'scale(0.9)' },
                '100%': { opacity: 1, transform: 'scale(1)' },
              },
            }}
          />
          {displayLabel}
        </Box>
      }
      size={size}
      color={config.color}
      variant={variant}
      sx={{
        fontWeight: 600,
        fontSize: size === 'small' ? '0.7rem' : '0.8rem',
        borderRadius: 1.5,
      }}
    />
  );
};

export default StatusChip;
