import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';

const getScoreColor = (score) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
};

const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

const WardPerformanceTable = ({ data, title, subtitle }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {title || 'Ward Performance Comparison'}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Ward</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Water</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Waste</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Complaints</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Satisfaction</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((ward, index) => {
                const avgScore = (parseInt(ward.water) + parseInt(ward.waste) + parseInt(ward.satisfaction)) / 3;
                
                return (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      bgcolor: avgScore < 60 ? 'error.50' : 'transparent',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {ward.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {ward.water}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={parseInt(ward.water)}
                          color={getScoreColor(ward.water)}
                          sx={{ width: 50, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {ward.waste}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={parseInt(ward.waste)}
                          color={getScoreColor(ward.waste)}
                          sx={{ width: 50, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={ward.complaints}
                        size="small"
                        color={ward.complaints > 25 ? 'error' : ward.complaints > 15 ? 'warning' : 'success'}
                        sx={{ minWidth: 40, fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {ward.satisfaction}%
                        </Typography>
                        {parseInt(ward.satisfaction) >= 70 ? (
                          <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        ) : (
                          <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getScoreLabel(avgScore)}
                        size="small"
                        color={getScoreColor(avgScore)}
                        sx={{ fontSize: '0.65rem', fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton size="small" color="primary">
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default WardPerformanceTable;
