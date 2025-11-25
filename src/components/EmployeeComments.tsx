import { useState } from 'react';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';

interface EmployeeComment {
  commentId: string;
  type: 'mid_year' | 'year_end';
  author: string;
  content: string;
  timestamp: string;
}

interface EmployeeCommentsProps {
  employeeName: string;
  cycleName: string;
  goalTitle: string;
  existingComments?: EmployeeComment[];
  onSubmit?: (comments: EmployeeComment[]) => void;
  onClose?: () => void;
}

export function EmployeeComments({
  employeeName,
  cycleName,
  goalTitle,
  existingComments = [],
  onSubmit,
  onClose,
}: EmployeeCommentsProps) {
  const [comments, setComments] = useState<EmployeeComment[]>(existingComments);
  const [newMidYearComment, setNewMidYearComment] = useState('');
  const [newYearEndComment, setNewYearEndComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const midYearComment = comments.find(c => c.type === 'mid_year');
  const yearEndComment = comments.find(c => c.type === 'year_end');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (newMidYearComment.trim() && newMidYearComment.trim().length < 10) {
      newErrors.midYear = 'Mid-year comment must be at least 10 characters';
    }
    if (newYearEndComment.trim() && newYearEndComment.trim().length < 10) {
      newErrors.yearEnd = 'Year-end comment must be at least 10 characters';
    }
    
    if (!newMidYearComment.trim() && !newYearEndComment.trim() && comments.length === 0) {
      newErrors.general = 'Please add at least one comment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMidYearComment = () => {
    if (newMidYearComment.trim()) {
      const newComments = comments.filter(c => c.type !== 'mid_year');
      newComments.push({
        commentId: `COMMENT-${Date.now()}`,
        type: 'mid_year',
        author: employeeName,
        content: newMidYearComment,
        timestamp: new Date().toISOString(),
      });
      setComments(newComments);
      setNewMidYearComment('');
    }
  };

  const handleAddYearEndComment = () => {
    if (newYearEndComment.trim()) {
      const newComments = comments.filter(c => c.type !== 'year_end');
      newComments.push({
        commentId: `COMMENT-${Date.now()}`,
        type: 'year_end',
        author: employeeName,
        content: newYearEndComment,
        timestamp: new Date().toISOString(),
      });
      setComments(newComments);
      setNewYearEndComment('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(comments);
    }
  };

  return (
    <div className="bg-white gradient-border rounded-[42px] p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Employee Comments</h2>
          <p className="text-xs text-gray-600 mt-1">
            {employeeName} - {goalTitle} ({cycleName})
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mid-Year Comment Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <IoCheckmarkCircle className={`w-5 h-5 ${midYearComment ? 'text-green-600' : 'text-gray-400'}`} />
            <h3 className="text-sm font-bold uppercase text-blue-900">
              Mid-Year Employee Comment
            </h3>
            {midYearComment && <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Submitted</span>}
          </div>

          {midYearComment ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-200">
                {midYearComment.content}
              </p>
              <p className="text-xs text-gray-500">
                Submitted: {new Date(midYearComment.timestamp).toLocaleDateString()}
              </p>
              <button
                type="button"
                onClick={() => setComments(comments.filter(c => c.type !== 'mid_year'))}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit Comment
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={newMidYearComment}
                onChange={(e) => setNewMidYearComment(e.target.value)}
                placeholder="Share your progress, challenges, and achievements at mid-year..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.midYear ? 'border-red-500' : 'border-blue-200'
                }`}
              />
              {errors.midYear && <p className="text-xs text-red-600">{errors.midYear}</p>}
              <button
                type="button"
                onClick={handleAddMidYearComment}
                disabled={!newMidYearComment.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Mid-Year Comment
              </button>
            </div>
          )}
        </div>

        {/* Year-End Comment Section */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <IoCheckmarkCircle className={`w-5 h-5 ${yearEndComment ? 'text-green-600' : 'text-gray-400'}`} />
            <h3 className="text-sm font-bold uppercase text-purple-900">
              Year-End Employee Comment
            </h3>
            {yearEndComment && <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Submitted</span>}
          </div>

          {yearEndComment ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 bg-white p-3 rounded border border-purple-200">
                {yearEndComment.content}
              </p>
              <p className="text-xs text-gray-500">
                Submitted: {new Date(yearEndComment.timestamp).toLocaleDateString()}
              </p>
              <button
                type="button"
                onClick={() => setComments(comments.filter(c => c.type !== 'year_end'))}
                className="text-xs text-purple-600 hover:text-purple-800 font-medium"
              >
                Edit Comment
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={newYearEndComment}
                onChange={(e) => setNewYearEndComment(e.target.value)}
                placeholder="Reflect on your overall performance, learnings, and growth for the year..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  errors.yearEnd ? 'border-red-500' : 'border-purple-200'
                }`}
              />
              {errors.yearEnd && <p className="text-xs text-red-600">{errors.yearEnd}</p>}
              <button
                type="button"
                onClick={handleAddYearEndComment}
                disabled={!newYearEndComment.trim()}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Year-End Comment
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-300">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Submit Comments
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeComments;
