'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import GavelIcon from '@mui/icons-material/Gavel';
import SavingsIcon from '@mui/icons-material/Savings';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DRAWER_WIDTH = 260;

const menuConfig = {
  citizen: [
    { id: 'overview', label: 'Dashboard Overview', icon: DashboardIcon },
    { id: 'water', label: 'Water Supply', icon: WaterDropIcon },
    { id: 'waste', label: 'Waste & Cleanliness', icon: DeleteSweepIcon },
    { id: 'complaints', label: 'My Complaints', icon: ReportProblemIcon },
    { id: 'reports', label: 'Ward Reports', icon: AssessmentIcon },
  ],
  employee: [
    { id: 'overview', label: 'Operations Dashboard', icon: DashboardIcon },
    { id: 'tasks', label: 'Task Management', icon: BuildIcon },
    { id: 'workforce', label: 'Workforce', icon: GroupsIcon },
    { id: 'contractors', label: 'Contractors', icon: EngineeringIcon },
    { id: 'assets', label: 'Asset Health', icon: SecurityIcon },
    { id: 'safety', label: 'Safety & Compliance', icon: SecurityIcon },
  ],
  leadership: [
    { id: 'overview', label: 'Command Center', icon: AccountBalanceIcon },
    { id: 'performance', label: 'City Performance', icon: TrendingUpIcon },
    { id: 'equity', label: 'Ward Equity', icon: BalanceIcon },
    { id: 'budget', label: 'Budget & Cost', icon: SavingsIcon },
    { id: 'audit', label: 'Audit & Compliance', icon: GavelIcon },
    { id: 'sentiment', label: 'Public Sentiment', icon: PeopleIcon },
  ],
};

const Sidebar = ({ role, activeSection, onSectionChange, open, onClose }) => {
  const theme = useTheme();
  const menuItems = menuConfig[role] || menuConfig.citizen;

  const getRoleTitle = () => {
    switch (role) {
      case 'citizen':
        return 'Citizen Portal';
      case 'employee':
        return 'Operations Console';
      case 'leadership':
        return 'Leadership Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} color="primary.main">
          {getRoleTitle()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
         TMC Smart City Governance
        </Typography>
      </Box>

      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <ListItem key={item.id} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
              <ListItemButton
                onClick={() => onSectionChange(item.id)}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  bgcolor: isActive ? alpha(theme.palette.secondary.main, 0.12) : 'transparent',
                  color: isActive ? 'secondary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive
                      ? alpha(theme.palette.secondary.main, 0.18)
                      : alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'secondary.main' : 'text.secondary',
                  }}
                >
                  <Icon sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <List sx={{ py: 1 }}>
        <ListItem disablePadding sx={{ px: 1.5 }}>
          <ListItemButton sx={{ borderRadius: 2, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <SettingsIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ px: 1.5 }}>
          <ListItemButton sx={{ borderRadius: 2, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <HelpOutlineIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary="Help & Support"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.secondary.main, 0.03),
        }}
      >
        <Typography variant="caption" color="text.secondary" display="block">
          Thane Municipal Corporation
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Smart City Platform v2.4
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'fixed',
            height: 'calc(100vh - 64px)',
            top: '64px',
            left: 0,
            backgroundColor: theme.palette.secondary.main || '#8e8d90',
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
