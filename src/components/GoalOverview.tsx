import { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';

// Icons - sizes match Figma design (13px × 13px for chart, 17px × 17px for calendar, 21px × 21px for dropdown)
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]">
    <path d="M3 13h2v8H3v-8zm4-5h2v13H7V8zm4-5h2v18h-2V3zm4 8h2v10h-2V11zm4-3h2v13h-2V8z"/>
  </svg>
);

const CalendarSmallIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px] text-gray-500">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
  </svg>
);

const DropdownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[21px] h-[21px]">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

// Goal Overview Component
export function GoalOverview() {
  const { selectedEmployee, addThread } = useEmployee();
  const [threadInput, setThreadInput] = useState('');
  const [expandedGoals, setExpandedGoals] = useState<Record<string, boolean>>({});

  // Get the first expanded goal or the first goal
  const activeGoal = selectedEmployee?.goals.find(g => g.expanded) || selectedEmployee?.goals[0];

  const toggleGoalExpanded = (goalId: string) => {
    setExpandedGoals(prev => ({
      ...prev,
      [goalId]: !prev[goalId]
    }));
  };

  const isGoalExpanded = (goalId: string, defaultExpanded: boolean) => {
    return expandedGoals[goalId] ?? defaultExpanded;
  };

  const handleSendThread = () => {
    if (threadInput.trim() && selectedEmployee) {
      addThread(selectedEmployee.id, 'User thread:', threadInput.trim());
      setThreadInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendThread();
    }
  };

  if (!selectedEmployee) {
    return (
      <div className="bg-white gradient-border-sm rounded-[25px] p-4 overflow-y-auto scrollbar-hide w-[437px]" style={{ maxHeight: '700px' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ChartIcon />
            <span className="text-lg font-bold uppercase tracking-wider text-gray-900">Goal Overview</span>
          </div>
          <CalendarSmallIcon />
        </div>
        <div className="text-center text-gray-400 py-12 text-sm">
          Select an employee to view goals
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white gradient-border-sm rounded-[25px] p-4 overflow-y-auto scrollbar-hide w-[437px]" style={{ maxHeight: '700px' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChartIcon />
          <span className="text-lg font-bold uppercase tracking-wider text-gray-900">Goal Overview - {selectedEmployee.name}</span>
        </div>
        <CalendarSmallIcon />
      </div>

      {/* Goals Testimonials Section - 311px height */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-4 mb-3 w-[390px] mx-auto h-[311px] overflow-y-auto scrollbar-hide shadow-sm" data-name="360-Goals-testimonals">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-300 pb-3">
          <ChartIcon />
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Goals ({selectedEmployee.goals.length})</span>
        </div>
        
        <div className="space-y-2">
          {selectedEmployee.goals.map((goal, index) => {
            const expanded = isGoalExpanded(goal.id, goal.expanded);
            return (
              <div key={goal.id} className={index === 0 ? 'border-b border-gray-200 pb-2' : ''}>
                <div 
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
                  onClick={() => toggleGoalExpanded(goal.id)}
                >
                  <div className="flex items-center gap-2">
                    {expanded ? <DropdownIcon /> : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px] -rotate-90">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    )}
                    <span className="text-sm font-semibold text-gray-900">{goal.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600">{goal.progress}%</span>
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">{goal.id}</span>
                  </div>
                </div>
                
                {expanded && goal.description && (
                  <>
                    <div className="flex items-start gap-2 ml-6 mt-2">
                      <svg viewBox="0 0 24 24" fill="#666" className="w-[14px] h-[14px] -rotate-90 shrink-0 mt-0.5">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                      <p className="text-xs text-gray-700">{goal.description}</p>
                    </div>
                    {goal.metrics && goal.metrics.length > 0 && (
                      <ul className="ml-12 mt-2 text-xs text-gray-600 list-disc space-y-1">
                        {goal.metrics.map((metric, i) => (
                          <li key={i}>{metric}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Goal Progress & Threads Section - 400px height */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-4 w-[390px] mx-auto h-[400px] overflow-y-auto scrollbar-hide shadow-sm" data-name="360-selected-goal-thread-card">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-300 pb-3">
          <ChartIcon />
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Goal Progress & Threads</span>
        </div>

        {/* Goal Progress */}
        {activeGoal && (
          <div className="mb-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded">{activeGoal.id}</span>
                <span className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{activeGoal.title}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{activeGoal.progress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 border border-gray-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF] rounded-full transition-all duration-300"
                style={{ width: `${activeGoal.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Threads Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="border-b border-gray-300 pb-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Threads ({selectedEmployee.threads.length})
            </span>
          </div>
          
          <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-hide">
            {selectedEmployee.threads.length > 0 ? (
              selectedEmployee.threads.map((thread, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 border border-gray-700 rounded-full px-3 py-1 flex items-center"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-white mr-2">{thread.role}</span>
                  <span className="text-xs text-gray-100 truncate">{thread.message}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 text-center py-2">No threads yet</div>
            )}
          </div>
        </div>

        {/* Thread Input */}
        <div className="mt-3 bg-white border border-gray-300 rounded-full px-3 py-2 flex items-center justify-between gap-2 shadow-sm">
          <input
            type="text"
            value={threadInput}
            onChange={(e) => setThreadInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a thread...."
            className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-900"
          />
          <button 
            onClick={handleSendThread}
            disabled={!threadInput.trim()}
            className="bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF] text-white font-semibold rounded-full px-4 py-1 text-xs hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalOverview;
