'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress, Avatar, Paper, alpha, useTheme } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const TaskCard = ({ task, type }) => {
  const theme = useTheme();
  
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'error', icon: ErrorIcon, label: 'High' };
      case 'medium':
        return { color: 'warning', icon: WarningIcon, label: 'Medium' };
      case 'low':
        return { color: 'info', icon: InfoIcon, label: 'Low' };
      default:
        return { color: 'default', icon: InfoIcon, label: 'Normal' };
    }
  };

  const priorityConfig = task.priority ? getPriorityConfig(task.priority) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {task.id}
        </Typography>
        {priorityConfig && (
          <Chip
            label={priorityConfig.label}
            size="small"
            color={priorityConfig.color}
            sx={{ height: 20, fontSize: '0.6rem', fontWeight: 600 }}
          />
        )}
      </Box>

      <Typography variant="body2" fontWeight={600} mb={1}>
        {task.title}
      </Typography>

      {task.ward && (
        <Chip
          label={task.ward}
          size="small"
          variant="outlined"
          sx={{ height: 22, fontSize: '0.65rem', mb: 1 }}
        />
      )}

      {type === 'inProgress' && task.progress && (
        <Box sx={{ mt: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {task.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={task.progress}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}

      {type === 'completed' && task.completedAt && (
        <Typography variant="caption" color="text.secondary">
          Completed: {task.completedAt}
        </Typography>
      )}

      {task.assignee && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.main' }}>
            {task.assignee.charAt(0)}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {task.assignee}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

const KanbanColumn = ({ title, tasks, type, icon: Icon, color }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 280,
        maxWidth: 350,
        bgcolor: alpha(theme.palette[color]?.main || theme.palette.grey[500], 0.04),
        borderRadius: 3,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Icon sx={{ fontSize: 20, color: `${color}.main` }} />
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
        <Chip
          label={tasks.length}
          size="small"
          sx={{
            height: 22,
            minWidth: 28,
            bgcolor: `${color}.main`,
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      </Box>

      <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 0.5 }}>
        {tasks.map((task, index) => (
          <TaskCard key={task.id || index} task={task} type={type} />
        ))}
      </Box>
    </Box>
  );
};

const TaskKanban = ({ kanbanTasks }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Task Management Board
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={3}>
          Real-time task tracking and workflow management
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'divider',
              borderRadius: 4,
            },
          }}
        >
          <KanbanColumn
            title="Pending"
            tasks={kanbanTasks.pending}
            type="pending"
            icon={AssignmentIcon}
            color="warning"
          />
          <KanbanColumn
            title="In Progress"
            tasks={kanbanTasks.inProgress}
            type="inProgress"
            icon={PlayArrowIcon}
            color="info"
          />
          <KanbanColumn
            title="Completed"
            tasks={kanbanTasks.completed}
            type="completed"
            icon={CheckCircleIcon}
            color="success"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskKanban;
