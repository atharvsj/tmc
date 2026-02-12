'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Chip,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { alpha } from '@mui/material/styles';

const Chatbot = ({ role, data }) => {
  const [open, setOpen] = useState(false);
  const storageKey = `smartcity_chat_${role || 'global'}`;

  const getInitialMessages = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch (e) {
      // ignore and fall back to default
    }

    return [
      {
        id: 1,
        text: `Hi! I'm your TMC Smart City Assistant. I can help you with questions about ${
          role === 'citizen'
            ? 'water supply, waste collection, and complaints'
            : role === 'employee'
            ? 'operations, tasks, contractors, and asset health'
            : 'strategic metrics, budget, and governance'
        }. Ask me anything!`,
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // persist messages per-role (or per-dashboard) in localStorage
  useEffect(() => {
    try {
      const serializable = messages.map((m) => ({ ...m, timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp }));
      localStorage.setItem(storageKey, JSON.stringify(serializable));
    } catch (e) {
      // ignore storage errors
    }
  }, [messages, storageKey]);

  // Generate responses based on role and data
  const generateResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (role === 'citizen') {
      // Citizen-specific responses
      if (msg.includes('water') || msg.includes('supply')) {
        const water = data?.water || {};
        return `Your water supply status: ${water.supply?.status || 'Active'}. Next supply at ${
          water.supply?.nextSupply || '05:00 PM'
        }. Average supply duration: ${water.supply?.avgHours || 4.5} hours. Water quality index: ${
          water.quality?.index || 87
        } (Grade ${water.quality?.grade || 'A'}).`;
      }
      if (msg.includes('waste') || msg.includes('garbage') || msg.includes('collection')) {
        const waste = data?.waste || {};
        return `Waste collection status: Last pickup was ${
          waste.collection?.lastPickup || 'Today 07:15 AM'
        }. Next pickup scheduled for ${
          waste.collection?.nextPickup || 'Tomorrow 07:00 AM'
        }. Ward cleanliness score: ${waste.cleanliness?.wardScore || 82}/100. Compliance: ${
          waste.segregation?.compliance || 78
        }%.`;
      }
      if (msg.includes('complaint') || msg.includes('issue')) {
        const complaints = data?.complaints || {};
        return `You have ${complaints.water?.total || 0} water complaints (${
          complaints.water?.resolved || 0
        } resolved, ${complaints.water?.pending || 0} pending). Waste complaints: ${
          complaints.waste?.total || 0
        } (${complaints.waste?.resolved || 0} resolved). Overall satisfaction: ${
          complaints.overall?.satisfaction || 84
        }%.`;
      }
      if (msg.includes('billing') || msg.includes('bill') || msg.includes('payment')) {
        const billing = data?.water?.billing || {};
        return `Your current water bill is ₹${billing.currentBill || 485}. Due date: ${
          billing.dueDate || '15 Feb 2026'
        }. Last payment: ${billing.lastPayment || '15 Jan 2026'} (Status: ${
          billing.status || 'Paid'
        }).`;
      }
      return `I can help you with water supply details, waste collection info, complaints, and billing. What would you like to know?`;
    }

    if (role === 'employee') {
      // Employee-specific responses
      if (msg.includes('sla') || msg.includes('performance')) {
        const sla = data?.sla || {};
        return `Current SLA performance: Overall ${sla.overall || 94.2}% (Target: ${
          sla.target || 95
        }%). Water: ${sla.water || 95.8}%. Waste: ${sla.waste || 92.6}%. MTD breaches: ${
          sla.mtdBreaches || 23
        }. Trend: ${sla.trend || 'up'}.`;
      }
      if (msg.includes('task') || msg.includes('work')) {
        const water = data?.waterOps || {};
        const waste = data?.wasteOps || {};
        return `Water operations: ${water.tasks?.completed || 48} tasks completed, ${
          water.tasks?.inProgress || 12
        } in progress, ${water.tasks?.pending || 8} pending. Waste operations: ${
          waste.tasks?.completed || 52
        } completed, ${waste.tasks?.inProgress || 18} in progress, ${
          waste.tasks?.pending || 14
        } pending.`;
      }
      if (msg.includes('contractor') || msg.includes('vendor')) {
        const contractors = data?.contractors || {};
        const water = contractors.water?.[0] || {};
        const waste = contractors.waste?.[0] || {};
        return `Top water contractor: ${water.name || 'AquaTech Solutions'} (Score: ${
          water.score || 94
        }, SLA: ${water.sla || 96.2}%). Top waste contractor: ${waste.name || 'CleanCity Services'} (Score: ${
          waste.score || 88
        }, SLA: ${waste.sla || 90.5}%).`;
      }
      if (msg.includes('workforce') || msg.includes('team') || msg.includes('staff')) {
        const workforce = data?.workforce || {};
        const water = workforce.water || {};
        const waste = workforce.waste || {};
        return `Workforce status: Water team - ${water.total || 145} total, ${
          water.present || 138
        } present (${water.utilization || 89}% utilization). Waste team - ${waste.total || 320} total, ${
          waste.present || 298
        } present (${waste.utilization || 85}% utilization).`;
      }
      return `I can help with SLA metrics, task status, contractor performance, and workforce details. What do you need?`;
    }

    if (role === 'leadership') {
      // Leadership-specific responses
      if (msg.includes('water') && msg.includes('security')) {
        const water = data?.waterSecurity || {};
        return `Water security index: ${water.index || 90} (Grade ${water.grade || 'A'}). Supply: ${
          water.supply || 492
        } MLD, Demand: ${water.demand || 526} MLD, Deficit: ${water.deficit || 34} MLD. Storage level: ${
          water.storageLevel || 78
        }%. Reserve days: ${water.reserveDays || 3.2}.`;
      }
      if (msg.includes('waste') || msg.includes('diversion')) {
        const waste = data?.waste || {};
        return `Waste diversion rate: ${waste.rate || 40}% (Target: ${waste.target || 50}%). Processed: ${
          waste.processed || 1218
        } TPD. Landfill: ${waste.landfill || 626} TPD. Recycled: ${waste.recycled || 312} TPD. Composted: ${
          waste.composted || 280
        } TPD.`;
      }
      if (msg.includes('budget') || msg.includes('finance')) {
        const governance = data?.audit || {};
        return `Budget allocated: ₹${governance.budget || 885} Cr. Utilized: ₹${
          governance.utilized || 692
        } Cr (${governance.utilizationRate || 78}%). Water budget: ₹${governance.waterBudget || 320} Cr. Waste budget: ₹${
          governance.wasteBudget || 215
        } Cr.`;
      }
      if (msg.includes('nrw') || msg.includes('non-revenue')) {
        const nrw = data?.nrw || {};
        return `NRW (Non-Revenue Water): Current ${nrw.current || 24.1}% (Target: ${
          nrw.target || 20
        }%). Reduction achieved: ${nrw.reduction || 7.9}%. YTD savings: ₹${
          nrw.ytdSavings || 14.9
        } Cr. Recovery zones: ${nrw.recoveryZones?.join(', ') || 'Zone B, D, E'}.`;
      }
      if (msg.includes('equity') || msg.includes('governance')) {
        const equity = data?.equity || {};
        return `Equity index: ${equity.index || 74} (Target: ${equity.target || 85}%). Lowest ward: ${
          equity.lowestWard || 'Mumbra'
        } (${equity.lowestScore || 62}). Highest ward: ${equity.highestWard || 'Hiranandani'} (${
          equity.highestScore || 92
        }). Trend: ${equity.trend || 'up'}.`;
      }
      return `I can help with water security, waste diversion, budget, NRW, and equity metrics. Ask away!`;
    }

    // Fallback
    return `I'm not sure about that. Try asking about specific dashboard metrics or operations relevant to your role.`;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Tooltip title="TMC Smart City Assistant">
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <SmartToyIcon sx={{ color: 'white' }} />
        </Fab>
      </Tooltip>

      {/* Chat Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon />
            <Typography variant="h6">Smart City Assistant</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ height: 500, display: 'flex', flexDirection: 'column', p: 0 }}>
          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              bgcolor: alpha('#fff', 0.5),
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                  alignItems: 'flex-end',
                  gap: 1,
                }}
              >
                {msg.sender === 'bot' && (
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                    wordBreak: 'break-word',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Paper>
              </Box>
            ))}

            {isLoading && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: 'pulse 1.4s infinite',
                        animationDelay: `${i * 0.2}s`,
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 0.3 },
                          '50%': { opacity: 1 },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Divider />

          {/* Input Area */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              multiline
              maxRows={3}
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Tooltip title="Send">
              <span>
                <IconButton
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
