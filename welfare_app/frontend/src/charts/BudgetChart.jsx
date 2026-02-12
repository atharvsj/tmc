import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const BudgetChart = ({ data, title, subtitle }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const allocated = payload.find(p => p.dataKey === 'allocated');
      const spent = payload.find(p => p.dataKey === 'spent');
      const utilization = allocated && spent 
        ? ((spent.value / allocated.value) * 100).toFixed(1) 
        : 0;

      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 1,
                  bgcolor: entry.color,
                }}
              />
              <Typography variant="caption">
                {entry.name}: ₹{entry.value} Cr
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              mt: 1,
              pt: 1,
              borderTop: '1px dashed',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              Utilization: {utilization}%
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            {subtitle}
          </Typography>
        )}

        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
                label={{
                  value: '₹ Crores',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#666', fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                iconType="rect"
                iconSize={10}
              />
              <Bar
                dataKey="allocated"
                name="Allocated"
                fill="#1a237e"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="spent"
                name="Spent"
                fill="#00796b"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                {data.map((entry, index) => {
                  const utilization = (entry.spent / entry.allocated) * 100;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={utilization > 90 ? '#f44336' : utilization > 75 ? '#ff9800' : '#00796b'}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
