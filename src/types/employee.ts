// Employee Profile Types

export interface PerformanceQuarter {
  quarter: string;
  achievement: number;
}

export interface GoalMetric {
  id: string;
  title: string;
  description?: string;
  metrics?: string[];
  progress: number;
  expanded: boolean;
}

export interface Thread {
  role: string;
  message: string;
  timestamp: string;
}

export interface Employee {
  id: string;
  rank: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  dateOfJoining: string;
  salary: number;
  contact: string;
  email: string;
  kpiAchievement: number;
  lmsCompletion: number;
  alertsIssues: string;
  status: string;
  performanceHistory: PerformanceQuarter[];
  goals: GoalMetric[];
  threads: Thread[];
}

export interface EmployeeData {
  employees: Employee[];
}
