import { ProfileCard } from './ProfileCard';
import { PerformanceHistChart } from './PerformanceHistChart';
import { GoalOverview } from './GoalOverview';

// Icons - 360 icon size matches Figma design (16px × 16px)
const Icon360 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
    <path d="M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"/>
  </svg>
);

// Performance Overview (Right Sidebar) Component
export function PerformanceOverview() {
  return (
    <div className="bg-white gradient-border rounded-[42px] w-[488px] p-3 h-full flex flex-col overflow-hidden" data-name="Selected-user-profile-from-table-360degrees-view-section" data-node-id="1:1245">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-600 mb-3 flex-shrink-0">
        <Icon360 />
        <span className="text-xs font-bold uppercase tracking-wide">Performance Overview</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2">
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
      </div>
    </div>
  );
}

export default PerformanceOverview;
