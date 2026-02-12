import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ContractorRiskRadar = ({ data, title, subtitle }) => {
  const getRiskLevel = (risk) => {
    if (risk >= 40) return { label: 'High', color: 'error' };
    if (risk >= 25) return { label: 'Medium', color: 'warning' };
    return { label: 'Low', color: 'success' };
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title || 'Contractor Risk Assessment'}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block" mb={3}>
            {subtitle}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((contractor, index) => {
            const riskLevel = getRiskLevel(contractor.risk);
            
            return (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: contractor.risk >= 40 ? 'error.50' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: contractor.risk >= 40 ? 'error.main' : 'primary.main',
                      width: 44,
                      height: 44,
                    }}
                  >
                    <BusinessIcon />
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {contractor.name}
                      </Typography>
                      <Chip
                        icon={
                          contractor.risk >= 40 ? (
                            <WarningIcon sx={{ fontSize: 14 }} />
                          ) : (
                            <CheckCircleIcon sx={{ fontSize: 14 }} />
                          )
                        }
                        label={`${riskLevel.label} Risk`}
                        size="small"
                        color={riskLevel.color}
                        sx={{ fontSize: '0.65rem', fontWeight: 600 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          Risk Score
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={contractor.risk}
                            color={riskLevel.color}
                            sx={{ flex: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {contractor.risk}%
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          Performance
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={parseInt(contractor.performance)}
                            color={parseInt(contractor.performance) >= 85 ? 'success' : 'warning'}
                            sx={{ flex: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {contractor.performance}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContractorRiskRadar;
