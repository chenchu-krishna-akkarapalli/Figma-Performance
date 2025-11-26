"use client";
 
import { FiX } from "react-icons/fi";
 
interface EmployeeProfileProps {
  open: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    role: string;
    jobDescription: string;
    department: string;
    manager: string;
    experience: string;
    primarySkills: string[];
    secondarySkills: string[];
    currentProjects?: string[];
    pastProjects?: string[];
    cvUrl?: string; // /cv/sample_cv.pdf
  };
}
 
export default function EmployeeProfile({ open, onClose, employee }: EmployeeProfileProps) {
  if (!open) return null;
 
  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-white/10 flex justify-center items-center z-50">
 
      {/* MODAL */}
      <div className="bg-white rounded-3xl w-[560px] max-h-[92vh] overflow-y-auto shadow-2xl border border-purple-200">
 
        {/* HEADER */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-6 rounded-t-3xl">
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-sm opacity-90">{employee.role}</p>
          <p className="text-xs opacity-80 mt-1">Employee ID: <span className="font-semibold">{employee.id}</span></p>
 
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-white hover:text-gray-200"
          >
            <FiX size={28} />
          </button>
        </div>
 
        {/* CONTENT */}
        <div className="p-6 text-gray-700">
 
          {/* JOB INFO */}
          <div className="space-y-3">
            <p><strong className="text-purple-600">Job Description:</strong> {employee.jobDescription}</p>
            <p><strong className="text-purple-600">Department:</strong> {employee.department}</p>
            <p><strong className="text-purple-600">Manager:</strong> {employee.manager}</p>
            <p><strong className="text-purple-600">Experience:</strong> {employee.experience}</p>
          </div>
 
          {/* SKILLS */}
          <div className="mt-7">
 
            <h3 className="text-xl font-semibold text-purple-700 mb-3">Primary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.primarySkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
 
            <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">Secondary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.secondarySkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-50 text-purple-600 rounded-xl text-sm shadow-sm border border-purple-200"
                >
                  {skill}
                </span>
              ))}
            </div>
 
          </div>
 
          {/* CURRENT PROJECTS */}
          {employee.currentProjects && employee.currentProjects.length > 0 && (
            <div className="mt-7">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Current Projects</h3>
              <ul className="list-disc pl-6 space-y-1">
                {employee.currentProjects.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
 
          {/* PAST PROJECTS */}
          {employee.pastProjects && employee.pastProjects.length > 0 && (
            <div className="mt-7">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Past Projects</h3>
              <ul className="list-disc pl-6 space-y-1">
                {employee.pastProjects.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
 
          {/* CV SECTION */}
          {employee.cvUrl && (
            <div className="mt-10 flex gap-4">
              <a
                href={employee.cvUrl}
                download
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md"
              >
                Download CV
              </a>
 
              <a
                href={employee.cvUrl}
                target="_blank"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
              >
                View CV
              </a>
            </div>
          )}
 
        </div>
      </div>
    </div>
  );
}