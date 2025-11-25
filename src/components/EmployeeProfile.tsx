import { FiX } from "react-icons/fi";

interface EmployeeProfileProps {
  open: boolean;
  onClose: () => void;
  employee: {
    name: string;
    jobDescription: string;
    department: string;
    manager: string;
    experience: string;
    primarySkills: string[];
    secondarySkills: string[];
    pastProjects: string[];
    currentProjects: string[];
  };
}

export function EmployeeProfile({ open, onClose, employee }: EmployeeProfileProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">{employee.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 font-semibold">Job Description</p>
              <p className="text-base text-black mt-1">{employee.jobDescription}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Department</p>
              <p className="text-base text-black mt-1">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Manager</p>
              <p className="text-base text-black mt-1">{employee.manager}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Experience</p>
              <p className="text-base text-black mt-1">{employee.experience}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold text-black mb-3">Primary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.primarySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF] text-black rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black mb-3">Secondary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.secondarySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-200 text-black rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-bold text-black mb-3">Current Projects</h3>
            <ul className="space-y-2">
              {employee.currentProjects.map((project, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-[#AD46FF] to-[#E9D4FF] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-black">{project}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black mb-3">Past Projects</h3>
            <ul className="space-y-2">
              {employee.pastProjects.map((project, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-black font-semibold hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
