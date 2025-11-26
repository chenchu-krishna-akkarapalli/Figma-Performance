import { useLocation } from 'react-router-dom';
import { MyPerformanceBreadcrumb } from './MyPerformanceBreadcrumb';
import { LeftSidebar } from './LeftSidebar';
import { useEmployee } from '../context/EmployeeContext';
import { PerformanceTable } from './PerformanceTable';
import { PerformanceOverview } from './PerformanceOverview';
import { CycleManager } from './CycleManager';
import { CycleOverview } from './CycleOverview';

// Goal Action Modules Content Component - Handles all goal-related actions
function GoalActionModulesContent() {
  const location = useLocation();
  const { } = useEmployee();
  
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
              <CycleOverview />
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
