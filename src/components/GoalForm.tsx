import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface GoalFormData {
  title: string;
  description: string;
  duration: string;
  criteria: string[];
  departmentId: string;
}

interface GoalFormProps {
  cycleId: string;
  cycleName: string;
  departments: string[];
  onSubmit?: (goalData: GoalFormData) => void;
  onClose?: () => void;
}

export function GoalForm({ cycleName, departments, onSubmit, onClose }: GoalFormProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    duration: '90 days',
    criteria: ['', '', '', ''],
    departmentId: departments[0] || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Goal title is required';
    if (!formData.description.trim()) newErrors.description = 'Goal description is required';
    if (formData.criteria.filter(c => c.trim()).length < 2) {
      newErrors.criteria = 'Add at least 2 criteria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.({
        ...formData,
        criteria: formData.criteria.filter(c => c.trim()),
      });
    }
  };

  const handleCriteriaChange = (index: number, value: string) => {
    const newCriteria = [...formData.criteria];
    newCriteria[index] = value;
    setFormData(prev => ({ ...prev, criteria: newCriteria }));
  };

  return (
    <div className="bg-white gradient-border rounded-[42px] p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Create Goal</h2>
          <p className="text-xs text-gray-600 mt-1">For {cycleName}</p>
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
        {/* Department Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Department
          </label>
          <select
            value={formData.departmentId}
            onChange={(e) => setFormData(prev => ({ ...prev, departmentId: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Goal Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Goal Title
            {errors.title && <span className="text-red-500 text-xs ml-2">{errors.title}</span>}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter goal title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Goal Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Goal Description
            {errors.description && <span className="text-red-500 text-xs ml-2">{errors.description}</span>}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the goal and its importance"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Duration
          </label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="30 days">30 days</option>
            <option value="60 days">60 days</option>
            <option value="90 days">90 days</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </select>
        </div>

        {/* Success Criteria */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Success Criteria
            {errors.criteria && <span className="text-red-500 text-xs ml-2">{errors.criteria}</span>}
          </label>
          <div className="space-y-2">
            {formData.criteria.map((criterion, index) => (
              <input
                key={index}
                type="text"
                value={criterion}
                onChange={(e) => handleCriteriaChange(index, e.target.value)}
                placeholder={`Criteria ${index + 1} (optional)`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Add at least 2 criteria for the goal</p>
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
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Submit Goal for Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;
