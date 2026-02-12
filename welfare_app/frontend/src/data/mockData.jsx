// Mock Data Service for Smart City Governance Platform
// Static deterministic data for Thane Municipal Corporation - Water & Waste Management

// Ward names for Thane
export const wards = [
  'Naupada', 'Kopri', 'Wagle Estate', 'Vartak Nagar', 'Majiwada',
  'Manpada', 'Kasarvadavali', 'Kolshet', 'Balkum', 'Kalwa',
  'Mumbra', 'Diva', 'Uthalsar', 'Lokmanya Nagar', 'Hiranandani'
];

export const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

// Citizen Dashboard Data - Water & Waste focused
export const getCitizenData = () => {
  return {
    // WATER MANAGEMENT
    water: {
      supply: {
        status: 'Active',
        statusColor: 'success',
        nextSupply: '05:00 PM',
        avgHours: 4.5,
        trend: 'up',
        pressure: 3.2,
        todaySupplied: true,
        scheduledSlots: ['06:00 AM - 08:30 AM', '05:00 PM - 07:30 PM'],
      },
      quality: {
        index: 87,
        ph: 7.2,
        chlorine: 0.48,
        turbidity: 1.3,
        tds: 245,
        status: 'Safe',
        grade: 'A',
        lastTested: '2 hours ago',
        nextTest: 'Tomorrow 10:00 AM',
      },
      usage: {
        daily: 185,
        wardAvg: 165,
        monthly: 5420,
        lastMonth: 5180,
        trend: 'up',
        unit: 'Liters',
      },
      billing: {
        currentBill: 485,
        dueDate: '15 Feb 2026',
        lastPayment: '15 Jan 2026',
        status: 'Paid',
      },
    },
    // WASTE MANAGEMENT
    waste: {
      cleanliness: {
        wardScore: 82,
        cityAvg: 75,
        rank: 4,
        totalWards: 15,
        trend: 'up',
      },
      collection: {
        lastPickup: 'Today 07:15 AM',
        nextPickup: 'Tomorrow 07:00 AM',
        missedPickups: 1,
        mtdPickups: 28,
        scheduledDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dryWaste: 'Wednesday',
        wetWaste: 'Daily',
      },
      segregation: {
        compliance: 78,
        lastWeek: 72,
        trend: 'up',
        status: 'Good',
      },
      bins: {
        nearest: '50m - Near Community Hall',
        status: 'Available',
        lastEmptied: '6 hours ago',
      },
    },
    // COMPLAINTS
    complaints: {
      water: {
        total: 2,
        resolved: 1,
        pending: 1,
        inProgress: 0,
        avgResolutionDays: 2.3,
      },
      waste: {
        total: 3,
        resolved: 2,
        pending: 0,
        inProgress: 1,
        avgResolutionDays: 1.8,
      },
      overall: {
        satisfaction: 84,
        lastFeedback: '4 stars',
        responseTime: '4 hours avg',
      },
    },
    // TIMELINE DATA
    waterTimeline: [
      { time: '06:00 AM', status: 'completed', duration: '2h 30m', quality: 'Good' },
      { time: '08:30 AM', status: 'completed', duration: '-', quality: '-' },
      { time: '05:00 PM', status: 'scheduled', duration: '2h 30m', quality: '-' },
      { time: '07:30 PM', status: 'scheduled', duration: '-', quality: '-' },
    ],
    wasteTimeline: [
      { date: 'Mon', type: 'Wet', status: 'completed', time: '07:15 AM' },
      { date: 'Tue', type: 'Wet', status: 'completed', time: '07:20 AM' },
      { date: 'Wed', type: 'Dry + Wet', status: 'completed', time: '07:10 AM' },
      { date: 'Thu', type: 'Wet', status: 'scheduled', time: '07:00 AM' },
      { date: 'Fri', type: 'Wet', status: 'scheduled', time: '07:00 AM' },
      { date: 'Sat', type: 'Dry + Wet', status: 'scheduled', time: '07:00 AM' },
    ],
    // AI INSIGHTS
    aiInsights: [
      {
        type: 'success',
        category: 'water',
        message: 'Water supply on time for last 5 consecutive days',
        icon: 'check',
        timestamp: '10 mins ago',
      },
      {
        type: 'info',
        category: 'water',
        message: 'Water quality index improved by 3 points this week',
        icon: 'info',
        timestamp: '1 hour ago',
      },
      {
        type: 'warning',
        category: 'waste',
        message: 'Garbage pickup may be delayed tomorrow due to vehicle maintenance',
        icon: 'warning',
        timestamp: '2 hours ago',
      },
      {
        type: 'success',
        category: 'waste',
        message: 'Your ward cleanliness score is above city average',
        icon: 'check',
        timestamp: '3 hours ago',
      },
      {
        type: 'success',
        category: 'complaint',
        message: 'Your complaint #WTR-2024-1234 resolved within SLA',
        icon: 'check',
        timestamp: '1 day ago',
      },
    ],
  };
};

// Employee Dashboard Data - Water & Waste Operations
export const getEmployeeData = () => {
  return {
    // OVERALL SLA
    sla: {
      overall: 94.2,
      water: 95.8,
      waste: 92.6,
      target: 95,
      trend: 'up',
      breaches: 5,
      mtdBreaches: 23,
    },
    // WATER OPERATIONS
    waterOps: {
      tasks: {
        completed: 48,
        inProgress: 12,
        pending: 8,
        total: 68,
        criticalPending: 2,
      },
      maintenance: {
        scheduled: 15,
        completed: 12,
        overdue: 1,
      },
      supply: {
        zonesActive: 4,
        zonesTotal: 5,
        pumpingStations: 8,
        operational: 7,
        underMaintenance: 1,
      },
      leakages: {
        reported: 12,
        fixed: 9,
        pending: 3,
        avgRepairTime: '4.2 hours',
      },
      quality: {
        testsToday: 24,
        passed: 23,
        failed: 1,
        retestPending: 1,
      },
    },
    // WASTE OPERATIONS
    wasteOps: {
      tasks: {
        completed: 52,
        inProgress: 18,
        pending: 14,
        total: 84,
        criticalPending: 3,
      },
      collection: {
        vehiclesDeployed: 45,
        vehiclesTotal: 52,
        tripsCompleted: 128,
        tripsPlanned: 156,
        coverage: 82,
      },
      processing: {
        received: 1245,
        processed: 1180,
        diverted: 485,
        toLandfill: 695,
        unit: 'TPD',
      },
      bins: {
        total: 2450,
        operational: 2380,
        damaged: 70,
        overflowing: 12,
      },
    },
    // WORKFORCE
    workforce: {
      water: {
        total: 145,
        present: 138,
        onLeave: 7,
        utilization: 89,
      },
      waste: {
        total: 320,
        present: 298,
        onLeave: 22,
        utilization: 85,
      },
      overall: {
        overtimeHours: 245,
        avgProductivity: 87,
        trainingPending: 12,
      },
    },
    // SAFETY
    safety: {
      incidents: 1,
      nearMisses: 3,
      daysWithoutIncident: 28,
      safetyScore: 94,
      trend: 'stable',
      lastIncident: 'Minor slip - Zone C - 28 days ago',
    },
    // CONTRACTORS
    contractors: {
      water: [
        { name: 'AquaTech Solutions', score: 94, sla: 96.2, status: 'good', tasks: 45, pending: 3 },
        { name: 'HydroMaint Pvt', score: 89, sla: 91.5, status: 'warning', tasks: 32, pending: 5 },
        { name: 'ClearWater Services', score: 92, sla: 94.8, status: 'good', tasks: 28, pending: 2 },
      ],
      waste: [
        { name: 'CleanCity Services', score: 88, sla: 90.5, status: 'warning', tasks: 68, pending: 8 },
        { name: 'GreenWaste Mgmt', score: 93, sla: 95.2, status: 'good', tasks: 54, pending: 4 },
        { name: 'UrbanMaint Corp', score: 85, sla: 88.3, status: 'critical', tasks: 42, pending: 10 },
      ],
    },
    // TASK KANBAN
    kanbanTasks: {
      water: {
        pending: [
          { id: 'WTR-1234', title: 'Pipeline repair - Main Line', priority: 'high', ward: 'Kopri', assignee: 'Team Alpha', estimatedTime: '4h', age: '2h' },
          { id: 'WTR-1235', title: 'Valve replacement - Junction 45', priority: 'medium', ward: 'Wagle Estate', assignee: 'Team Beta', estimatedTime: '2h', age: '5h' },
          { id: 'WTR-1236', title: 'Meter calibration - Block C', priority: 'low', ward: 'Vartak Nagar', assignee: 'Team Gamma', estimatedTime: '3h', age: '1d' },
        ],
        inProgress: [
          { id: 'WTR-1230', title: 'Pump maintenance - Station 3', priority: 'high', ward: 'Naupada', assignee: 'Team Alpha', progress: 75, startTime: '08:00 AM' },
          { id: 'WTR-1231', title: 'Leakage fix - Sector 12', priority: 'medium', ward: 'Majiwada', assignee: 'Team Delta', progress: 45, startTime: '09:30 AM' },
        ],
        completed: [
          { id: 'WTR-1225', title: 'Emergency valve repair', ward: 'Kalwa', completedAt: '11:30 AM', duration: '2h 15m' },
          { id: 'WTR-1226', title: 'Water quality test - Zone B', ward: 'Mumbra', completedAt: '10:45 AM', duration: '1h 30m' },
          { id: 'WTR-1227', title: 'Pipe fitting replacement', ward: 'Hiranandani', completedAt: '09:00 AM', duration: '3h 00m' },
        ],
      },
      waste: {
        pending: [
          { id: 'WST-2234', title: 'Bin replacement - Market area', priority: 'high', ward: 'Mumbra', assignee: 'Crew 5', estimatedTime: '2h', age: '3h' },
          { id: 'WST-2235', title: 'Vehicle repair - Truck 12', priority: 'high', ward: 'Depot', assignee: 'Maintenance', estimatedTime: '4h', age: '6h' },
          { id: 'WST-2236', title: 'Route optimization - Zone D', priority: 'medium', ward: 'Multiple', assignee: 'Planning', estimatedTime: '2h', age: '1d' },
        ],
        inProgress: [
          { id: 'WST-2230', title: 'Street cleaning - Main Road', priority: 'medium', ward: 'Naupada', assignee: 'Crew 2', progress: 60, startTime: '06:00 AM' },
          { id: 'WST-2231', title: 'Debris clearance - Construction site', priority: 'high', ward: 'Manpada', assignee: 'Crew 8', progress: 30, startTime: '10:00 AM' },
        ],
        completed: [
          { id: 'WST-2225', title: 'Morning collection - Zone A', ward: 'Multiple', completedAt: '09:00 AM', coverage: '100%' },
          { id: 'WST-2226', title: 'Compactor servicing', ward: 'Depot', completedAt: '08:30 AM', duration: '2h 00m' },
          { id: 'WST-2227', title: 'Bin sanitization drive', ward: 'Lokmanya Nagar', completedAt: '07:45 AM', bins: 85 },
        ],
      },
    },
    // ASSET HEALTH
    assetHealth: {
      water: [
        { asset: 'Pumping Stations', health: 92, status: 'good', items: 8, critical: 0, nextMaintenance: '5 days' },
        { asset: 'Pipeline Network', health: 78, status: 'warning', items: 245, critical: 3, nextMaintenance: '2 days' },
        { asset: 'Water Tanks', health: 88, status: 'good', items: 12, critical: 0, nextMaintenance: '12 days' },
        { asset: 'Treatment Plants', health: 94, status: 'good', items: 3, critical: 0, nextMaintenance: '18 days' },
        { asset: 'Meters & Valves', health: 85, status: 'good', items: 15420, critical: 12, nextMaintenance: '8 days' },
      ],
      waste: [
        { asset: 'Collection Vehicles', health: 82, status: 'warning', items: 52, critical: 2, nextMaintenance: '3 days' },
        { asset: 'Compactors', health: 88, status: 'good', items: 18, critical: 0, nextMaintenance: '10 days' },
        { asset: 'Transfer Stations', health: 91, status: 'good', items: 4, critical: 0, nextMaintenance: '15 days' },
        { asset: 'Processing Plant', health: 86, status: 'good', items: 2, critical: 0, nextMaintenance: '7 days' },
        { asset: 'Bins & Containers', health: 89, status: 'good', items: 2450, critical: 70, nextMaintenance: 'Ongoing' },
      ],
    },
    // AI INSIGHTS
    aiInsights: [
      {
        type: 'warning',
        category: 'water',
        message: 'Crew overload detected in Ward 14 (Lokmanya Nagar) - Consider reallocation',
        severity: 'medium',
        action: 'Review workforce allocation',
        timestamp: '15 mins ago',
      },
      {
        type: 'error',
        category: 'water',
        message: 'Pipeline failure risk rising in Zone C - 78% probability in next 48 hours',
        severity: 'high',
        action: 'Schedule preventive maintenance',
        timestamp: '30 mins ago',
      },
      {
        type: 'warning',
        category: 'waste',
        message: 'Contractor UrbanMaint Corp SLA dropped to 88.3% - Below threshold',
        severity: 'medium',
        action: 'Issue performance notice',
        timestamp: '1 hour ago',
      },
      {
        type: 'info',
        category: 'waste',
        message: 'Route optimization can save 12% fuel in Zone D - Review suggested routes',
        severity: 'low',
        action: 'View optimization report',
        timestamp: '2 hours ago',
      },
      {
        type: 'success',
        category: 'water',
        message: 'All water quality tests passed in Zone A and B today',
        severity: 'info',
        action: 'View test results',
        timestamp: '3 hours ago',
      },
    ],
    // PERFORMANCE TRENDS
    slaHistory: [
      { day: 'Mon', water: 96.2, waste: 91.5, target: 95 },
      { day: 'Tue', water: 95.8, waste: 93.2, target: 95 },
      { day: 'Wed', water: 94.5, waste: 92.8, target: 95 },
      { day: 'Thu', water: 96.0, waste: 91.8, target: 95 },
      { day: 'Fri', water: 95.2, waste: 94.5, target: 95 },
      { day: 'Sat', water: 97.1, waste: 93.0, target: 95 },
      { day: 'Sun', water: 95.8, waste: 92.6, target: 95 },
    ],
  };
};
// Sample data structure for CitizenDashboard component
// Use this as a reference to structure your actual data

export const sampleDashboardData = {
  water: {
    supply: {
      duration: '4 hrs',
      pressure: 'Good',
      scheduledSlots: ['6:00 AM - 10:00 AM', '6:00 PM - 8:00 PM'],
    },
    quality: {
      index: 85,
      grade: 'A',
      ph: 7.2,
      chlorine: 0.5,
      turbidity: 0.8,
      tds: 150,
      lastTested: 'Feb 3, 2026',
      nextTest: 'Feb 10, 2026',
      trend: 'up',
    },
    billing: {
      currentBill: 450,
      status: 'Paid',
      dueDate: 'Feb 15, 2026',
      lastPayment: 'Jan 10, 2026',
    },
    usage: {
      daily: 150,
      wardAvg: 180,
      monthly: 4500,
      lastMonth: 4200,
    },
  },
  waste: {
    cleanliness: {
      score: 88,
      rank: 3,
      totalWards: 25,
      trend: 'up',
    },
    segregation: {
      rate: 85,
      trend: 'up',
      status: 'Excellent',
      compliance: 85,
      lastWeek: 82,
    },
    collection: {
      lastPickup: 'Feb 3, 2026',
      nextPickup: 'Feb 5, 2026',
      schedule: ['Mon', 'Wed', 'Fri'], // This is the array that was missing!
      wetWaste: 'Mon, Wed, Fri',
      dryWaste: 'Tue, Thu, Sat',
    },
    bins: {
      nearest: 'MG Road Junction (500m)',
      status: 'Good',
      lastEmptied: 'Feb 3, 2026 - 2:00 PM',
    },
  },
  complaints: {
    water: {
      resolved: 25,
      inProgress: 3,
      pending: 2,
      avgResolutionDays: 4.5,
    },
    waste: {
      resolved: 18,
      inProgress: 2,
      pending: 1,
      avgResolutionDays: 3.2,
    },
  },
  waterTimeline: [
    {
      time: '6:00 AM - 10:00 AM',
      duration: '4 hrs',
      status: 'completed',
    },
    {
      time: '6:00 PM - 8:00 PM',
      duration: '2 hrs',
      status: 'scheduled',
    },
  ],
  wasteTimeline: [
    {
      date: 'Feb 3 (Mon)',
      type: 'Wet Waste',
      time: '7:00 AM - 9:00 AM',
      status: 'completed',
    },
    {
      date: 'Feb 4 (Tue)',
      type: 'Dry Waste',
      time: '7:00 AM - 9:00 AM',
      status: 'completed',
    },
    {
      date: 'Feb 5 (Wed)',
      type: 'Wet Waste',
      time: '7:00 AM - 9:00 AM',
      status: 'scheduled',
    },
    {
      date: 'Feb 6 (Thu)',
      type: 'Dry Waste',
      time: '7:00 AM - 9:00 AM',
      status: 'scheduled',
    },
  ],
  aiInsights: [
    {
      category: 'water',
      type: 'success',
      message: 'Your water consumption is 16% lower than the ward average. Great job!',
      timestamp: '2 hours ago',
    },
    {
      category: 'water',
      type: 'warning',
      message: 'Water quality test is due in 6 days. Ensure regular monitoring.',
      timestamp: '1 day ago',
    },
    {
      category: 'waste',
      type: 'success',
      message: 'Your segregation compliance improved by 3% this week!',
      timestamp: '3 hours ago',
    },
    {
      category: 'waste',
      type: 'info',
      message: 'Next waste collection scheduled for Feb 5 at 7:00 AM',
      timestamp: '1 day ago',
    },
    {
      category: 'complaint',
      type: 'success',
      message: 'Your recent water complaint was resolved in 3 days - faster than average!',
      timestamp: '2 days ago',
    },
    {
      category: 'complaint',
      type: 'info',
      message: 'You have 2 complaints pending review by the department.',
      timestamp: '5 hours ago',
    },
  ],
  // Optional: Chart data - if not provided, component will generate random data on each refresh
  chartData: {
    waterUsage: [
      { month: 'Jan', usage: 4200, average: 4500 },
      { month: 'Feb', usage: 4100, average: 4500 },
      { month: 'Mar', usage: 4400, average: 4500 },
      { month: 'Apr', usage: 4600, average: 4500 },
      { month: 'May', usage: 4800, average: 4500 },
      { month: 'Jun', usage: 4500, average: 4500 },
    ],
    waterQualityTrend: [
      { date: 'Week 1', ph: 7.2, chlorine: 0.5, turbidity: 0.8 },
      { date: 'Week 2', ph: 7.3, chlorine: 0.6, turbidity: 0.7 },
      { date: 'Week 3', ph: 7.1, chlorine: 0.5, turbidity: 0.9 },
      { date: 'Week 4', ph: 7.2, chlorine: 0.4, turbidity: 0.8 },
    ],
    wasteCollection: [
      { type: 'Wet Waste', weight: 450 },
      { type: 'Dry Waste', weight: 280 },
      { type: 'Recyclable', weight: 150 },
      { type: 'E-Waste', weight: 20 },
    ],
    segregationTrend: [
      { week: 'W1', compliance: 70 },
      { week: 'W2', compliance: 75 },
      { week: 'W3', compliance: 78 },
      { week: 'W4', compliance: 82 },
      { week: 'W5', compliance: 85 },
      { week: 'W6', compliance: 83 },
    ],
    complaintTrend: [
      { month: 'Jan', water: 12, waste: 8, total: 20 },
      { month: 'Feb', water: 10, waste: 6, total: 16 },
      { month: 'Mar', water: 8, waste: 5, total: 13 },
      { month: 'Apr', water: 15, waste: 10, total: 25 },
      { month: 'May', water: 9, waste: 7, total: 16 },
      { month: 'Jun', water: 6, waste: 4, total: 10 },
    ],
  },
};


// Leadership Dashboard Data - Strategic Water & Waste
export const getLeadershipData = () => {
  const data = {
    // WATER STRATEGIC METRICS
    water: {
      security: {
        index: 90,
        grade: 'A',
        supply: 492,
        demand: 526,
        deficit: 34,
        unit: 'MLD',
        trend: 'up',
        storageLevel: 78,
        reserveDays: 3.2,
      },
      nrw: {
        current: 24.1,
        target: 20,
        baseline: 32,
        reduction: 7.9,
        ytdSavings: 14.9,
        unit: 'Cr',
        trend: 'down',
        recoveryZones: ['Zone B', 'Zone D', 'Zone E'],
      },
      quality: {
        compliance: 98.2,
        avgIndex: 86,
        testsPerDay: 145,
        failures: 2,
        trend: 'stable',
      },
      cost: {
        perML: 17500,
        target: 16000,
        trend: 'down',
        monthlyExpense: 28.5,
        unit: 'Cr',
      },
      infrastructure: {
        pipelineKm: 1245,
        newThisYear: 45,
        pumpingCapacity: 580,
        utilizationRate: 85,
      },
    },
    // WASTE STRATEGIC METRICS
    waste: {
      diversion: {
        rate: 40,
        target: 50,
        processed: 1218,
        landfill: 626,
        unit: 'TPD',
        trend: 'up',
        recycled: 312,
        composted: 280,
      },
      collection: {
        coverage: 94,
        efficiency: 88,
        vehicleUtilization: 85,
        routeOptimization: 78,
      },
      landfill: {
        currentLoad: 72,
        capacity: 100,
        remainingLife: 4.2,
        unit: 'Years',
        dailyAddition: 626,
        trend: 'warning',
      },
      cost: {
        perTonne: 2429,
        target: 2200,
        trend: 'stable',
        monthlyExpense: 12.4,
        unit: 'Cr',
        savings: 8.8,
      },
      segregation: {
        compliance: 72,
        target: 85,
        trend: 'up',
        topWards: ['Hiranandani', 'Vartak Nagar', 'Naupada'],
        bottomWards: ['Mumbra', 'Diva', 'Kalwa'],
      },
    },
    // GOVERNANCE METRICS
    governance: {
      equity: {
        index: 74,
        target: 85,
        gap: 18,
        lowestWard: 'Mumbra',
        lowestScore: 62,
        highestWard: 'Hiranandani',
        highestScore: 92,
        trend: 'up',
      },
      sentiment: {
        index: 75,
        positive: 58,
        neutral: 28,
        negative: 14,
        trend: 'up',
        topConcern: 'Water supply timing',
        improvement: 'Waste collection',
      },
      audit: {
        compliance: 90,
        score: 94,
        pendingActions: 8,
        criticalActions: 2,
        lastAudit: '15 Jan 2026',
        nextAudit: '15 Mar 2026',
        findings: 12,
        resolved: 10,
      },
      budget: {
        totalAllocated: 885,
        utilized: 692,
        utilizationRate: 78,
        waterBudget: 320,
        waterUtilized: 265,
        wasteBudget: 215,
        wasteUtilized: 178,
        unit: 'Cr',
      },
    },
    // WARD PERFORMANCE
    wardPerformance: [
      { name: 'Naupada', waterScore: 88, wasteScore: 85, equity: 86, complaints: 12, satisfaction: 82, trend: 'up' },
      { name: 'Kopri', waterScore: 82, wasteScore: 78, equity: 79, complaints: 18, satisfaction: 75, trend: 'stable' },
      { name: 'Wagle Estate', waterScore: 85, wasteScore: 82, equity: 83, complaints: 15, satisfaction: 78, trend: 'up' },
      { name: 'Vartak Nagar', waterScore: 90, wasteScore: 88, equity: 88, complaints: 8, satisfaction: 85, trend: 'up' },
      { name: 'Majiwada', waterScore: 84, wasteScore: 80, equity: 81, complaints: 14, satisfaction: 76, trend: 'stable' },
      { name: 'Manpada', waterScore: 86, wasteScore: 84, equity: 84, complaints: 10, satisfaction: 80, trend: 'up' },
      { name: 'Kasarvadavali', waterScore: 78, wasteScore: 72, equity: 74, complaints: 22, satisfaction: 68, trend: 'down' },
      { name: 'Kolshet', waterScore: 80, wasteScore: 76, equity: 77, complaints: 20, satisfaction: 72, trend: 'stable' },
      { name: 'Balkum', waterScore: 75, wasteScore: 70, equity: 71, complaints: 25, satisfaction: 65, trend: 'down' },
      { name: 'Kalwa', waterScore: 72, wasteScore: 68, equity: 68, complaints: 28, satisfaction: 62, trend: 'stable' },
      { name: 'Mumbra', waterScore: 65, wasteScore: 60, equity: 62, complaints: 35, satisfaction: 55, trend: 'down' },
      { name: 'Diva', waterScore: 68, wasteScore: 64, equity: 65, complaints: 32, satisfaction: 58, trend: 'stable' },
      { name: 'Uthalsar', waterScore: 83, wasteScore: 79, equity: 80, complaints: 16, satisfaction: 74, trend: 'up' },
      { name: 'Lokmanya Nagar', waterScore: 81, wasteScore: 77, equity: 78, complaints: 17, satisfaction: 73, trend: 'stable' },
      { name: 'Hiranandani', waterScore: 94, wasteScore: 92, equity: 92, complaints: 5, satisfaction: 90, trend: 'up' },
    ],
    // BUDGET DATA
    budgetData: {
      water: [
        { category: 'Supply Operations', allocated: 125, spent: 98, variance: -27 },
        { category: 'Infrastructure', allocated: 85, spent: 72, variance: -13 },
        { category: 'Maintenance', allocated: 55, spent: 48, variance: -7 },
        { category: 'NRW Reduction', allocated: 35, spent: 32, variance: -3 },
        { category: 'Quality Control', allocated: 20, spent: 15, variance: -5 },
      ],
      waste: [
        { category: 'Collection', allocated: 95, spent: 82, variance: -13 },
        { category: 'Processing', allocated: 55, spent: 48, variance: -7 },
        { category: 'Landfill Ops', allocated: 30, spent: 25, variance: -5 },
        { category: 'Equipment', allocated: 25, spent: 18, variance: -7 },
        { category: 'Awareness', allocated: 10, spent: 5, variance: -5 },
      ],
    },
    // TRENDS DATA
    nrwTrend: [
      { month: 'Jul', value: 28.5, target: 20 },
      { month: 'Aug', value: 27.8, target: 20 },
      { month: 'Sep', value: 27.2, target: 20 },
      { month: 'Oct', value: 26.5, target: 20 },
      { month: 'Nov', value: 25.8, target: 20 },
      { month: 'Dec', value: 25.1, target: 20 },
      { month: 'Jan', value: 24.1, target: 20 },
    ],
    // CONTRACTOR PERFORMANCE
    contractorRisk: [
      { metric: 'Performance', score: 88, target: 90 },
      { metric: 'Compliance', score: 92, target: 95 },
      { metric: 'Cost Control', score: 85, target: 90 },
      { metric: 'Safety', score: 90, target: 95 },
      { metric: 'Innovation', score: 78, target: 85 },
    ],
    // DECISION INTELLIGENCE
    decisionIntelligence: [
      {
        type: 'alert',
        category: 'water',
        title: 'Water Shortage Prediction',
        message: 'Kopri, Wagle Estate, Majiwada likely to face shortage in next 7 days based on demand patterns',
        impact: 'High - 45,000 households affected',
        action: 'Review supply allocation and activate reserve tanks',
        severity: 'high',
        confidence: 87,
      },
      {
        type: 'opportunity',
        category: 'water',
        title: 'NRW Recovery Zones',
        message: 'Top 5 zones identified for NRW recovery with potential savings of Rs 2.8 Cr annually',
        impact: 'Medium - 4.2% NRW reduction possible',
        action: 'Prioritize leak detection in Zone B, D, E',
        severity: 'medium',
        confidence: 92,
      },
      {
        type: 'forecast',
        category: 'waste',
        title: 'Landfill Capacity Alert',
        message: 'Expected landfill stress in 30 days if current trend continues. Diversion rate needs 8% increase.',
        impact: 'High - Operational disruption risk',
        action: 'Accelerate waste-to-energy and composting programs',
        severity: 'high',
        confidence: 85,
      },
      {
        type: 'policy',
        category: 'governance',
        title: 'Policy Impact Simulation',
        message: 'Proposed water tariff revision could improve NRW investment capacity by Rs 15 Cr annually',
        impact: 'Medium - Revenue enhancement',
        action: 'Review simulation report and schedule stakeholder meeting',
        severity: 'info',
        confidence: 78,
      },
      {
        type: 'alert',
        category: 'waste',
        title: 'Contractor Performance',
        message: 'UrbanMaint Corp showing declining trend - 3 consecutive months below SLA',
        impact: 'Medium - Service quality affected in 4 wards',
        action: 'Issue show cause notice and review contract terms',
        severity: 'medium',
        confidence: 95,
      },
      {
        type: 'opportunity',
        category: 'governance',
        title: 'Ward Equity Improvement',
        message: 'Targeted intervention in Mumbra, Diva can improve equity index by 8 points',
        impact: 'High - Social equity improvement',
        action: 'Allocate additional resources and fast-track pending projects',
        severity: 'medium',
        confidence: 82,
      },
    ],
  };



  
  // Flatten the structure for compatibility with LeadershipDashboard component
  return {
    waterSecurity: data.water.security,
    nrw: data.water.nrw,
    waste: data.waste.diversion,
    cost: data.water.cost,
    equity: data.governance.equity,
    sentiment: data.governance.sentiment,
    audit: data.governance.audit,
    decisionIntelligence: data.decisionIntelligence,
    nrwTrend: data.nrwTrend,
    budgetData: data.budgetData,
    wardPerformance: data.wardPerformance,
    contractorRisk: data.contractorRisk,
  };
};

// Utility functions
export const formatCurrency = (num) => {
  if (num >= 10000000) return '₹' + (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return '₹' + (num / 100000).toFixed(2) + ' L';
  if (num >= 1000) return '₹' + (num / 1000).toFixed(1) + 'K';
  return '₹' + num.toString();
};

export const formatNumber = (num) => {
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const getStatusColor = (value, thresholds) => {
  if (value >= thresholds.good) return 'success';
  if (value >= thresholds.warning) return 'warning';
  return 'error';
};

export const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return '↑';
    case 'down': return '↓';
    default: return '→';
  }
};

export const getTrendColor = (trend, inverse = false) => {
  if (inverse) {
    switch (trend) {
      case 'up': return 'error';
      case 'down': return 'success';
      default: return 'info';
    }
  }
  switch (trend) {
    case 'up': return 'success';
    case 'down': return 'error';
    default: return 'info';
  }
};
