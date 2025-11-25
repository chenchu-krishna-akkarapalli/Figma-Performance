import { useEmployee } from '../context/EmployeeContext';
import { InitCycleForm } from './InitCycleForm';
import { GoalForm } from './GoalForm';
import { GoalReview } from './GoalReview';
import { EmployeeComments } from './EmployeeComments';
import cycleData from '../data/cycleData.json';
import { PerformanceTable } from './PerformanceTable';

export function CycleManager() {
  const { activeModule, setActiveModule, selectedCycleId, setSelectedCycleId } = useEmployee();

  // Get active cycle from data
  const activeCycle = selectedCycleId
    ? (cycleData.cycles as any).find((c: any) => c.id === selectedCycleId)
    : (cycleData.cycles as any)[0];

  const handleInitCycleSubmit = (cycleData: any) => {
    setSelectedCycleId(`CYCLE-${Date.now()}`);
    setActiveModule('create_goal');
    // In production, this would POST to backend
    console.log('Cycle created:', cycleData);
  };

  const handleGoalSubmit = (goalData: any) => {
    setActiveModule('goal_review');
    // In production, this would POST to backend
    console.log('Goal created:', goalData);
  };

  const handleReviewSubmit = (reviewData: any) => {
    setActiveModule('employee_comments');
    // In production, this would POST to backend
    console.log('Review submitted:', reviewData);
  };

  const handleCommentsSubmit = (comments: any) => {
    setActiveModule('performance');
    // In production, this would POST to backend
    console.log('Comments submitted:', comments);
  };

  if (activeModule === 'performance') {
    return <PerformanceTable />;
  }

  if (activeModule === 'init_cycle') {
    return (
      <div className="w-full flex justify-center">
        <InitCycleForm
          onSubmit={handleInitCycleSubmit}
          onClose={() => setActiveModule('performance')}
        />
      </div>
    );
  }

  if (activeModule === 'create_goal' && activeCycle) {
    return (
      <div className="w-full flex justify-center">
        <GoalForm
          cycleId={activeCycle.id}
          cycleName={activeCycle.name}
          departments={activeCycle.departments}
          onSubmit={handleGoalSubmit}
          onClose={() => setActiveModule('init_cycle')}
        />
      </div>
    );
  }

  if (activeModule === 'goal_review' && activeCycle?.goals?.[0]) {
    const goal = activeCycle.goals[0];
    const review = goal.reviews?.[0] || {
      id: `REVIEW-${Date.now()}`,
      goalId: goal.id,
      goalTitle: goal.title,
      employeeName: goal.employeeName,
      reviewerId: 'MGR-001',
      reviewerName: 'Michael Chen',
      reviewerRole: 'Floor Manager',
      status: 'pending',
      rating: 0,
      comment: '',
      criteria: goal.criteria,
      threads: [],
    };

    return (
      <div className="w-full flex justify-center">
        <GoalReview
          review={review}
          onSubmit={handleReviewSubmit}
          onClose={() => setActiveModule('create_goal')}
        />
      </div>
    );
  }

  if (activeModule === 'employee_comments' && activeCycle?.goals?.[0]) {
    const goal = activeCycle.goals[0];
    return (
      <div className="w-full flex justify-center">
        <EmployeeComments
          employeeName={goal.employeeName}
          cycleName={activeCycle.name}
          goalTitle={goal.title}
          existingComments={goal.employeeComments || []}
          onSubmit={handleCommentsSubmit}
          onClose={() => setActiveModule('performance')}
        />
      </div>
    );
  }

  return <PerformanceTable />;
}

export default CycleManager;
