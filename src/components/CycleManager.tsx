import { useEmployee } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { InitCycleForm } from './InitCycleForm';
import { GoalForm } from './GoalForm';
import { GoalReview } from './GoalReview';
import { EmployeeComments } from './EmployeeComments';
import cycleData from '../data/cycleData.json';
import { PerformanceTable } from './PerformanceTable';
import { useMemo } from 'react';

interface CycleFormData {
  name: string;
  year: number;
  quarter: string;
  departments: string[];
}

interface GoalFormData {
  title: string;
  description: string;
  duration: string;
  criteria: string[];
  departmentId: string;
}

interface Thread {
  threadId: string;
  author: string;
  role: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface ReviewData {
  id: string;
  goalId?: string;
  goalTitle?: string;
  employeeName?: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  status: 'pending' | 'in_progress' | 'completed';
  rating: number;
  comment: string;
  criteria?: string[];
  threads: Thread[];
  timestamp?: string;
}

interface EmployeeComment {
  commentId: string;
  type: 'mid_year' | 'year_end';
  author: string;
  content: string;
  timestamp: string;
}

interface CommentData {
  commentId: string;
  type: 'mid_year' | 'year_end';
  author: string;
  content: string;
  timestamp: string;
}

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
  reviews: ReviewData[];
  employeeComments: EmployeeComment[];
}

interface Cycle {
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

export function CycleManager() {
  const { activeModule, setActiveModule, selectedCycleId, setSelectedCycleId } = useEmployee();
  const navigate = useNavigate();

  // Get active cycle from data
  const activeCycle = useMemo(
    () =>
      selectedCycleId
        ? (cycleData.cycles as Cycle[]).find((c: Cycle) => c.id === selectedCycleId)
        : (cycleData.cycles as Cycle[])[0],
    [selectedCycleId]
  );

  const handleInitCycleSubmit = (formData: CycleFormData) => {
    const newCycleId = `CYCLE-${formData.year}-${formData.quarter}`;
    setSelectedCycleId(newCycleId);
    setActiveModule('create_goal');
    navigate('/my-performance/create-goal');
    console.log('Cycle created:', formData);
  };

  const handleGoalSubmit = (goalData: GoalFormData) => {
    setActiveModule('goal_review');
    navigate('/my-performance/goal-review');
    console.log('Goal created:', goalData);
  };

  const handleReviewSubmit = (reviewData: ReviewData) => {
    setActiveModule('employee_comments');
    navigate('/my-performance/employee-comments');
    console.log('Review submitted:', reviewData);
  };

  const handleCommentsSubmit = (comments: CommentData[]) => {
    setActiveModule('performance');
    navigate('/my-performance');
    console.log('Comments submitted:', comments);
  };

  if (activeModule === 'performance') {
    return <PerformanceTable />;
  }

  if (activeModule === 'init_cycle') {
    return (
      <InitCycleForm
        onSubmit={handleInitCycleSubmit}
        onClose={() => {
          setActiveModule('performance');
          navigate('/my-performance');
        }}
      />
    );
  }

  if (activeModule === 'create_goal' && activeCycle) {
    return (
      <GoalForm
        cycleId={activeCycle.id}
        cycleName={activeCycle.name}
        departments={activeCycle.departments}
        onSubmit={handleGoalSubmit}
        onClose={() => {
          setActiveModule('init_cycle');
          navigate('/my-performance/init-goal');
        }}
      />
    );
  }

  if (activeModule === 'goal_review' && activeCycle?.goals?.[0]) {
    const goal = activeCycle.goals[0];
    const reviewFromData = goal.reviews?.[0];
    const review = {
      id: reviewFromData?.id || 'REVIEW-NEW-001',
      goalId: goal.id,
      goalTitle: goal.title,
      employeeName: goal.employeeName,
      reviewerId: reviewFromData?.reviewerId || 'MGR-001',
      reviewerName: reviewFromData?.reviewerName || 'Michael Chen',
      reviewerRole: reviewFromData?.reviewerRole || 'Floor Manager',
      status: (reviewFromData?.status as 'pending' | 'in_progress' | 'completed') || 'pending',
      rating: reviewFromData?.rating || 0,
      comment: reviewFromData?.comment || '',
      criteria: goal.criteria,
      threads: reviewFromData?.threads || [],
    } as const;

    return (
      <GoalReview
        review={review}
        onSubmit={handleReviewSubmit}
        onClose={() => {
          setActiveModule('create_goal');
          navigate('/my-performance/create-goal');
        }}
      />
    );
  }

  if (activeModule === 'employee_comments' && activeCycle?.goals?.[0]) {
    const goal = activeCycle.goals[0];
    return (
      <EmployeeComments
        employeeName={goal.employeeName}
        cycleName={activeCycle.name}
        goalTitle={goal.title}
        existingComments={goal.employeeComments || []}
        onSubmit={handleCommentsSubmit}
        onClose={() => {
          setActiveModule('performance');
          navigate('/my-performance');
        }}
      />
    );
  }

  return <PerformanceTable />;
}

export default CycleManager;
