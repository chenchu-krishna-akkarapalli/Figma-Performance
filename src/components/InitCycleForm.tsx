import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface Cycle {
  name: string;
  year: number;
  quarter: string;
  departments: string[];
}

interface InitCycleFormProps {
  onSubmit?: (cycleData: Cycle) => void;
  onClose?: () => void;
}

const DEPARTMENTS = [
  'HR',
  'Finance',
  'Sales',
  'IT',
  'Marketing',
  'Operations',
  'Legal',
  'Support',
  'Design',
  'Analytics',
];

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

export function InitCycleForm({ onSubmit, onClose }: InitCycleFormProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const [formData, setFormData] = useState<Cycle>({
    name: '',
    year: currentYear,
    quarter: 'Q1',
    departments: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDepartmentToggle = (dept: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Cycle name is required';
    if (formData.departments.length === 0) newErrors.departments = 'Select at least one department';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const cycleNameGenerated = `${formData.year} ${formData.quarter} Cycle`;
      onSubmit?.({
        ...formData,
        name: cycleNameGenerated,
      });
    }
  };

  return (
    <div className="bg-white gradient-border rounded-[42px] p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Initiate New Cycle</h2>
          <p className="text-xs text-gray-600 mt-1">Create a new performance cycle for departments</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Year and Quarter Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Year Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Year
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Quarter Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Quarter
            </label>
            <select
              value={formData.quarter}
              onChange={(e) => setFormData(prev => ({ ...prev, quarter: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {QUARTERS.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cycle Name Display */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Cycle Name (Auto-generated)
          </label>
          <input
            type="text"
            disabled
            value={`${formData.year} ${formData.quarter} Cycle`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>

        {/* Department Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Select Departments
            {errors.departments && <span className="text-red-500 text-xs ml-2">{errors.departments}</span>}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                type="button"
                onClick={() => handleDepartmentToggle(dept)}
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
                  formData.departments.includes(dept)
                    ? 'bg-purple-500 text-white border-purple-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Departments Summary */}
        {formData.departments.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs font-bold uppercase text-purple-900 mb-2">Selected Departments ({formData.departments.length})</p>
            <div className="flex flex-wrap gap-2">
              {formData.departments.map(dept => (
                <div key={dept} className="bg-purple-200 text-purple-900 px-3 py-1 rounded-full text-xs font-medium">
                  {dept}
                </div>
              ))}
            </div>
          </div>
        )}

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
            Create Cycle
          </button>
        </div>
      </form>
    </div>
  );
}

export default InitCycleForm;
