import { useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface EndQuarterFormProps {
  cycleId: string;
  cycleName: string;
  onClose: () => void;
  onSubmit: (formData: EndQuarterFormData) => void;
}

export interface EndQuarterFormData {
  employeeName: string;
  department: string;
  position: string;
  objectivesAchievement: string;
  performanceRating: string;
  accomplishments: string;
  challenges: string;
  employeeComment: string;
  managerFeedback: string;
  recommendedRating: string;
  nextQuarterPriorities: string;
}

export function EndQuarterForm({ cycleId, cycleName, onClose, onSubmit }: EndQuarterFormProps) {
  const [formData, setFormData] = useState<EndQuarterFormData>({
    employeeName: '',
    department: '',
    position: '',
    objectivesAchievement: '',
    performanceRating: '3',
    accomplishments: '',
    challenges: '',
    employeeComment: '',
    managerFeedback: '',
    recommendedRating: '3',
    nextQuarterPriorities: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.objectivesAchievement.trim()) newErrors.objectivesAchievement = 'Objectives achievement details are required';
    if (!formData.accomplishments.trim()) newErrors.accomplishments = 'Accomplishments are required';
    if (!formData.employeeComment.trim()) newErrors.employeeComment = 'Employee comment is required';
    if (!formData.managerFeedback.trim()) newErrors.managerFeedback = 'Manager feedback is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const ratingOptions = [
    { value: '1', label: 'Below Expectations' },
    { value: '2', label: 'Meets Some Expectations' },
    { value: '3', label: 'Meets Expectations' },
    { value: '4', label: 'Exceeds Expectations' },
    { value: '5', label: 'Outstanding' },
  ];

  const FormField = ({ label, name, required = false, textarea = false, placeholder = '', select = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {select ? (
        <select
          name={name}
          value={formData[name as keyof EndQuarterFormData]}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a rating...</option>
          {ratingOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          value={formData[name as keyof EndQuarterFormData]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={formData[name as keyof EndQuarterFormData]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[42px] max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-purple-950 px-6 py-4 flex items-center justify-between border-b border-purple-200 z-10">
          <div>
            <h2 className="text-xl font-bold text-white">End of Quarter Performance</h2>
            <p className="text-sm text-green-100 mt-1">{cycleName}</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-green-600 p-2 rounded-lg">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Section 1: Employee Information */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Employee Name" name="employeeName" required placeholder="Enter your full name" />
              <FormField label="Department" name="department" required placeholder="e.g., Sales, IT" />
              <FormField label="Position" name="position" required placeholder="e.g., Senior Manager" />
            </div>
          </div>

          {/* Section 2: Performance Achievement */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Performance Achievement
            </h3>
            <FormField 
              label="Objectives Achievement" 
              name="objectivesAchievement" 
              required 
              textarea 
              placeholder="How well were the quarterly objectives achieved?"
            />
            <FormField 
              label="Performance Rating" 
              name="performanceRating" 
              required 
              select 
            />
            <FormField 
              label="Accomplishments" 
              name="accomplishments" 
              required 
              textarea 
              placeholder="Key accomplishments during this quarter"
            />
            <FormField 
              label="Challenges Faced" 
              name="challenges" 
              textarea 
              placeholder="Challenges encountered and how they were handled"
            />
          </div>

          {/* Section 3: Comments & Feedback */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Comments & Feedback
            </h3>
            <FormField 
              label="Employee Comments" 
              name="employeeComment" 
              required 
              textarea 
              placeholder="Your self-assessment and comments on this quarter"
            />
            <FormField 
              label="Manager Feedback" 
              name="managerFeedback" 
              required 
              textarea 
              placeholder="Manager's feedback on performance"
            />
          </div>

          {/* Section 4: Final Assessment & Next Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Final Assessment & Next Steps
            </h3>
            <FormField 
              label="Manager Recommended Rating" 
              name="recommendedRating" 
              select 
            />
            <FormField 
              label="Next Quarter Priorities" 
              name="nextQuarterPriorities" 
              textarea 
              placeholder="Goals and priorities for the next quarter"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-950 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <FiSave className="w-5 h-5" />
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EndQuarterForm;
