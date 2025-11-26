import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  employeeName?: string;
  department?: string;
  position?: string;
  performanceObjectives?: string;
  keyResponsibilities?: string;
  skillGaps?: string;
  developmentPlan?: string;
  managerExpectations?: string;
  resources?: string;
  objectivesAchievement?: string;
  performanceRating?: string;
  accomplishments?: string;
  challenges?: string;
  employeeComment?: string;
  managerFeedback?: string;
  recommendedRating?: string;
  nextQuarterPriorities?: string;
  submittedBy?: string;
  submittedDate?: string;
  reviewedBy?: string;
  submittedByRole?: string;
}

interface Cycle {
  id: string;
  name: string;
  quarter: string;
  year: number;
  department: string;
  startDate: string;
  endDate: string;
  startQuarterForm?: FormData;
  endQuarterForm?: FormData;
  status: 'Completed' | 'In Progress';
}

interface MyCycleTestimonialCardProps {
  cycle: Cycle;
}

const MyCycleTestimonialCard: React.FC<MyCycleTestimonialCardProps> = ({ cycle }) => {
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');

  if (!cycle) return null;

  const startForm = cycle.startQuarterForm || {};
  const endForm = cycle.endQuarterForm || {};

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const getStatusColor = (status: string): string => {
    return status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getRatingColor = (rating: string | undefined): string => {
    if (!rating) return 'text-gray-600';
    const ratingNum = parseInt(rating);
    if (ratingNum >= 5) return 'text-green-600';
    if (ratingNum >= 3) return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-white rounded-[25px] p-6 mb-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Cycle Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{cycle.name}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              <span className="font-medium">Quarter:</span> {cycle.quarter} {cycle.year}
            </span>
            <span>
              <span className="font-medium">Department:</span> {cycle.department}
            </span>
            <span>
              <span className="font-medium">Period:</span> {cycle.startDate} - {cycle.endDate}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
            cycle.status
          )}`}
        >
          {cycle.status}
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('start')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'start'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Start of Quarter Planning
        </button>
        <button
          onClick={() => setActiveTab('end')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'end'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          End of Quarter Performance
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'start' && (
          <div className="space-y-4">
            {startForm.performanceObjectives && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance Objectives</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{startForm.performanceObjectives}</p>
              </div>
            )}

            {startForm.keyResponsibilities && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{startForm.keyResponsibilities}</p>
              </div>
            )}

            {startForm.developmentPlan && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Development Plan</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{startForm.developmentPlan}</p>
              </div>
            )}

            {startForm.managerExpectations && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Manager Expectations</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{startForm.managerExpectations}</p>
              </div>
            )}

            {(startForm.submittedBy || startForm.reviewedBy) && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                <p>
                  <span className="font-medium">Submitted by:</span> {startForm.submittedBy || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Submitted on:</span> {startForm.submittedDate || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Reviewed by:</span> {startForm.reviewedBy || 'N/A'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'end' && (
          <div className="space-y-4">
            {endForm.objectivesAchievement && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Objectives Achievement</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{endForm.objectivesAchievement}</p>
              </div>
            )}

            {endForm.performanceRating && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance Rating</h4>
                <p className={`text-lg font-bold ${getRatingColor(endForm.performanceRating)}`}>
                  {endForm.performanceRating}/5
                </p>
              </div>
            )}

            {endForm.accomplishments && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Accomplishments</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{endForm.accomplishments}</p>
              </div>
            )}

            {endForm.challenges && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Challenges</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{endForm.challenges}</p>
              </div>
            )}

            {endForm.managerFeedback && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Manager Feedback</h4>
                <p className="text-gray-700 text-sm leading-relaxed italic">{endForm.managerFeedback}</p>
              </div>
            )}

            {endForm.nextQuarterPriorities && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Next Quarter Priorities</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{endForm.nextQuarterPriorities}</p>
              </div>
            )}

            {(endForm.submittedBy || endForm.reviewedBy) && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                <p>
                  <span className="font-medium">Submitted by:</span> {endForm.submittedBy || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Submitted on:</span> {endForm.submittedDate || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Reviewed by:</span> {endForm.reviewedBy || 'N/A'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyCycleTestimonialCard;
