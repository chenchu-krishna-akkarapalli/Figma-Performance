import { useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface StartQuarterFormProps {
  cycleName: string;
  onClose: () => void;
  onSubmit: (formData: StartQuarterFormData) => void;
}

export interface StartQuarterFormData {
  employeeName: string;
  department: string;
  position: string;
  performanceObjectives: string;
  keyResponsibilities: string;
  skillGaps: string;
  developmentPlan: string;
  managerExpectations: string;
  resources: string;
}

export function StartQuarterForm({ cycleName, onClose, onSubmit }: StartQuarterFormProps) {
  const [formData, setFormData] = useState<StartQuarterFormData>({
    employeeName: '',
    department: '',
    position: '',
    performanceObjectives: '',
    keyResponsibilities: '',
    skillGaps: '',
    developmentPlan: '',
    managerExpectations: '',
    resources: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.performanceObjectives.trim()) newErrors.performanceObjectives = 'Performance objectives are required';
    if (!formData.keyResponsibilities.trim()) newErrors.keyResponsibilities = 'Key responsibilities are required';
    if (!formData.managerExpectations.trim()) newErrors.managerExpectations = 'Manager expectations are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const FormField = ({ label, name, required = false, textarea = false, placeholder = '' }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={formData[name as keyof StartQuarterFormData]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={formData[name as keyof StartQuarterFormData]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
        <div className="sticky top-0 bg-purple-950 px-6 py-4 flex items-center justify-between border-b border-blue-200 z-10">
          <div>
            <h2 className="text-xl font-bold text-white">Start of Quarter Performance Planning</h2>
            <p className="text-sm text-blue-100 mt-1">{cycleName}</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-blue-600 p-2 rounded-lg">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Section 1: Employee Information */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Employee Name" name="employeeName" required placeholder="Enter your full name" />
              <FormField label="Department" name="department" required placeholder="e.g., Sales, IT" />
              <FormField label="Position" name="position" required placeholder="e.g., Senior Manager" />
            </div>
          </div>

          {/* Section 2: Performance Objectives */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Performance Objectives & Responsibilities
            </h3>
            <FormField 
              label="Performance Objectives" 
              name="performanceObjectives" 
              required 
              textarea 
              placeholder="Define your key performance objectives for this quarter"
            />
            <FormField 
              label="Key Responsibilities" 
              name="keyResponsibilities" 
              required 
              textarea 
              placeholder="List your primary responsibilities"
            />
          </div>

          {/* Section 3: Development */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Development & Support
            </h3>
            <FormField 
              label="Skill Gaps" 
              name="skillGaps" 
              textarea 
              placeholder="Identify any skill gaps you want to address"
            />
            <FormField 
              label="Development Plan" 
              name="developmentPlan" 
              textarea 
              placeholder="Outline your development plan for this quarter"
            />
            <FormField 
              label="Resources Needed" 
              name="resources" 
              textarea 
              placeholder="What resources or support do you need?"
            />
          </div>

          {/* Section 4: Manager Input */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Manager Expectations & Feedback
            </h3>
            <FormField 
              label="Manager Expectations" 
              name="managerExpectations" 
              required 
              textarea 
              placeholder="Manager's expectations for this quarter"
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

export default StartQuarterForm;
