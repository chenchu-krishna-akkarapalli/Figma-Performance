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
      <div className="bg-white gradient-border-sm rounded-[25px] p-3 overflow-y-auto w-[437px]" style={{ maxHeight: '700px' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ChartIcon />
            <span className="text-sm font-bold uppercase tracking-wide">Goal Overview</span>
          </div>
          <CalendarSmallIcon />
        </div>
        <div className="text-center text-gray-500 py-8">
          Select an employee to view goals
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white gradient-border-sm rounded-[25px] p-3 overflow-y-auto w-[437px]" style={{ maxHeight: '700px' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ChartIcon />
          <span className="text-sm font-bold uppercase tracking-wide">Goal Overview - {selectedEmployee.name}</span>
        </div>
        <CalendarSmallIcon />
      </div>

      {/* Goals Testimonials Section - 311px height */}
      <div className="bg-[#e8e8e8] border border-black rounded-[20px] p-3 mb-[5px] w-[390px] mx-auto h-[311px] overflow-y-auto" data-name="360-Goals-testimonals">
        <div className="flex items-center gap-2 mb-2 border-b border-gray-400 pb-2">
          <ChartIcon />
          <span className="text-xs font-bold uppercase tracking-wide">Goals ({selectedEmployee.goals.length})</span>
        </div>
        
        <div className="space-y-2">
          {selectedEmployee.goals.map((goal, index) => {
            const expanded = isGoalExpanded(goal.id, goal.expanded);
            return (
              <div key={goal.id} className={index === 0 ? 'border-b border-gray-300 pb-2' : ''}>
                <div 
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded p-1 transition-colors"
                  onClick={() => toggleGoalExpanded(goal.id)}
                >
                  <div className="flex items-center gap-1">
                    {expanded ? <DropdownIcon /> : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px] -rotate-90">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    )}
                    <span className="text-xs">{goal.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500">{goal.progress}%</span>
                    <span className="text-xs font-bold">{goal.id}</span>
                  </div>
                </div>
                
                {expanded && goal.description && (
                  <>
                    <div className="flex items-start gap-1 ml-4 mt-1">
                      <svg viewBox="0 0 24 24" fill="#3e3c3c" className="w-[14px] h-[14px] -rotate-90 shrink-0">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                      <p className="text-[10px] text-gray-600">{goal.description}</p>
                    </div>
                    {goal.metrics && goal.metrics.length > 0 && (
                      <ul className="ml-8 mt-1 text-[9px] text-gray-500 list-disc space-y-0">
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

      {/* Goal Progress & Threads Section - 311px height */}
      <div className="bg-[#e8e8e8] border border-black rounded-[20px] p-3 w-[390px] mx-auto h-[311px] overflow-y-auto" data-name="360-selected-goal-thread-card">
        <div className="flex items-center gap-2 mb-2 border-b border-gray-400 pb-2">
          <ChartIcon />
          <span className="text-xs font-bold uppercase tracking-wide">Goal progress & threads</span>
        </div>

        {/* Goal Progress */}
        {activeGoal && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold uppercase">Goal</span>
                <span className="text-[10px] font-bold uppercase">{activeGoal.id}</span>
                <span className="text-[10px] truncate max-w-[200px]">{activeGoal.title}</span>
              </div>
              <span className="text-[10px] font-bold uppercase">{activeGoal.progress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-4 bg-[#e8e8e8] border border-black rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF] rounded-full transition-all duration-300"
                style={{ width: `${activeGoal.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Threads Section */}
        <div className="bg-[#e8e8e8] border border-black rounded-[15px] p-2">
          <div className="border-b border-gray-400 pb-1 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wide">
              threads ({selectedEmployee.threads.length})
            </span>
          </div>
          
          <div className="space-y-1 max-h-[100px] overflow-y-auto">
            {selectedEmployee.threads.length > 0 ? (
              selectedEmployee.threads.map((thread, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-[#dcdcdc] to-[#767676] border border-[#454444] rounded-full px-2 py-0.5 flex items-center"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wide mr-1">{thread.role}</span>
                  <span className="text-[9px] truncate">{thread.message}</span>
                </div>
              ))
            ) : (
              <div className="text-[9px] text-gray-500 text-center py-2">No threads yet</div>
            )}
          </div>
        </div>

        {/* Thread Input */}
        <div className="mt-2 bg-white border border-black rounded-full px-2 py-1 flex items-center justify-between gap-2">
          <input
            type="text"
            value={threadInput}
            onChange={(e) => setThreadInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a thread...."
            className="flex-1 text-[10px] bg-transparent outline-none placeholder-gray-500"
          />
          <button 
            onClick={handleSendThread}
            disabled={!threadInput.trim()}
            className="bg-gradient-to-r from-[#dcdcdc] to-[#767676] border border-black rounded-full px-3 py-0.5 text-[9px] text-white hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalOverview;
