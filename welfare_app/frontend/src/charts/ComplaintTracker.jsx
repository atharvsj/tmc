import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stepper, Step, StepLabel, StepContent, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';

const ComplaintTracker = ({ complaints }) => {
  const mockComplaint = {
    id: 'CMP-2025-0847',
    type: 'Water Supply Issue',
    status: 'In Progress',
    date: '28 Jan 2025',
    ward: 'Naupada',
    steps: [
      { label: 'Complaint Registered', completed: true, date: '28 Jan, 10:30 AM' },
      { label: 'Assigned to Team', completed: true, date: '28 Jan, 11:15 AM' },
      { label: 'Work in Progress', completed: true, date: '28 Jan, 02:00 PM', current: true },
      { label: 'Quality Check', completed: false, date: '' },
      { label: 'Resolved', completed: false, date: '' },
    ],
    estimatedResolution: '29 Jan 2025',
    assignedTeam: 'Water Team A',
  };

  const activeStep = mockComplaint.steps.findIndex(step => step.current) || 2;

  const getStepIcon = (index, completed) => {
    if (completed) {
      return <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />;
    }
    switch (index) {
      case 0:
        return <AssignmentTurnedInIcon sx={{ fontSize: 20 }} />;
      case 1:
        return <HourglassEmptyIcon sx={{ fontSize: 20 }} />;
      case 2:
        return <BuildIcon sx={{ fontSize: 20 }} />;
      case 3:
        return <VerifiedIcon sx={{ fontSize: 20 }} />;
      case 4:
        return <CheckCircleIcon sx={{ fontSize: 20 }} />;
      default:
        return <HourglassEmptyIcon sx={{ fontSize: 20 }} />;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Complaint Progress Tracker
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
          Track your latest complaint status
        </Typography>

        {/* Complaint Info */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            bgcolor: alpha('#1a237e', 0.05),
            border: '1px solid',
            borderColor: alpha('#1a237e', 0.1),
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {mockComplaint.id}
            </Typography>
            <Chip
              label={mockComplaint.status}
              size="small"
              color="warning"
              sx={{ fontWeight: 600, fontSize: '0.65rem' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {mockComplaint.type}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="caption" color="text.secondary">
              📍 {mockComplaint.ward}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              📅 {mockComplaint.date}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              👥 {mockComplaint.assignedTeam}
            </Typography>
          </Box>
        </Box>

        {/* Progress Stepper */}
        <Stepper activeStep={activeStep} orientation="vertical">
          {mockComplaint.steps.map((step, index) => (
            <Step key={index} completed={step.completed}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: step.completed
                        ? 'success.main'
                        : step.current
                        ? 'warning.main'
                        : 'grey.200',
                      color: step.completed || step.current ? 'white' : 'grey.500',
                    }}
                  >
                    {getStepIcon(index, step.completed)}
                  </Box>
                )}
              >
                <Typography variant="body2" fontWeight={step.current ? 600 : 400}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                {step.date && (
                  <Typography variant="caption" color="text.secondary">
                    {step.date}
                  </Typography>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* Estimated Resolution */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha('#00796b', 0.08),
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Estimated Resolution
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} color="secondary.main">
            {mockComplaint.estimatedResolution}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComplaintTracker;
