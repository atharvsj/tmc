'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Tooltip, alpha, useTheme } from '@mui/material';

const CleanlinessHeatmap = ({ wards }) => {
  const theme = useTheme();
  
  // Generate mock cleanliness data for each ward
  const wardData = wards?.map(ward => ({
    name: ward,
    score: Math.floor(Math.random() * 40) + 60, // 60-100
  })) || [
    { name: 'Naupada', score: 85 },
    { name: 'Kopri', score: 72 },
    { name: 'Wagle Estate', score: 91 },
    { name: 'Vartak Nagar', score: 68 },
    { name: 'Majiwada', score: 78 },
    { name: 'Manpada', score: 82 },
    { name: 'Kasarvadavali', score: 65 },
    { name: 'Kolshet', score: 88 },
    { name: 'Balkum', score: 74 },
    { name: 'Kalwa', score: 69 },
    { name: 'Mumbra', score: 62 },
    { name: 'Diva', score: 71 },
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return theme.palette.success.main;
    if (score >= 75) return theme.palette.success.light;
    if (score >= 65) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 65) return 'Fair';
    return 'Poor';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Ward Cleanliness Heatmap
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
          Cleanliness scores across Thane wards
        </Typography>

        <Grid container spacing={1}>
          {wardData.map((ward, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Tooltip
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>{ward.name}</Typography>
                    <Typography variant="body2">Score: {ward.score}/100</Typography>
                    <Typography variant="caption">{getScoreLabel(ward.score)}</Typography>
                  </Box>
                }
                arrow
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(getScoreColor(ward.score), 0.15),
                    border: '2px solid',
                    borderColor: alpha(getScoreColor(ward.score), 0.5),
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: `0 4px 12px ${alpha(getScoreColor(ward.score), 0.3)}`,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: getScoreColor(ward.score) }}
                  >
                    {ward.score}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {ward.name}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, flexWrap: 'wrap' }}>
          {[
            { label: 'Excellent (85+)', color: theme.palette.success.main },
            { label: 'Good (75-84)', color: theme.palette.success.light },
            { label: 'Fair (65-74)', color: theme.palette.warning.main },
            { label: 'Poor (<65)', color: theme.palette.error.main },
          ].map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 1,
                  bgcolor: item.color,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CleanlinessHeatmap;
