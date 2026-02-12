import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const WaterQualityGauge = ({ waterQuality }) => {
  const getQualityColor = (index) => {
    if (index >= 80) return '#4caf50';
    if (index >= 60) return '#ff9800';
    return '#f44336';
  };

  const getQualityLabel = (index) => {
    if (index >= 80) return 'Excellent';
    if (index >= 60) return 'Good';
    if (index >= 40) return 'Fair';
    return 'Poor';
  };

  const qualityIndex = parseInt(waterQuality.index);
  const qualityColor = getQualityColor(qualityIndex);

  const parameters = [
    { label: 'pH Level', value: waterQuality.ph, unit: '', range: '6.5-8.5', status: parseFloat(waterQuality.ph) >= 6.5 && parseFloat(waterQuality.ph) <= 8.5 },
    { label: 'Chlorine', value: waterQuality.chlorine, unit: 'mg/L', range: '0.2-1.0', status: parseFloat(waterQuality.chlorine) >= 0.2 && parseFloat(waterQuality.chlorine) <= 1.0 },
    { label: 'Turbidity', value: waterQuality.turbidity, unit: 'NTU', range: '< 4.0', status: parseFloat(waterQuality.turbidity) < 4.0 },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Water Quality Index
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
          Last tested: {waterQuality.lastTested}
        </Typography>

        {/* Main Gauge */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              position: 'relative',
              width: 160,
              height: 160,
              margin: '0 auto',
              borderRadius: '50%',
              background: `conic-gradient(${qualityColor} ${qualityIndex * 3.6}deg, #e0e0e0 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h3" fontWeight={700} sx={{ color: qualityColor }}>
                {qualityIndex}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                out of 100
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
            <Chip
              icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
              label={`${getQualityLabel(qualityIndex)} - ${waterQuality.status}`}
              color="success"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>

        {/* Parameters */}
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Quality Parameters
        </Typography>
        <Grid container spacing={2}>
          {parameters.map((param, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {param.status ? (
                    <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  ) : (
                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  )}
                  <Typography variant="body2" fontWeight={500}>
                    {param.label}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {param.value} {param.unit}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, (parseFloat(param.value) / 10) * 100)}
                  color={param.status ? 'success' : 'warning'}
                  sx={{ flex: 1, height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Range: {param.range}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WaterQualityGauge;
