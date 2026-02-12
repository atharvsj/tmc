import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const KPICard = ({
  title,
  value,
  unit,
  subtitle,
  trend,
  trendValue,
  progress,
  progressTarget,
  status,
  icon: Icon,
  tooltip,
  color = 'primary',
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon sx={{ fontSize: 18 }} />;
      case 'down':
        return <TrendingDownIcon sx={{ fontSize: 18 }} />;
      default:
        return <TrendingFlatIcon sx={{ fontSize: 18 }} />;
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'success.main';
    if (trend === 'down') return 'error.main';
    return 'text.secondary';
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
      case 'good':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
      case 'critical':
        return 'error';
      default:
        return 'info';
    }
  };

  const getProgressColor = () => {
    if (!progressTarget) return color;
    const percentage = (progress / progressTarget) * 100;
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        borderLeft: status ? `4px solid` : 'none',
        borderColor: status ? `${getStatusColor()}.main` : 'transparent',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {Icon && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${color}.main`,
                  color: 'white',
                }}
              >
                <Icon sx={{ fontSize: 22 }} />
              </Box>
            )}
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
          </Box>
          {tooltip && (
            <Tooltip title={tooltip} arrow placement="top">
              <IconButton size="small" sx={{ ml: 1, color: 'text.secondary' }}>
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            {value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {unit}
            </Typography>
          )}
        </Box>

        {(trend || trendValue) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: getTrendColor() }}>
              {getTrendIcon()}
              {trendValue && (
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                  {trendValue}
                </Typography>
              )}
            </Box>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        {!trend && subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {progress !== undefined && (
          <Box sx={{ mt: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {progress}{progressTarget ? `/${progressTarget}` : '%'}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressTarget ? (progress / progressTarget) * 100 : progress}
              color={getProgressColor()}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        {status && (
          <Box sx={{ mt: 1.5 }}>
            <Chip
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              size="small"
              color={getStatusColor()}
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
