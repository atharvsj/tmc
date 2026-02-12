'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  alpha,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AIInsightCard = ({
  type = 'info',
  title,
  message,
  action,
  severity,
  timestamp,
  onAction,
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircleIcon,
          color: 'success',
          bgColor: '#e8f5e9',
          borderColor: '#4caf50',
        };
      case 'warning':
        return {
          icon: WarningIcon,
          color: 'warning',
          bgColor: '#fff3e0',
          borderColor: '#ff9800',
        };
      case 'error':
      case 'alert':
        return {
          icon: ErrorIcon,
          color: 'error',
          bgColor: '#ffebee',
          borderColor: '#f44336',
        };
      case 'opportunity':
        return {
          icon: LightbulbIcon,
          color: 'secondary',
          bgColor: '#e0f2f1',
          borderColor: '#00796b',
        };
      case 'forecast':
        return {
          icon: AutoAwesomeIcon,
          color: 'primary',
          bgColor: '#e8eaf6',
          borderColor: '#3f51b5',
        };
      case 'policy':
        return {
          icon: LightbulbIcon,
          color: 'info',
          bgColor: '#e3f2fd',
          borderColor: '#2196f3',
        };
      default:
        return {
          icon: InfoIcon,
          color: 'info',
          bgColor: '#e3f2fd',
          borderColor: '#2196f3',
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <Card
      sx={{
        bgcolor: config.bgColor,
        borderLeft: `4px solid ${config.borderColor}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(config.borderColor, 0.15),
              color: config.borderColor,
              flexShrink: 0,
            }}
          >
            <IconComponent sx={{ fontSize: 20 }} />
          </Box>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" fontWeight={600} color="primary.main">
                  AI Insight
                </Typography>
              </Box>
              {severity && (
                <Chip
                  label={severity}
                  size="small"
                  color={severity === 'high' ? 'error' : severity === 'medium' ? 'warning' : 'info'}
                  sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                />
              )}
            </Box>

            {title && (
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                {title}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {message}
            </Typography>

            {(action || timestamp) && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
                {action && (
                  <Box
                    onClick={onAction}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: config.borderColor,
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      {action}
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 14 }} />
                  </Box>
                )}
                {timestamp && (
                  <Typography variant="caption" color="text.secondary">
                    {timestamp}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;
