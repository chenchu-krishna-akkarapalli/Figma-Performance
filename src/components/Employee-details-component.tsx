"use client";

interface EmployeeProfileProps {
  employee: {
    name: string;
    jobDescription: string;
    department: string;
    manager: string;
    experience: string;
    primarySkills?: string[];
    secondarySkills?: string[];
    pastProjects?: string[];
    currentProjects?: string[];
  };
  open: boolean;
  onClose: () => void;
}

export default function EmployeeProfile({ employee, open, onClose }: EmployeeProfileProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-white/20 backdrop-blur-md
      "
    >
      <div
        className="
          bg-white w-[420px] p-6 rounded-2xl shadow-2xl border border-gray-200
          animate-fadeIn
        "
      >
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Employee Profile
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-3 text-[15px] text-gray-800">
          <p><span className="font-semibold">Name:</span> {employee.name}</p>
          <p><span className="font-semibold">Job Description:</span> {employee.jobDescription}</p>
          <p><span className="font-semibold">Department:</span> {employee.department}</p>
          <p><span className="font-semibold">Manager:</span> {employee.manager}</p>
          <p><span className="font-semibold">Experience:</span> {employee.experience}</p>
        </div>

        {/* PRIMARY SKILLS */}
        {employee.primarySkills && employee.primarySkills.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Primary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.primarySkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SECONDARY SKILLS */}
        {employee.secondarySkills && employee.secondarySkills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secondary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.secondarySkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PAST PROJECTS */}
        {employee.pastProjects && employee.pastProjects.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Past Projects</h3>
            <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
              {employee.pastProjects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CURRENT PROJECTS */}
        {employee.currentProjects && employee.currentProjects.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Projects</h3>
            <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
              {employee.currentProjects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            mt-6 w-full py-3 bg-purple-600 text-white rounded-xl
            hover:bg-purple-700 transition font-medium
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
