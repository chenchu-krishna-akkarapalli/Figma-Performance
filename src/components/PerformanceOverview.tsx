import { useMemo } from 'react';
import { ProfileCard } from './ProfileCard';
import { PerformanceHistChart } from './PerformanceHistChart';
import { GoalOverview } from './GoalOverview';
import MyCycleTestimonialCard from './MyCycleTestimonialCard';
import { useEmployee } from '../context/EmployeeContext';

// Icons - 360 icon size matches Figma design (16px × 16px)
const Icon360 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"/>
  </svg>
);

// Performance Overview (Right Sidebar) Component
export function PerformanceOverview() {
  const { selectedEmployee, employees } = useEmployee();

  // Get current employee data with cycles
  const currentEmployee = useMemo(() => {
    if (!selectedEmployee || !employees) return null;
    return selectedEmployee;
  }, [selectedEmployee, employees]);

  // Get cycles sorted by date (newest first)
  const sortedCycles = useMemo(() => {
    if (!currentEmployee?.cycles || currentEmployee.cycles.length === 0) {
      return [];
    }
    return [...currentEmployee.cycles].sort((a: any, b: any) => {
      const aYear = a.year;
      const bYear = b.year;
      const quarterOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
      
      if (aYear !== bYear) {
        return bYear - aYear;
      }
      
      const aQuarterNum = quarterOrder[a.quarter as keyof typeof quarterOrder] || 0;
      const bQuarterNum = quarterOrder[b.quarter as keyof typeof quarterOrder] || 0;
      return bQuarterNum - aQuarterNum;
    });
  }, [currentEmployee]);

  return (
    <div className="bg-white gradient-border rounded-[42px] w-[488px] p-3 h-full flex flex-col overflow-hidden" data-name="Selected-user-profile-from-table-360degrees-view-section" data-node-id="1:1245">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-600 mb-3 shrink-0">
        <Icon360 />
        <span className="text-xs font-bold uppercase tracking-wide">Performance Overview</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {/* Profile Card - centered */}
        <div className="flex justify-center">
          <ProfileCard />
        </div>

        {/* Performance Hist Chart - centered */}
        <div className="flex justify-center">
          <PerformanceHistChart />
        </div>

        {/* Goal Overview Section - centered */}
        <div className="flex justify-center">
          <GoalOverview />
        </div>

        {/* Cycle Testimonial Cards Section */}
        {sortedCycles && sortedCycles.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 px-2">
              Performance Cycles
            </h3>
            <div className="space-y-4 px-2">
              {sortedCycles.map((cycle: any) => (
                <MyCycleTestimonialCard key={cycle.id} cycle={cycle} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!sortedCycles || sortedCycles.length === 0) && currentEmployee && (
          <div className="mt-6 pt-6 border-t border-gray-200 px-2">
            <p className="text-sm text-gray-500 text-center">No performance cycles recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerformanceOverview;
