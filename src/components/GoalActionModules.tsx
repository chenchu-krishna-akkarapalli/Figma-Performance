import { useLocation } from 'react-router-dom';
import { MyPerformanceBreadcrumb } from './MyPerformanceBreadcrumb';
import { LeftSidebar } from './LeftSidebar';
import { useEmployee } from '../context/EmployeeContext';
import { PerformanceTable } from './PerformanceTable';
import { PerformanceOverview } from './PerformanceOverview';
import { CycleManager } from './CycleManager';
import { CycleOverview } from './CycleOverview';

interface CycleGoal {
  id: string;
  departmentId: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  criteria: string[];
  reviews: unknown[];
  employeeComments: unknown[];
}

interface CycleData {
  id: string;
  name: string;
  year: number;
  quarter: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  createdBy: string;
  departments: string[];
  goals: CycleGoal[];
}

// Goal Action Modules Content Component - Handles all goal-related actions
function GoalActionModulesContent() {
  const location = useLocation();
  const { selectedCycleId } = useEmployee();
  
  // Derive activeModule directly from pathname (synchronous, no useEffect delay)
  const getActiveModuleFromPath = (): 'performance' | 'init_cycle' | 'create_goal' | 'goal_review' | 'employee_comments' => {
    const path = location.pathname;
    switch (path) {
      case '/my-performance/init-goal':
        return 'init_cycle';
      case '/my-performance/create-goal':
        return 'create_goal';
      case '/my-performance/goal-review':
        return 'goal_review';
      case '/my-performance/employee-comments':
        return 'employee_comments';
      default:
        return 'performance';
    }
  };
  
  const activeModule = getActiveModuleFromPath();
  
  // Mock cycleData for overview
  const mockCycleData: CycleData = {
    id: selectedCycleId || 'CYCLE-2024-Q1',
    name: '2024 Q1 Cycle',
    year: 2024,
    quarter: 'Q1',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    createdAt: '2023-12-15',
    createdBy: 'HR-Admin',
    departments: ['HR', 'Finance', 'Sales', 'IT', 'Marketing', 'Operations'],
    goals: [],
  };

  const cycleOverviewProps = {
    cycleName: mockCycleData.name || 'Current Cycle',
    cycleStatus: (mockCycleData.status || 'planning') as 'planning' | 'active' | 'completed',
    totalGoals: mockCycleData.goals?.length || 0,
    approvedGoals: mockCycleData.goals?.filter((g: CycleGoal) => g.status === 'approved').length || 0,
    pendingReviews: mockCycleData.goals?.filter((g: CycleGoal) => g.status === 'under_review').length || 0,
    departments: mockCycleData.departments || [],
  };

  return (
    <div 
      className="flex-1  flex flex-col items-center overflow-hidden" 
      data-name="Goal Action Modules" 
      data-node-id="1:734"
    >
      {/* Main Content Container - Centered */}
      <div 
        className="relative flex-1 w-full" 
      >
        {/* Breadcrumb */}
        <div className="py-3">
          <MyPerformanceBreadcrumb />
        </div>

        {/* Main Content - Flex layout with 10px gaps */}
        <div className="flex gap-2.5 px-6 justify-center" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Left Sidebar - 214px (from LeftSidebar design) */}
          <LeftSidebar />

          {/* Center Content - 670px width */}
          <div 
            className="bg-white gradient-border rounded-[42px] overflow-y-auto flex flex-col p-6 scrollbar-hide"
            style={{ width: '670px' }}
          >
            {/* Dynamic Center Content based on activeModule */}
            {activeModule === 'performance' ? (
              <PerformanceTable />
            ) : (
              <CycleManager />
            )}
          </div>

          {/* Right Sidebar - 488px width */}
          <div 
            className="bg-white gradient-border rounded-[42px] overflow-y-auto flex flex-col p-4 scrollbar-hide"
            style={{ width: '488px' }}
          >
            {/* Dynamic Right Content based on activeModule */}
            {activeModule === 'performance' ? (
              <PerformanceOverview />
            ) : (
              <CycleOverview {...cycleOverviewProps} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Goal Action Modules Component - No Provider wrapper, uses parent provider
export function GoalActionModules() {
  return <GoalActionModulesContent />;
}

export default GoalActionModules;
