import { MyPerformanceBreadcrumb } from './MyPerformanceBreadcrumb';
import { LeftSidebar } from './LeftSidebar';
import { PerformanceTable } from './PerformanceTable';
import { PerformanceOverview } from './PerformanceOverview';
import { EmployeeProvider } from '../context/EmployeeContext';

// Main My Performance Page Component
export function MyPerformance() {
  return (
    <EmployeeProvider>
      <div 
        className="flex-1 bg-[#EDEFF1] flex flex-col items-center overflow-hidden" 
        data-name="My performance" 
        data-node-id="1:734"
      >
        {/* Main Content Container - Centered */}
        <div 
          className="relative flex-1" 
          // style={{ width: '1419px', minHeight: '1085px' }}
        >
          {/* Breadcrumb */}
          <div className="py-3">
            <MyPerformanceBreadcrumb />
          </div>

          {/* Main Content - Flex layout with 10px gaps */}
          <div className="flex gap-[10px]" style={{ height: 'calc(100vh - 140px)' }}>
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Center Table */}
            <PerformanceTable />

            {/* Right Sidebar - Performance Overview */}
            <PerformanceOverview />
          </div>
        </div>
      </div>
    </EmployeeProvider>
  );
}

export default MyPerformance;
