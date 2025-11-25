import { IoCheckmarkCircle, IoAlertCircle, IoTimeOutline } from 'react-icons/io5';

interface CycleOverviewProps {
  cycleName: string;
  cycleStatus: 'planning' | 'active' | 'completed';
  totalGoals: number;
  approvedGoals: number;
  pendingReviews: number;
  departments: string[];
}

export function CycleOverview({
  cycleName,
  cycleStatus,
  totalGoals,
  approvedGoals,
  pendingReviews,
  departments,
}: CycleOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'planning':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const completionRate = totalGoals > 0 ? Math.round((approvedGoals / totalGoals) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Cycle Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-gray-900">{cycleName}</h3>
            <p className="text-xs text-gray-600 mt-0.5">Performance Cycle</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(cycleStatus)}`}>
            {cycleStatus === 'planning' ? 'Planning' : cycleStatus === 'active' ? 'Active' : 'Completed'}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Total Goals */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 font-semibold uppercase">Total Goals</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalGoals}</p>
        </div>

        {/* Approved Goals */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 font-semibold uppercase">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{approvedGoals}</p>
        </div>

        {/* Completion Rate */}
        <div className="col-span-2 bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600 font-semibold uppercase">Completion</p>
            <p className="text-lg font-bold text-purple-600">{completionRate}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="col-span-2 bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <IoAlertCircle className={`w-4 h-4 ${pendingReviews > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600 font-semibold uppercase">Pending Reviews</p>
            <p className="ml-auto text-lg font-bold text-orange-600">{pendingReviews}</p>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Departments</p>
        <div className="flex flex-wrap gap-1">
          {departments.slice(0, 4).map(dept => (
            <span
              key={dept}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
            >
              {dept}
            </span>
          ))}
          {departments.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              +{departments.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
        <div className="flex items-center gap-2">
          <IoCheckmarkCircle className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-700">
            <span className="font-semibold">{approvedGoals}</span> goals approved
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IoAlertCircle className="w-4 h-4 text-orange-600" />
          <span className="text-xs text-gray-700">
            <span className="font-semibold">{pendingReviews}</span> awaiting review
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IoTimeOutline className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-gray-700">
            <span className="font-semibold">{totalGoals - approvedGoals - pendingReviews}</span> in progress
          </span>
        </div>
      </div>
    </div>
  );
}

export default CycleOverview;
