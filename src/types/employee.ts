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

export interface FormData {
  employeeName?: string;
  department?: string;
  position?: string;
  performanceObjectives?: string;
  keyResponsibilities?: string;
  skillGaps?: string;
  developmentPlan?: string;
  managerExpectations?: string;
  resources?: string;
  objectivesAchievement?: string;
  performanceRating?: string;
  accomplishments?: string;
  challenges?: string;
  employeeComment?: string;
  managerFeedback?: string;
  recommendedRating?: string;
  nextQuarterPriorities?: string;
  submittedBy?: string;
  submittedDate?: string;
  reviewedBy?: string;
  submittedByRole?: string;
}

export interface PerformanceCycle {
  id: string;
  name: string;
  quarter: string;
  year: number;
  department: string;
  startDate: string;
  endDate: string;
  startQuarterForm?: FormData;
  endQuarterForm?: FormData;
  status: 'Completed' | 'In Progress';
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
  grade: number;
  status: string;
  performanceHistory: PerformanceQuarter[];
  goals: GoalMetric[];
  threads: Thread[];
  cycles?: PerformanceCycle[];
}

export interface EmployeeData {
  employees: Employee[];
}
