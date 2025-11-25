import { useState } from 'react';
import { IoClose, IoSend } from 'react-icons/io5';

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
  goalId: string;
  goalTitle: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  status: 'pending' | 'in_progress' | 'completed';
  rating: number;
  comment: string;
  criteria: string[];
  threads: Thread[];
}

interface GoalReviewProps {
  review: ReviewData;
  onSubmit?: (updatedReview: ReviewData) => void;
  onClose?: () => void;
}

export function GoalReview({ review, onSubmit, onClose }: GoalReviewProps) {
  const [formData, setFormData] = useState({
    rating: review.rating || 0,
    comment: review.comment || '',
    newThreadMessage: '',
  });

  const [threads, setThreads] = useState<Thread[]>(review.threads || []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.rating === 0) newErrors.rating = 'Please provide a rating';
    if (!formData.comment.trim()) newErrors.comment = 'Feedback comment is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddThread = () => {
    if (formData.newThreadMessage.trim()) {
      const newThread: Thread = {
        threadId: `THREAD-${Date.now()}`,
        author: review.reviewerName,
        role: review.reviewerRole,
        message: formData.newThreadMessage,
        timestamp: new Date().toISOString(),
        resolved: false,
      };
      setThreads([...threads, newThread]);
      setFormData(prev => ({ ...prev, newThreadMessage: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.({
        ...review,
        rating: formData.rating,
        comment: formData.comment,
        status: 'completed',
        threads,
      });
    }
  };

  return (
    <div className="bg-white gradient-border rounded-[42px] p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300 sticky top-0 bg-white">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Review Goal</h2>
          <p className="text-xs text-gray-600 mt-1">{review.goalTitle} - {review.employeeName}</p>
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

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Goal Details Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-bold uppercase text-gray-700 mb-3">Goal Details</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-semibold">Employee:</span> {review.employeeName}</p>
            <p><span className="font-semibold">Goal:</span> {review.goalTitle}</p>
            <p><span className="font-semibold">Success Criteria:</span></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              {review.criteria.map((criterion, idx) => (
                <li key={idx} className="text-xs">{criterion}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rating Section */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Goal Rating
            {errors.rating && <span className="text-red-500 text-xs ml-2">{errors.rating}</span>}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating }))}
                className={`w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                  formData.rating === rating
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">1 = Needs Improvement, 5 = Excellent</p>
        </div>

        {/* Feedback Comment */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Review Comment
            {errors.comment && <span className="text-red-500 text-xs ml-2">{errors.comment}</span>}
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Provide your feedback on this goal..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {/* Thread Discussion */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Discussion Thread
          </label>
          
          {/* Existing Threads */}
          <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
            {threads.map(thread => (
              <div key={thread.threadId} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-bold text-gray-900">{thread.author}</p>
                    <p className="text-xs text-gray-600">{thread.role}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(thread.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-700">{thread.message}</p>
              </div>
            ))}
          </div>

          {/* Add New Thread */}
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.newThreadMessage}
              onChange={(e) => setFormData(prev => ({ ...prev, newThreadMessage: e.target.value }))}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddThread();
                }
              }}
              placeholder="Add a comment to the discussion thread..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              type="button"
              onClick={handleAddThread}
              className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-300 sticky bottom-0 bg-white">
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
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalReview;
